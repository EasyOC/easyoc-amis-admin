import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { Editor, ShortcutKey } from 'amis-editor';

import { amisRequest } from '@/services/amis/AmisEnv';
import { Button, Dropdown, Form, Input, Modal, Select } from 'antd';
import { wrapedResultRequest } from '@/services/requests';
import 'amis-editor-core/lib/style.css';
import './style.less';
import { getLocale, history, setLocale, useLocation } from '@umijs/max';
import { H5Preview, PCPreview } from '@/components/icons/customIcons';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { excuteGraphqlQuery } from '@/services/graphql/graphqlApi';
import { CloudUploadOutlined, DownOutlined } from '@ant-design/icons';
import {
  Switch,
  DatePicker as AMISDatePicker,
  confirm,
  toast,
  Editor as MonacoJsonEditor,
  FormItemWrap,
  addSchemaFilter,
  Schema,
  RendererConfig,
} from 'amis';
import { isEqual, unset } from 'lodash';

import { mustEndsWith } from '@/utils';
import getAppSettings from '@/services/appSettings';
import { ProForm, ProFormCheckbox, ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import buildCrud from './Gencurd/GenCrud';
// import 'amis/schema.json';
//修改amis 内置组件
// import '@/components/AMISComponent/components';
import moment from 'moment';
import { useModel } from '@umijs/max';

const schemaUrl = mustEndsWith(getAppSettings().publicPath, '/') + 'amis/schema.json';
// @ts-ignore
// __uri?.('amis/schema.json');
//console.log('schemaUrl: ', schemaUrl);

// @ts-ignore
// __uri('amis/schema.json');

const PageEditor: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');
  const amisEnv = initialState?.amisEnv;
  const [state, setState] = React.useState({
    theme: amisEnv?.theme || 'cxd',
    title: '可视化页面编辑器',
    isMobile: false,
    fullScreen: false,
    id: '',
    preview: false,
    schema: {
      type: 'page',
    } as any,
    version: '',
    displayText: '',
    description: '',
    name: '',
    showSaveModal: false,
    showGenModal: false,
    showVersion: false,
    latest: true,
    debug: amisEnv?.enableAMISDebug || false,
    currentLanguage: false,
  });

  addSchemaFilter((schema: Schema, renderer: RendererConfig, props?: any) => {
    if (renderer.type == 'input-text') {
      return (schema.label = '111' + schema.label);
    }
    return schema;
  });

  const location = useLocation();
  //console.log('props: ', props);
  const { id, vId } = qs.parse(location?.search);
  //console.log('history.location: ', history.location, qs.parse(location?.search));
  const fullScreenHandle = useFullScreenHandle();

  const editorLanguages = [
    {
      label: '简体中文',
      value: 'zh-CN',
    },
    {
      label: 'English',
      value: 'en-US',
    },
  ];

  const changeLocale = (value: string) => {
    //console.log('value: ', value);
    setLocale(value, false);
    localStorage.setItem('suda-i18n-locale', value);
    window.location.reload();
  };

  //console.log('props: ', props);

  //console.log('editor state', props);
  const makeSnapshot = (schema?) => {
    //console.log('makeSnapshot state: ', state);
    if (!schema) {
      schema = state.schema;
    }
    // 为编辑器增加本地历史增加自动恢复功能
    //1. 打开页面时根据 当前内容的version 检查 localStorage
    //2. 如果浏览器本地保存有快照，则从快照中加载，且通过toast 提示用户“当前编辑内容为本地快照”
    //3. 增加按钮清除页面缓存，点击后删除当前版本的快照，然后调用api重新加载当前版本
    localStorage.setItem(`Editor_Snapshot_${state.version}`, JSON.stringify(schema));
    toast.success('已保存快照');
  };

  const clearSnapshot = (version) => {
    localStorage.removeItem(`Editor_Snapshot_${version}`);
  };

  const checkSnapshot = async (version) => {
    const snapshot = localStorage.getItem(`Editor_Snapshot_${version}`);
    if (snapshot && !isEqual(snapshot, state.schema)) {
      let load = await confirm('检测到与当前版本不同的本地快照，是否加载?', '提示');
      if (load) {
        const snapshotContent = JSON.parse(snapshot);
        //console.log('snapshotContent: ', snapshotContent);
        setState((s) => ({ ...s, schema: snapshotContent }));
      } else {
        if (await confirm('是否清除快照？', '提示')) {
          clearSnapshot(version);
          toast.success('快照已清理');
        }
      }
    }
  };

  const handleEdtorChange = (schema: any) => {
    //console.log('handleEdtorChange', schema);
    setState((s) => ({ ...s, schema }));
  };

  useEffect(() => {
    checkSnapshot(state.version);
  }, [state.version]);

  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  useEffect(() => {
    if (isMounted) {
      return;
    }
    setIsMounted(true);
    if (id || vId) {
      let querySource = `contentItem(contentItemId: "${id}")`;
      if (vId) {
        querySource = `contentItemByVersion(contentItemVersionId: "${vId}")`;
      }
      excuteGraphqlQuery({
        query: `{
                  contentItem:${querySource} {
                    modifiedUtc
                    ... on AmisSchema {
                      displayText
                      id:contentItemId
                      version:contentItemVersionId
                      schema
                      name
                      latest
                    }
                  }
                }`,
      }).then((result) => {
        //console.log('可视化编辑器 result: ', result);
        if (result?.contentItem) {
          try {
            const jData = result?.contentItem?.schema;
            let schema;
            if (jData) {
              try {
                schema = JSON.parse(jData);
              } catch (error) {
                toast.error('schema 格式错误');
              }
            }
            setState((s) => ({
              ...s,
              ...result?.contentItem,
              //最后修改时间
              modified: result?.contentItem?.modifiedUtc
                ? new Date(result?.contentItem?.modifiedUtc)
                : null,
              schema: schema || s.schema,
            }));
          } catch (error) {
            toast.error('加载失败');
          }
        }
      });
    }
  }, [isMounted, vId, id]);

  const togglePreview = () => {
    //console.log('state.preview', !state.preview);
    if (!state.preview) {
      makeSnapshot();
    }
    setState((s) => ({ ...s, preview: !state.preview }));
  };

  const toggleDebug = () => {
    makeSnapshot();
    if (state.debug) {
      localStorage.setItem('enableAMISDebug', '0');
    } else {
      localStorage.setItem('enableAMISDebug', '1');
    }
    window.location.reload();
  };
  const [publishForm] = Form.useForm();
  const [publishOption, setPublishOption] = useState<{
    publish: boolean;
    publishLaterFlag: boolean;
    publishLaterWhen: Date;
  }>({
    publish: false,
    publishLaterFlag: false,
    publishLaterWhen: new Date(),
  });

  const handlePublish = async () => {
    try {
      //TODO: 验证提交记录 下面的写法无效
      // const validateResult = await publishForm.validateFields(['versionDescription']);
      // console.log('validateResult: ', validateResult);
      // if (validateResult) {
      //   return;
      // }

      const values = await publishForm.validateFields();

      if (process.env.NODE_ENV == 'production' && !values.versionDescription) {
        toast.error('请输入变更日志');
        return;
      }

      //console.log('values: ', values);
      values.properties = {
        AuditTrailPart: {
          Comment: values.versionDescription,
        },
      };
      if (publishOption.publishLaterFlag) {
        values.properties.PublishLaterPart = {
          ScheduledPublishUtc: moment(publishOption.publishLaterWhen),
        };
      }

      values.draft = !values.publish;
      unset(values, 'publish');
      const result = await wrapedResultRequest.request({
        url: `/api/ContentManagement/PostContent?draft=${values.draft}`,
        method: 'post',
        data: {
          schema: JSON.stringify(state.schema),
          contentType: 'AmisSchema',
          contentItemId: state.id,
          ...values,
        },
        timeout: 10000,
      });
      setPublishOption({} as any);
      publishForm.resetFields();
      clearSnapshot(state.version);
      setState((s) => ({ ...s, showSaveModal: false }));
      history.push(`/sys/dev/page-editor?vId=${result.data.ContentItemVersionId}`);
      //触发重新加载
      setIsMounted(false);
    } catch (errorInfo) {
      console.log('error: ', errorInfo);
    }
  };

  const renderPublish = () => {
    return (
      <Modal
        title="提示"
        zIndex={9999}
        open={state.showSaveModal}
        onOk={handlePublish}
        onCancel={() => {
          setState((s) => ({ ...s, showSaveModal: false }));
        }}
      >
        <Form
          labelAlign="right"
          labelCol={{ flex: '100px' }}
          form={publishForm}
          name="basic"
          autoComplete="off"
        >
          <Form.Item hidden={publishOption.publishLaterFlag} name="publish" label="发布状态">
            <Switch
              theme={state.theme}
              offText={'草稿'}
              onText={'立即发布'}
              value={publishOption.publish}
              onChange={(v) => setPublishOption((s) => ({ ...s, publish: v }))}
            />
          </Form.Item>
          <Form.Item hidden={publishOption.publish} name="publishLaterFlag" label="延迟发布">
            <Switch
              theme={state.theme}
              value={publishOption.publishLaterFlag}
              onChange={(v) => setPublishOption((s) => ({ ...s, publishLaterFlag: v }))}
            />
          </Form.Item>
          <Form.Item
            hidden={!publishOption.publishLaterFlag}
            name="publishLaterWhen"
            label="延时发布"
          >
            <AMISDatePicker
              theme={state.theme}
              value={publishOption.publishLaterWhen}
              onChange={(v) => setPublishOption((s) => ({ ...s, publishLaterWhen: v }))}
              timeFormat={'HH:mm'}
              inputFormat={'YYYY-MM-DD HH:mm'}
            ></AMISDatePicker>
          </Form.Item>
          <Form.Item name="versionDescription" label="版本描述">
            <Input.TextArea
              required={true}
              value={state.description}
              onChange={(event) => setState((s) => ({ ...s, description: event.target.value }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const changeFullScreen = () => {
    if (!state.fullScreen) {
      fullScreenHandle.enter();
      setState((s) => ({ ...s, fullScreen: true }));
    } else {
      fullScreenHandle.exit();
      setState((s) => ({ ...s, fullScreen: false }));
    }
    //console.log('changeFullScreen', state.fullScreen);
  };

  const handleSave = () => {
    makeSnapshot();
  };

  //类型生成

  const [genFromTypeform] = Form.useForm();

  const handleGenSchema = async () => {
    const settings = genFromTypeform.getFieldsValue();
    //console.log('formvalues', settings);
    const res = await amisRequest.request({
      url: `/api/ContentTypeManagement/GetTypeDefinitionForEdit`,
      method: 'GET',
      params: {
        name: genFromTypeform.getFieldValue('contentType'),
      },
    });
    const json = await buildCrud(res.data.data, settings);
    genFromTypeform.setFieldValue('json', JSON.stringify(json));
  };

  const handleAcceptSchema = async () => {
    const values = genFromTypeform.getFieldsValue();
    if (values.json) {
      setState((s) => ({
        ...s,
        showGenModal: false,
        schema: Object.assign({}, JSON.parse(values.json)),
      }));
      toast.success('页面已更新');
    }
  };

  const loadAllContentType = async () => {
    const result = await amisRequest.get(
      '/api/ContentTypeManagement/GetAllTypes?stereotype=1&pageSize=-1',
    );

    //console.log('dropdown options11', result);
    let items = result.data.data.items.map((x) => {
      return { label: x.displayName, value: x.name };
    });
    //console.log('dropdown options222', items);
    return items;
  };
  const [genFormState, setGenFormState] = useState({ isPartial: false });
  const renderGenCode = () => {
    return (
      <Modal
        width={'800px'}
        title="从现有模型生成页面"
        okText={'覆盖当前页面Schema'}
        onOk={handleAcceptSchema}
        destroyOnClose={true}
        onCancel={() => {
          setState((s) => ({ ...s, showGenModal: false }));
        }}
        open={state.showGenModal}
      >
        {/* <GenFromType setSchemaHandle={handleGen} /> */}
        <ProForm
          onFinish={handleGenSchema}
          submitter={{ searchConfig: { submitText: '生成' } }}
          labelAlign="right"
          style={{ marginTop: '20px', width: '750px' }}
          // labelCol={{ flex: '80px' }}
          form={genFromTypeform}
          name="basic"
          autoComplete="off"
        >
          <ProFormSelect
            name={'contentType'}
            label="内容模型"
            debounceTime={1000}
            showSearch
            request={async (keywords) => loadAllContentType()}
          ></ProFormSelect>

          <ProFormRadio.Group
            fieldProps={{
              defaultValue: 'hasPage',
            }}
            name="listType"
            label="数据源类型"
            options={[
              {
                label: '列表分页',
                value: 'hasPage',
              },
              {
                label: '不需要分页',
                value: 'noPage',
              },
            ]}
          />

          <Form.Item name={'isPartial'} label="只生成选中部分功能">
            <Switch
              theme={state.theme}
              onChange={(v) => {
                setGenFormState({ isPartial: v });
              }}
            ></Switch>
          </Form.Item>
          <ProFormRadio.Group
            hidden={!genFormState.isPartial}
            name="targetFunction"
            label="功能"
            options={['新增', '修改', '查看+修改', '删除', '导入']}
          />
          <ProFormCheckbox.Group
            hidden={genFormState.isPartial}
            name="functions"
            label="功能"
            fieldProps={{
              defaultValue: ['新增', '修改', '删除'],
            }}
            options={['新增', '修改', '查看+修改', '删除', '导入']}
          />

          <Form.Item name={'json'}>
            <MonacoJsonEditor
              theme={state.theme}
              language="json"
              name="json"
              height="100%" //不设置高度 会显示为1行。。设置了高度全屏 显示不全~~
              style={{ minHeight: '40vh' }}
              // options={{
              //   tabSize: 2,
              //   minimap: {
              //     enabled: true,
              //   },
              // }}
            ></MonacoJsonEditor>
          </Form.Item>
        </ProForm>
      </Modal>
    );
  };

  return (
    <FullScreen handle={fullScreenHandle}>
      <div
        className="Editor-Demo"
        style={{ height: state.fullScreen ? '100vh' : 'calc(100vh - 120px)' }}
      >
        {renderPublish()}
        {renderGenCode()}
        <div className="Editor-header">
          <div className="Editor-back">
            <Button
              type="link"
              onClick={() => {
                history.push('/sys/dev/ManagePages');
              }}
            >
              &lt; 返回列表
            </Button>
          </div>
          <div className="Editor-title">
            {state.id
              ? `编辑-${state?.displayText}  ${state.latest ? '' : '-(草稿)'}`
              : state.title}
          </div>

          <div className="Editor-view-mode-group-container">
            <div className="Editor-view-mode-group">
              <div
                className={`Editor-view-mode-btn ${!state.isMobile ? 'is-active' : ''}`}
                onClick={() => {
                  setState((s) => ({ ...s, isMobile: false }));
                }}
              >
                <PCPreview title="PC模式" />
              </div>
              <div
                className={`Editor-view-mode-btn ${state.isMobile ? 'is-active' : ''}`}
                onClick={() => {
                  setState((s) => ({ ...s, isMobile: true }));
                }}
              >
                <H5Preview title="移动模式" />
              </div>
            </div>
          </div>

          <div className="Editor-header-actions">
            <ShortcutKey />
            <div style={{ marginLeft: '15px' }}>
              <Switch
                theme={state.theme}
                checked={state.debug}
                onText={'Debug 开启'}
                offText={'Debug 关闭'}
                onChange={() => toggleDebug()}
              />
            </div>
            <Select
              style={{ marginLeft: '15px' }}
              options={editorLanguages}
              value={getLocale()}
              onChange={(e: any) => changeLocale(e)}
            />

            {/* //TODO: 全屏后会导致看不到弹窗，后面再修 */}
            <div className={`header-action-btn exit-btn`} onClick={changeFullScreen}>
              {state.fullScreen ? '退出' : '全屏'}
            </div>

            <div
              className={`header-action-btn  ${state.preview ? 'primary' : ''}`}
              onClick={() => togglePreview()}
            >
              {state.preview ? '编辑' : '预览'}
            </div>

            <div style={{ marginLeft: '15px' }}>
              <Dropdown.Button
                icon={<DownOutlined />}
                menu={{
                  items: [
                    {
                      label: '从类型生成',
                      key: '1',
                      onClick: () => {
                        setState((s) => ({ ...s, showGenModal: true }));
                      },
                    },
                    {
                      label: '历史版本',
                      key: '2',
                      onClick: () => {
                        setState((s) => ({ ...s, showVersion: true }));
                      },
                    },
                  ],
                }}
              >
                加载...
              </Dropdown.Button>
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Button
                icon={<CloudUploadOutlined />}
                onClick={() => setState((s) => ({ ...s, showSaveModal: true }))}
              >
                发布
              </Button>
            </div>
          </div>
        </div>
        <div className="Editor-inner">
          <Editor
            theme={state.theme}
            preview={state.preview}
            isMobile={state.isMobile}
            value={state.schema}
            onChange={(value) => handleEdtorChange(value)}
            onPreview={() => {
              setState((s) => ({ ...s, preview: true }));
            }}
            onSave={() => handleSave()}
            className="is-fixed"
            $schemaUrl={schemaUrl}
            showCustomRenderersPanel={true}
            amisEnv={{ ...amisEnv }}
          />
        </div>
      </div>
    </FullScreen>
  );
};
export default PageEditor;
