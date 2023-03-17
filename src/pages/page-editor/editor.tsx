import React, {useEffect, useState} from 'react';
import {Editor, ShortcutKey} from 'amis-editor';
// import '@/components/AMISComponent/components/DisabledEditorPlugin'; // 用于隐藏一些不需要的Editor预置组件

// import '@/components/AMISComponent/components/MyRenderer';
import AmisEnv from '@/services/amis/AmisEnv';
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Select
} from 'antd';

import {wrapedResultRequest} from '@/services/requests';
// import 'amis-editor-core/lib/style.css';
import './style.less';
import {Icon} from '@/icons/index';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import {excuteGraphqlQuery} from '@/services/graphql/graphqlApi';
import GenFromType from './Gencurd/GenFromType';
import {CloudUploadOutlined, DownOutlined} from '@ant-design/icons';
import {Switch, DatePicker as AMISDatePicker} from 'amis';
import {isEqual, unset} from 'lodash';
import {mustEndsWith} from '@/utils';
import qs from 'qs';
import dayjs from 'dayjs';
import {History} from 'history';
import {currentLocale} from 'i18n-runtime';
// import 'amis/schema.json';
//禁用部分组件
// import './components/DisabledEditorPlugin';

//#region 导入自定义组件
// import '@/components/AMISComponent/components/table/index';
// import TableEditor from '@/components/AMISComponent/components/table/tableEditor';
// import edit from '../type-management/edit';
// registerEditorPlugin(TableEditor);
//#endregion

const schemaUrl =
  mustEndsWith(import.meta.env.VITE_publicPathPrefix, '/') + 'amis/schema.json';
// @ts-ignore
// __uri?.('amis/schema.json');
console.log('schemaUrl: ', schemaUrl);
// import { MyRendererEditor } from '@/components/AMISComponent/components/myRendererEditor';

// import authService from './auth/authService';

// @ts-ignore
// __uri('amis/schema.json');

const AmisEditor: React.FC<{history: History}> = props => {
  const curLanguage = currentLocale(); // 获取当前语料类型

  const [form] = Form.useForm();
  const {history} = props;
  const [state, setState] = React.useState({
    // theme: initialState?.serverSideSettings?.siteSettingsData?.amis?.theme || 'cxd',
    theme: 'cxd',
    title: '可视化页面编辑器',
    isMobile: false,
    fullScreen: false,
    id: '',
    preview: false,
    schema: {
      type: 'page'
    } as any,
    version: '',
    displayText: '',
    description: '',
    name: '',
    showSaveModal: false,
    showGenModal: false,
    showVersion: false,
    latest: true,
    debug: AmisEnv.enableAMISDebug,
    currentLanguage: false
  });
  const {id, vId} = qs.parse(location.search);
  console.log(
    'history.location: ',
    history.location,
    qs.parse(history.location.search)
  );
  const fullScreenHandle = useFullScreenHandle();

  const editorLanguages = [
    {
      label: '简体中文',
      value: 'zh-CN'
    },
    {
      label: 'English',
      value: 'en-US'
    }
  ];

  const changeLocale = (value: string) => {
    localStorage.setItem('suda-i18n-locale', value);
    window.location.reload();
  };

  console.log('props: ', props);

  console.log('editor state', props);

  const makeSnapshot = (schema?: undefined) => {
    console.log('makeSnapshot state: ', state);
    if (!schema) {
      schema = state.schema;
    }
    //TODO: 为编辑器增加本地历史增加自动恢复功能
    //1. 打开页面时根据 当前内容的version 检查 localStorage
    //2. 如果浏览器本地保存有快照，则从快照中加载，且通过toast 提示用户“当前编辑内容为本地快照”
    //3. 增加按钮清除页面缓存，点击后删除当前版本的快照，然后调用api重新加载当前版本
    localStorage.setItem(
      `Editor_Snapshot_${state.version}`,
      JSON.stringify(schema)
    );
    message.success('已保存快照');
  };

  const clearSnapshot = (version: string) => {
    localStorage.removeItem(`Editor_Snapshot_${version}`);
  };

  const checkSnapshot = (version: string) => {
    const snapshot = localStorage.getItem(`Editor_Snapshot_${version}`);
    if (snapshot && !isEqual(snapshot, state.schema)) {
      Modal.confirm({
        title: '提示',
        content: '检测到与当前版本不同的本地快照，是否加载?',
        onOk: () => {
          const snapshotContent = JSON.parse(snapshot);
          console.log('snapshotContent: ', snapshotContent);
          setState(s => ({...s, schema: snapshotContent}));
        },
        onCancel: () => {
          Modal.confirm({
            title: '提示',
            content: '是否清除快照？',
            onOk: () => {
              clearSnapshot(version);
              message.success('快照已清理');
            }
          });
        },
        cancelText: '取消'
      });
    }
  };

  const handleEdtorChange = (schema: any) => {
    console.log('handleEdtorChange', schema);
    setState(s => ({...s, schema}));
  };
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  useEffect(() => {
    checkSnapshot(state.version);
  }, [state.version]);

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
                }`
      }).then(result => {
        console.log('可视化编辑器 result: ', result);
        if (result?.contentItem) {
          try {
            const jData = result?.contentItem?.schema;
            let schema: any;
            if (jData) {
              try {
                schema = JSON.parse(jData);
              } catch (error) {
                message.error('schema 格式错误');
              }
            }
            setState(s => ({
              ...s,
              ...result?.contentItem,
              //最后修改时间
              modified: result?.contentItem?.modifiedUtc
                ? new Date(result?.contentItem?.modifiedUtc)
                : null,
              schema: schema || s.schema
            }));
          } catch (error) {
            message.error('加载失败');
          }
        }
      });
    }
  }, [isMounted, vId, id]);

  const togglePreview = () => {
    console.log('state.preview', !state.preview);
    if (!state.preview) {
      makeSnapshot();
    }
    setState(s => ({...s, preview: !state.preview}));
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

  const [publishOption, setPublishOption] = useState<{
    publish: boolean;
    publishLaterFlag: boolean;
    publishLaterWhen: Date;
  }>({
    publish: false,
    publishLaterFlag: false,
    publishLaterWhen: new Date()
  });

  const handlePublish = async () => {
    try {
      const values = await form.validateFields();
      console.log('values: ', values);
      values.properties = {
        AuditTrailPart: {
          Comment: values.versionDescription
        }
      };
      if (publishOption.publishLaterFlag) {
        values.properties.PublishLaterPart = {
          ScheduledPublishUtc: dayjs(publishOption.publishLaterWhen)
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
          ...values
        },
        timeout: 10000
      });
      setPublishOption({} as any);
      form.resetFields();
      clearSnapshot(state.version);
      setState(s => ({...s, showSaveModal: false}));
      history.push(
        `/sys/dev/page-editor?vId=${result.data.ContentItemVersionId}`
      );
      //触发重新加载
      setIsMounted(false);
    } catch (errorInfo) {
      console.log('error: ', errorInfo);
    }
  };

  const changeFullScreen = () => {
    if (!state.fullScreen) {
      fullScreenHandle.enter();
      setState(s => ({...s, fullScreen: true}));
    } else {
      fullScreenHandle.exit();
      setState(s => ({...s, fullScreen: false}));
    }
    console.log('changeFullScreen', state.fullScreen);
  };

  const handleGen = (schemaInput: any) => {
    handleEdtorChange(state.schema);
    setState(s => ({
      ...s,
      showGenModal: false,
      schema: Object.assign({}, schemaInput)
    }));
  };

  const handleSave = () => {
    makeSnapshot();
  };

  const getEnv = () => {
    return {...AmisEnv};
  };

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="Editor-Demo">
        <Modal
          title="提示"
          zIndex={9999}
          open={state.showSaveModal}
          onOk={handlePublish}
          onCancel={() => {
            setState(s => ({...s, showSaveModal: false}));
          }}
        >
          <Form
            labelAlign="right"
            labelCol={{flex: '100px'}}
            form={form}
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              hidden={publishOption.publishLaterFlag}
              name="publish"
              label="立即发布"
            >
              <Switch
                value={publishOption.publish}
                onChange={(v: any) =>
                  setPublishOption(s => ({...s, publish: v}))
                }
              />
            </Form.Item>
            <Form.Item
              hidden={publishOption.publish}
              name="publishLaterFlag"
              label="延迟发布"
            >
              <Switch
                value={publishOption.publishLaterFlag}
                onChange={(v: any) =>
                  setPublishOption(s => ({...s, publishLaterFlag: v}))
                }
              />
            </Form.Item>
            <Form.Item
              hidden={!publishOption.publishLaterFlag}
              name="publishLaterWhen"
              label="延时发布"
            >
              <AMISDatePicker
                value={publishOption.publishLaterWhen}
                onChange={(v: any) =>
                  setPublishOption(s => ({...s, publishLaterWhen: v}))
                }
                timeFormat={'HH:mm'}
                inputFormat={'YYYY-MM-DD HH:mm'}
              ></AMISDatePicker>
            </Form.Item>
            <Form.Item name="versionDescription" label="版本描述">
              <Input.TextArea
                value={state.description}
                onChange={event =>
                  setState(s => ({...s, description: event.target.value}))
                }
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          okButtonProps={{hidden: true}}
          cancelButtonProps={{hidden: true}}
          onOk={() => setState(s => ({...s, showGenModal: false}))}
          destroyOnClose={true}
          onCancel={() => {
            setState(s => ({...s, showGenModal: false}));
          }}
          open={state.showGenModal}
        >
          <GenFromType setSchemaHandle={handleGen} />
        </Modal>
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
                className={`Editor-view-mode-btn ${
                  !state.isMobile ? 'is-active' : ''
                }`}
                onClick={() => {
                  setState(s => ({...s, isMobile: false}));
                }}
              >
                <Icon icon="pc-preview" title="PC模式" />
              </div>
              <div
                className={`Editor-view-mode-btn ${
                  state.isMobile ? 'is-active' : ''
                }`}
                onClick={() => {
                  setState(s => ({...s, isMobile: true}));
                }}
              >
                <Icon icon="h5-preview" title="移动模式" />
              </div>
            </div>
          </div>

          <div className="Editor-header-actions">
            <ShortcutKey />
            <div style={{marginLeft: '15px'}}>
              <Switch
                checked={state.debug}
                onText={'Debug 开启'}
                offText={'Debug 关闭'}
                onChange={() => toggleDebug()}
              />
            </div>
            <Select
              style={{marginLeft: '15px'}}
              options={editorLanguages}
              value={curLanguage}
              onChange={(e: any) => changeLocale(e)}
            />
            <div
              className={`header-action-btn exit-btn`}
              onClick={changeFullScreen}
            >
              {state.fullScreen ? '退出' : '全屏'}
            </div>

            <div
              className={`header-action-btn  ${state.preview ? 'primary' : ''}`}
              onClick={() => togglePreview()}
            >
              {state.preview ? '编辑' : '预览'}
            </div>

            <div style={{marginLeft: '15px'}}>
              <Dropdown.Button
                icon={<DownOutlined />}
                overlay={() => {
                  return (
                    <Menu
                      items={[
                        {
                          label: '从类型生成',
                          key: '1',
                          onClick: () => {
                            setState(s => ({...s, showGenModal: true}));
                          }
                        },
                        {
                          label: '历史版本',
                          key: '2',
                          onClick: () => {
                            setState(s => ({...s, showVersion: true}));
                          }
                        }
                      ]}
                    />
                  );
                }}
              >
                加载...
              </Dropdown.Button>
            </div>
            <div style={{marginLeft: '15px'}}>
              <Button
                icon={<CloudUploadOutlined />}
                onClick={() => setState(s => ({...s, showSaveModal: true}))}
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
            onChange={value => handleEdtorChange(value)}
            onPreview={() => {
              setState(s => ({...s, preview: true}));
            }}
            onSave={() => handleSave()}
            className="is-fixed"
            $schemaUrl={schemaUrl}
            showCustomRenderersPanel={true}
            amisEnv={{...getEnv()}}
          />
        </div>
      </div>
    </FullScreen>
  );
};
export default AmisEditor;
