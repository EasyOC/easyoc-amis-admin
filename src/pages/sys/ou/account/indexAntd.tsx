import AMISComponent from '@/components/AMISComponent';
import { wrapedResultRequest } from '@/services/requests';
import { deepMerge, treeMap } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Card, Col, Input, message, Modal, Row, Tree } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import { get, set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import scemaJsonData from './AccountModal.json';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

class UserDetailsDto {
  id!: number | null;
  userId!: string | null;
  userName!: string | null;
  normalizedUserName!: string | null;
  email!: string | null;
  normalizedEmail!: string | null;
  emailConfirmed!: boolean;
  isEnabled!: boolean;
  isLockoutEnabled!: boolean;
  lockoutEndUtc!: Date | null;
  accessFailedCount!: number;
  roleNames!: string[] | null;
  properties!: any | null;
}

interface DeptListItem {
  id: string;
  key: string;
  orderNo: string;
  deptName: string;
  title: string;
  createTime: string;
  remark: string;
  status: number;
  parentId: string;
  children: DeptListItem[] | undefined;
}

class TreeHelperConfig {
  id: string = 'id';
  children: string = 'children';
  pid: string = 'parentId';
  parentFinder?: (parent: any, current: any) => boolean;
  rootFinder?: (item: any) => boolean;
}

const Account: React.FC = () => {
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);

  const [schema, setSchema] = useState({});

  const [amisScoped, setAmisScoped] = useState(null as any);

  const [selectTreeKey, setSelectTreeKey] = useState(null as any);

  const [editUserModel, setEditUserModel] = useState({} as any);

  const [treeData, setTreeData] = useState([] as DataNode[]);

  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState([]);

  const amisRef = useRef(null);
  const actionRef = useRef<ActionType>();

  const getTitle = editUserModel.isUpdate ? '编辑账号' : '新增账号';

  const amisMounted = (amisScope: any) => {
    setAmisScoped({ ...amisScope });
  };

  // 新增或编辑用户的提交事件
  const handleOnOkClick = async () => {
    //console.log('amisScoped: ', amisScoped);
    const form = amisScoped.getComponentByName('page1.form1');
    //console.log('form: ', form);
    // 出发amis的表单校验
    const isValidated = await form.validate();
    //console.log('isValidated: ', isValidated);
    // 如果校验通过
    if (isValidated) {
      const userInfo = form.getValues();
      //console.log('userInfo: ', userInfo);
      // 如果是更新
      if (editUserModel.isUpdate) {
        wrapedResultRequest.request({
          url: '/api/Users/Update',
          method: 'POST',
          data: userInfo as UserDetailsDto,
        });

        message.success('User updated successfully');
      } else {
        // 如果是新增
        wrapedResultRequest.request({
          url: '/api/Users/NewUser',
          method: 'POST',
          data: userInfo as UserDetailsDto,
        });

        message.success('User created successfully');
      }

      setEditUserModalVisible(false);

      actionRef.current?.reload();
    }
  };

  // 树节点选中事件
  const onTreeSelect = (selectedKeys: any, e: any) => {
    const { selected, selectedNodes, node, event } = e;
    //console.log('selectedKeys: ', selectedKeys);
    //console.log('selected: ', selected, selectedNodes, node, event);
    setSelectTreeKey(selectedKeys[0]);

    actionRef.current?.reloadAndRest();
  };

  const resetData = (data: any): any => {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        data[key] = resetData(data[key]);
      } else {
        data[key] = '';
      }
    }
    return data;
  };

  // 新建用户弹窗
  const handleOnCreateClick = async () => {
    setEditUserModel({ isUpdate: false });
    setEditUserModalVisible(true);
    if (amisScoped) {
      const form = amisScoped.getComponentByName('page1.form1');
      if (form) {
        const data = JSON.parse(JSON.stringify(form.props.data));

        const newData = resetData(data); //defaultsDeep('', [JSON.parse(JSON.stringify(data))]);
        //console.log('newData: ', newData);

        // form.reset();
        setSchema({
          ...schema,
          data: { ...newData },
        });
      }
    }
  };
  let isMounted = false;

  const mergeConfig = (config: Partial<TreeHelperConfig>) =>
    deepMerge(
      {
        id: 'id',
        children: 'children',
        pid: 'pid',
      },
      config,
    ) as TreeHelperConfig;

  const getChildren = (list: any[], parent: any, config: Partial<TreeHelperConfig> = {}) => {
    const conf = mergeConfig(config);
    const { id, children, pid, parentFinder } = conf;
    const childNodes = list.filter((x) => {
      if (parentFinder) {
        return parentFinder(parent, x);
      } else {
        return get(x, pid as string) == get(parent, id);
      }
    });
    childNodes.forEach((element) => {
      getChildren(list, element, config);
    });
    set(parent, children, childNodes);
  };

  const listToTree = (list: any[], config: Partial<TreeHelperConfig>): any[] => {
    // eslint-disable-next-line no-param-reassign
    config = mergeConfig(config);
    if (!config.rootFinder) {
      config.rootFinder = (item) => !get(item, config.pid || '');
    }
    const rootNodes = list.filter(config.rootFinder);

    rootNodes.forEach((root) => {
      getChildren(list, root, config);
    });
    return rootNodes;
  };

  // 获取部门，并将部门构建成树的结构
  const getDept = async () => {
    const result = await wrapedResultRequest.request({
      url: '/api/graphql',
      method: 'POST',
      params: {
        query: `query data {
          data:queryDepartment {
            createdUtc
            description
            displayText
            modifiedUtc
            orderIndex
            publishedUtc
            status
            parentDepartmentId {
              contentItemIds
            }
            contentItemId
          }
        }`,
      },
    });

    const depList = result.data.data.map((x: any) => {
      const dept = {
        id: x.contentItemId,
        deptName: x.displayText,
        orderNo: x.orderIndex,
        createTime: x.createdUtc,
        remark: x.description,
        status: x.status ? 1 : 0,
        key: x.contentItemId,
        title: x.displayText,
      } as DeptListItem;
      if (x.parentDepartmentId?.contentItemIds) {
        dept.parentId = x.parentDepartmentId.contentItemIds[0];
      }
      return dept;
    });

    const treeList = listToTree(depList, {
      pid: 'parentId',
    });
    return treeList;
  };

  useEffect(() => {
    if (isMounted) {
      return;
    }
    setSchema(scemaJsonData);

    (async () => {
      const result = await getDept();

      const expandedKeys: any = [];

      treeMap(result, {
        children: 'children',
        conversion: (item: any) => {
          if (item.children && item.children.length > 0) {
            expandedKeys.push(item.key);
          }
        },
      });
      setTreeData(result);

      //console.log('expandedKeys: ', expandedKeys);
      setDefaultExpandedKeys(result.map((x) => x.key) as []);
    })();
    isMounted = true;
  }, []);

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      sorter: true,
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      sorter: true,
      width: 120,
    },
    {
      title: 'Nick Name',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'NickName', 'Text'],
      width: 120,
    },
    {
      title: 'First Name',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'FirstName', 'Text'],
      width: 120,
    },
    {
      title: 'Last Name	',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'LastName', 'Text'],
      width: 120,
    },
    {
      title: 'Gender',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'Gender', 'Text'],
      width: 120,
    },
    {
      title: 'Job Title',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'JobTitle', 'Text'],
      width: 120,
    },
    {
      title: '部门',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'Department', '0'],
      width: 120,
    },
    {
      title: '直属上级',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'Manager', 'DisplayText'],
      width: 120,
    },
    {
      title: '员工号',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'EmployeCode', 'Text'],
      width: 120,
    },
    {
      title: '真实姓名',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'RealName', 'Text'],
      width: 120,
    },
    {
      title: '用户头像',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'Avatar', 'Paths', '0'],
      width: 120,
    },
    {
      title: '登录名',
      dataIndex: ['properties', 'UserProfileInternal', 'UserProfilePart', 'Name', 'Text'],
      width: 120,
    },
    {
      title: '操作',
      width: 90,
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            //action?.startEditable?.(record.id);
            //console.log('text: ', text);
            //console.log('record: ', record);
            //console.log('action: ', action);
            setEditUserModalVisible(true);
            //console.log('amisRef: ', amisRef);
            //console.log('amisScoped: ', amisScoped);
            setEditUserModel({ isUpdate: true });

            setSchema({ ...schema, data: { ...record } });

            // if (amisScoped) {
            //   const form = amisScoped.getComponentByName('page1.form1');
            //   console.log('form: ', form);

            //   if (form) {
            //     form.setValues({ ...record, isUpdate: true });
            //   }
            // }
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <div>
      <Modal
        title={getTitle}
        visible={editUserModalVisible}
        onCancel={() => setEditUserModalVisible(false)}
        onOk={handleOnOkClick}
      >
        <AMISComponent
          schema={schema}
          trackerFn={(a, b) => {
            //console.log('GenFromType tracker scope', amisScoped);
            //console.log('GenFromType tracker', a, b);
          }}
          amisMounted={amisMounted}
        />
      </Modal>
      <div>
        <Row>
          <Col span="5">
            <Card>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree
                treeData={treeData}
                expandedKeys={defaultExpandedKeys}
                onSelect={onTreeSelect}
              />
            </Card>
          </Col>
          <Col span="19">
            <ProTable<GithubIssueItem>
              columns={columns}
              actionRef={actionRef}
              cardBordered
              request={async (params: any, sort, filter) => {
                //console.log('params: ', params);
                //console.log(sort, filter);

                let sortkey, sortorder;
                // eslint-disable-next-line guard-for-in
                for (const key in sort) {
                  sortkey = key;
                  sortorder = sort[key];
                }

                const res = await wrapedResultRequest.request({
                  url: '/api/Users/GetAll',
                  method: 'GET',
                  params: {
                    pageSize: params.pageSize,
                    page: params.current,
                    SortField: sortkey,
                    SortOrder: sortorder,
                    departmentId: selectTreeKey,
                  },
                });

                const data = {
                  data: res?.data?.items || [],
                  total: res?.data?.total || 1,
                  page: params.current,
                };

                return data;
              }}
              editable={{
                type: 'multiple',
              }}
              columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                onChange(value) {
                  //console.log('value: ', value);
                },
              }}
              rowKey="id"
              search={{
                labelWidth: 100,
              }}
              form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                  if (type === 'get') {
                    return {
                      ...values,
                      created_at: [values.startTime, values.endTime],
                    };
                  }
                  return values;
                },
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                onChange: (page) => console.log(page),
              }}
              dateFormatter="string"
              headerTitle="高级表格"
              toolBarRender={() => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={handleOnCreateClick}
                >
                  新建
                </Button>,
              ]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Account;
