import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Col, Row, Modal, Form, Input } from 'antd';
import { Node, Graph } from '@antv/x6';
import defaultRequest from '@/services/requests/defaultRequest';
import { toast } from 'amis';
import copy from 'copy-to-clipboard';
import AMISComponent from '@/components/AMISComponent';
import './index.less';
import { ContentType } from '@/types/src/OCRecipeTypes';
import { useSize } from 'ahooks';
import { addField, removeField, removeFields, TempFiled, updateField } from './typeNodeService';

export const loadTypeRecipeData = async (typeName): Promise<ContentType> => {
  const result = await defaultRequest.request({
    url: `/api/ContentTypeManagement/GetTypeDefinitionRecipe?name=${typeName}`,
    method: 'GET',
    params: {
      name: typeName,
    },
  });
  console.log('🚀 ~ file: typeNode.tsx:21 ~ loadTypeRecipeData ~ result:', result);
  return result.data.data;
};

export const InitNewNodeData = (formData: { Name: string; DisplayName: string }) => {
  const nodeData = {
    dataChanged: true,
    isNew: true,
    ContentTypeDefinitionRecord: {
      Name: formData.Name,
      DisplayName: formData.DisplayName,
      Settings: {
        ContentTypeSettings: {
          Stereotype: '',
          Creatable: true,
          Listable: true,
          Draftable: true,
          Versionable: true,
          Securable: true,
          Description: formData.DisplayName,
        },
        FullTextAspectSettings: {},
        GraphQLContentTypeSettings: {},
      },
      ContentTypePartDefinitionRecords: [
        {
          PartName: formData.Name,
          Name: formData.Name,
          Settings: {
            ContentTypePartSettings: {
              Position: '1',
            },
          },
        },
      ],
    },
    ContentPartDefinitionRecord: {
      Name: formData.Name,
      Settings: {},
      ContentPartFieldDefinitionRecords: [],
    },
  } as Partial<ContentTypeNodeData>;
  return nodeData;
};

export type ContentTypeNodeData = ContentType & {
  afterLoad?: (node: Node, graph: Graph) => void;

  initNodeData?: () => Promise<void>;
  /**
   * 标识当前类型是否需要提交更新
   */
  dataChanged: boolean;
  /**
   * 标识该类型是否是新增的
   */
  isNew: boolean;
  /**
   * 服务端未更改的类型快照
   */
  serverSnapsort?: ContentType;
};
export type TypeNodeProps = Node & {
  data: ContentTypeNodeData;
};

const NodeComponent = (props: { node: TypeNodeProps; graph: Graph }) => {
  const { node, graph } = props;
  const { id } = node;

  // const [nodeData, setNodeData] = useState<ContentTypeNodeData>(node.data);
  const [nodeState, setNodeState] = useState<{
    showNameEditModal: boolean;
    showType: boolean;
    showName: boolean;
    width: number;
    expand: boolean;
    editMode: boolean;
  }>({
    showNameEditModal: false,
    showType: false,
    showName: false,
    expand: false,
    editMode: false,
    width: 200,
  });

  let mounted = false;
  const initNodeData = async () => {
    try {
      // alert(node.id);

      const result = await loadTypeRecipeData(id);
      console.log('🚀 ~ file: typeNode.tsx:69 ~ initNodeData ~ result:', result);
      node.data = {
        ...node.data,
        ...result,
        dataChanged: false,
        isNew: false,
        serverSnapsort: { ...result },
      } as ContentTypeNodeData;
    } catch (error) {
      node.data = {
        ...node.data,
        dataChanged: false,
        isNew: false,
        ...InitNewNodeData({ Name: '', DisplayName: '' }),
      };
      // const nodeType = node.data as ContentType;
    } finally {
      // setNodeData(node.data);
      node.data?.afterLoad?.(node);
      mounted = true;
    }
  };

  node.data.initNodeData = initNodeData;

  useEffect(() => {
    if (!mounted) {
      if (id && !(node.data as ContentTypeNodeData).ContentPartDefinitionRecord) {
        initNodeData();
      }
    }
  }, [id, node]);

  // useEffect(() => {
  //   node.data = nodeData;
  // }, [nodeData]);

  const nodeHtmlRootRef = useRef(null);
  const nodeHtmlRootSize = useSize(nodeHtmlRootRef);
  useEffect(() => {
    const nodeSize = props.node.size();
    if (
      Math.abs(nodeSize.width - (nodeHtmlRootSize?.width as number)) > 18 ||
      Math.abs(nodeSize.height - (nodeHtmlRootSize?.height as number)) > 10
    ) {
      props.node.resize(
        (nodeHtmlRootSize?.width as number) + 10,
        (nodeHtmlRootSize?.height as number) + 5,
      );
    }
    // props.node.resize(nodeHtmlRootSize?.width as number, nodeHtmlRootSize?.height as number);
  }, [nodeHtmlRootSize]);

  const crudDoAction = (data) => {
    node.data.ContentPartDefinitionRecord.ContentPartFieldDefinitionRecords =
      data?.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords;
    node.data.dataChanged = true;

    node.data = {
      ...node.data,
      ...data,
      dataChanged: true,
    };
    node.data?.afterLoad?.(node, graph);
  };

  const fieldFormSchema = (isAdd) => {
    return {
      type: 'form',
      onEvent: {
        submitSucc: {
          weight: 0,
          actions: [
            {
              actionType: 'custom',
              script: (formRendder, doAction) => {
                const formData = formRendder.getData();
                const data = isAdd
                  ? addField(node.data, formData as TempFiled)
                  : updateField(node.data, formData as TempFiled, formData.index);
                console.log('🚀 ~ file: typeNode.tsx:123 ~ fieldFormSchema ~ data:', data);
                doAction({
                  actionType: 'setValue',
                  componentId: 'u:crud',
                  args: {
                    value: {
                      items: [
                        ...(data.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords ||
                          []),
                      ],
                    },
                  },
                });
                crudDoAction(data);
              },
            },
          ],
          reload: 'crudTable',
        },
      },
      canAccessSuperData: true,
      body: [
        {
          name: 'index',
          type: 'hidden',
          value: '${index}',
        },
        {
          name: 'Settings.ContentPartFieldSettings.DisplayName',
          label: '显示名称',
          id: 'u:a06d524fe3d9',
          type: 'input-text',
          required: true,
        },
        {
          name: 'Name',
          label: '技术名',
          type: 'input-text',
          placeholder: '技术名称',
          disabled: !isAdd,
          id: 'u:ab9ef29927e8',
          hidden: false,
          validations: {
            matchRegexp: '^[a-zA-Z_$][a-zA-Z0-9_$]*$',
          },
          validationErrors: {
            matchRegexp: '不能以数字开头',
          },
          required: true,
          value:
            '${IF(__isPlaceholder,pinyinStartCase(Settings.ContentPartFieldSettings.DisplayName),Name)}',
          addOn: {
            label: 'Pinyin',
            type: 'button',
            position: 'right',
            id: 'u:e463287acabd',
            onEvent: {
              click: {
                weight: 0,
                actions: [
                  {
                    actionType: 'setValue',
                    componentId: 'u:ab9ef29927e8',
                    args: {
                      value: '${pinyinStartCase(Settings.ContentPartFieldSettings.DisplayName)}',
                    },
                  },
                ],
              },
            },
          },
        },
        {
          label: '字段类型',
          name: 'FieldName',
          id: 'u:f53f66009b4f',
          type: 'select',
          multiple: false,
          required: true,
          options: [
            {
              label: '文本',
              value: 'TextField',
            },
            {
              label: '数值',
              value: 'NumericField',
            },
            {
              label: '多行文本',
              value: 'MultiTextField',
            },
            {
              label: '布尔值',
              value: 'BooleanField',
            },
            {
              label: '内容选择器',
              value: 'ContentPickerField',
            },
            {
              label: '用户选择器',
              value: 'UserPickerField',
            },
          ],
        },
        {
          type: 'tabs',
          tabs: [
            // 文本字段设置
            {
              title: '文本字段设置',
              body: [
                {
                  type: 'checkbox',
                  option: '必填',
                  name: 'Settings.TextFieldSettings.Required',
                  id: 'u:23dbeec8feb2',
                  description: '是否需要值。',
                },
                {
                  type: 'textarea',
                  name: 'Settings.TextFieldSettings.Hint',
                  id: 'u:5c9187f1bc57',
                  description: '编辑器上为此字段显示的提示文本。',
                  label: '提示',
                  minRows: 3,
                  maxRows: 20,
                },
                {
                  type: 'input-text',
                  name: 'Settings.TextFieldSettings.DefaultValue',
                  id: 'u:9ccaec74e498',
                  description: '默认值。（可选）',
                  label: '默认值',
                },
              ],
              id: 'u:b6d4d131ea9c',
              hiddenOn: "${FieldName!='TextField'}",
            },
            // 数字字段设置
            {
              title: '数字字段设置',
              body: [
                {
                  type: 'checkbox',
                  option: '必填',
                  name: 'Settings.NumericFieldSettings.Required',
                  id: 'u:4c7974c5617e',
                  description: '是否需要值。',
                },
                {
                  type: 'textarea',
                  name: 'Settings.NumericFieldSettings.Hint',
                  id: 'u:6f8658a0147d',
                  description: '编辑器上为此字段显示的提示文本。',
                  label: '提示',
                  minRows: 3,
                  maxRows: 20,
                },
                {
                  type: 'input-text',
                  label: '水印（占位符）',
                  name: 'Settings.NumericFieldSettings.Placeholder',
                  id: 'u:7d3e9ed2d299',
                  description: '当输入为空时显示的提示。(可选)',
                },
                {
                  type: 'input-text',
                  label: '小数位数',
                  name: 'Settings.NumericFieldSettings.Scale',
                  id: 'u:1a891fb8dc6e',
                  description: '小数点后的位数。',
                },
                {
                  type: 'input-text',
                  label: '最小值',
                  name: 'Settings.NumericFieldSettings.Minimum',
                  id: 'u:c29de66766e7',
                  description: '允许的最小值。（可选）',
                },
                {
                  type: 'input-text',
                  label: '最大值',
                  name: 'Settings.NumericFieldSettings.Maximum',
                  id: 'u:6fc966b9c11a',
                  description: '允许的最大值。（可选）',
                },
                {
                  type: 'input-text',
                  label: '默认值',
                  name: 'Settings.NumericFieldSettings.DefaultValue',
                  id: 'u:a110189dd2eb',
                  description: '默认值(可选)',
                },
              ],
              id: 'u:82730d725eeb',
              hiddenOn: "${FieldName!='NumericField'}",
            },
            // 多行文本
            {
              title: '多行文本',
              body: [
                {
                  type: 'checkbox',
                  option: '必填',
                  name: 'Settings.MultiTextFieldSettings.Required',
                  id: 'u:10533c8ecb28',
                  description: '值是必需的',
                  label: '',
                },
                {
                  type: 'textarea',
                  label: '提示',
                  name: 'Settings.MultiTextFieldSettings.Hint',
                  id: 'u:b5044fad2534',
                  minRows: 3,
                  maxRows: 20,
                  description: '编辑器中显示此字段的提示文本。',
                },
                {
                  type: 'combo',
                  label: '选项',
                  name: 'Settings.MultiTextFieldSettings.Options',
                  id: 'u:4803e1009548',
                  multiple: true,
                  removable: true,
                  removableMode: 'icon',
                  addBtn: {
                    label: '添加选项',
                    icon: 'fa fa-plus',
                    level: 'primary',
                    size: 'sm',
                    id: 'u:69a80bf99221',
                  },
                  items: [
                    {
                      type: 'input-text',
                      name: 'name',
                      placeholder: '文本',
                      id: 'u:ed758c4d3c22',
                      description: '',
                      label: '选项标签',
                      clearable: false,
                      mode: 'normal',
                    },
                    {
                      type: 'input-text',
                      name: 'value',
                      placeholder: '文本',
                      id: 'u:95398dda20e1',
                      description: '',
                      label: '值',
                      mode: 'normal',
                    },
                    {
                      type: 'checkbox',
                      name: 'default',
                      label: '默认',
                      id: 'u:79ce100f5166',
                      mode: 'normal',
                    },
                  ],
                  strictMode: true,
                  syncFields: [],
                  tabsMode: false,
                  mode: 'normal',
                },
              ],
              id: 'u:a01a0ac8d278',
              hiddenOn: "${FieldName!='MultiTextField'}",
            },
            // 内容选择设置
            {
              title: '内容选择设置',
              body: [
                {
                  type: 'checkbox',
                  option: '必填',
                  name: 'Settings.ContentPickerFieldSettings.Required',
                  id: 'u:c666dfc05bd6',
                  description: '是否选择至少一个元素。',
                  value: false,
                  mode: 'horizontal',
                },
                {
                  type: 'checkbox',
                  option: '允许多个',
                  name: 'Settings.ContentPickerFieldSettings.Multiple',
                  id: 'u:4964b9771e0d',
                  description: '是否允许选择多个元素。',
                  label: '',
                  mode: 'horizontal',
                },
                {
                  type: 'select',
                  label: '内容类型',
                  name: 'Settings.ContentPickerFieldSettings.DisplayedContentTypes',
                  id: 'u:1b4d272d02aa',
                  multiple: true,
                  searchable: true,
                  clearable: true,
                  defaultCheckAll: false,
                  checkAllLabel: '全选',
                  source: {
                    url: '/api/ContentTypeManagement/GetAllTypes?PageSize=-1',
                    method: 'get',
                    requestAdaptor: '',
                    adaptor:
                      'const items = response.data.items.map((x) => {\r\n  return {\r\n    label: `${x.displayName}`,\r\n    value: x.name,\r\n  };\r\n});\r\nreturn { items, total: response.total };',
                    messages: {},
                    dataType: 'json',
                  },
                  checkAll: false,
                  size: 'full',
                  labelAlign: 'left',
                  joinValues: false,
                  extractValue: true,
                },
                {
                  type: 'textarea',
                  label: '提示',
                  name: 'Settings.ContentPickerFieldSettings.Hint',
                  id: 'u:b5044fad2534',
                  minRows: 3,
                  maxRows: 20,
                  description: '编辑器中显示此字段的提示文本。',
                },
              ],
              id: 'ContentPartFieldSettings',
              hiddenOn: "${FieldName!='ContentPickerField'}",
            },
            // 用户选择器
            {
              title: '用户选择器',
              body: [
                {
                  type: 'checkbox',
                  option: '必填',
                  name: 'Settings.UserPickerFieldSettings.Required',
                  id: 'u:e18f9052d734',
                  description: '是否选择至少一个元素。',
                  value: false,
                  mode: 'horizontal',
                },
                {
                  type: 'checkbox',
                  option: '允许多个',
                  name: 'Settings.UserPickerFieldSettings.Multiple',
                  id: 'u:4964b9771e0d',
                  description: '是否允许选择多个元素。',
                  label: '',
                  mode: 'horizontal',
                },
                {
                  type: 'select',
                  label: '显示所有用户',
                  name: 'Settings.UserPickerFieldSettings.DisplayedRoles',
                  id: 'u:dc692abc15b9',
                  multiple: true,
                  checkAll: false,
                  description: '是否允许选取者显示所有角色的用户。',
                  source: {
                    url: 'api/Roles/GetRoles',
                    method: 'get',
                    requestAdaptor: '',
                    adaptor:
                      'const items = response.data.map((x) => {\r\n    return {\r\n        label: `${x.roleName}`,\r\n        value: x.roleName,\r\n    };\r\n});\r\nreturn { items };',
                    messages: {},
                    dataType: 'json',
                  },
                  searchable: true,
                  clearable: true,
                },
                {
                  type: 'textarea',
                  label: '提示',
                  name: 'Settings.UserPickerFieldSettings.Hint',
                  id: 'u:ee7d699c706b',
                  minRows: 3,
                  maxRows: 20,
                  description: '编辑器中显示此字段的提示文本。',
                  mode: 'horizontal',
                },
              ],
              id: 'u:c18a0cc71ac2',
              hiddenOn: "${FieldName!='UserPickerField'}",
            },
            // 布尔值
            {
              title: '布尔值',
              body: [
                {
                  type: 'textarea',
                  label: '提示',
                  name: 'Settings.BooleanFieldSettings.Hint',
                  id: 'u:e714c0c33cb8',
                  minRows: 3,
                  maxRows: 20,
                  description: '编辑器上为此字段显示的提示文本。',
                },
                {
                  type: 'input-text',
                  label: '标签',
                  name: 'Settings.BooleanFieldSettings.Label',
                  id: 'u:40abcc397e64',
                  description: '与该复选框关联的文本。',
                },
                {
                  type: 'checkbox',
                  option: '默认值为“true”。',
                  name: 'Settings.BooleanFieldSettings.DefaultValue',
                  id: 'u:b4c994af6884',
                  description: '创建新项目时，此字段将初始化。',
                },
              ],
              id: 'u:6dd378750473',
              hiddenOn: "${FieldName!='BooleanField'}",
            },
            // 全文索引设置
            {
              title: '全文索引设置',
              body: [
                {
                  type: 'checkbox',
                  id: 'u:559e5958fadd',
                  option: '在索引中包括此元素',
                  name: 'Settings.LuceneContentIndexSettings.Included',
                  description: '选中可将此元素的值包含在索引中。',
                },
                {
                  type: 'checkbox',
                  option: '关键字',
                  name: 'Settings.LuceneContentIndexSettings.Analyzed',
                  id: 'u:ca9a3d73ea90',
                  description: '选中可作为关键字值进行索引（作为单个标记进行索引）。',
                },
                {
                  type: 'checkbox',
                  id: 'u:07392650505e',
                  option: '已存储',
                  name: 'Settings.LuceneContentIndexSettings.Stored',
                  description: '选中可从索引中检索原始值。',
                },
              ],
              id: 'u:00093c9e7baf',
            },
          ],
          id: 'u:c97ba3ecfbff',
          tabsMode: '',
          showTip: false,
          activeKey: '',
          hidden: false,
        },
      ],
      id: 'u:24018a370066',
    };
  };

  const getNodeSchema = () => {
    const schema = {
      type: 'crud',
      affixHeader: false,
      id: 'u:crud',
      syncLocation: false,
      primaryField: 'Name',
      data: { items: node.data.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords },
      columns: [
        {
          name: 'Settings.ContentPartFieldSettings.DisplayName',
          label: '显示名称',
          id: 'u:a06d524fe3d9',
        },
        {
          name: 'Name',
          label: '技术名',
          type: 'text',
          id: 'u:ab9ef29927e8',
          hidden: !nodeState.showName,
        },
        {
          label: '类型',
          name: 'FieldName',
          width: 50,
          hidden: !nodeState.showType,
          id: 'u:92fccdae42e5',
          type: 'mapping',
          map: {
            '*': '通配值',
            MultiTextField: '多行文本',
            TextField: '文本',
            BooleanField: '布尔值',
            ContentPickerField: '内容选择器',
            UserPickerField: '用户选择器',
            NumericField: '数值',
          },
          // placeholder: '-',
        },
        {
          type: 'operation',
          label: '操作',
          hidden: !nodeState.editMode,
          // sortable: true,
          width: 70,
          buttons: [
            {
              type: 'button',
              icon: 'fa fa-pencil',
              level: 'link',
              actionType: 'drawer',
              drawer: {
                type: 'drawer',
                title: '编辑',
                body: [fieldFormSchema(false)],
                id: 'u:78aacd2ce06b',
                resizable: true,
                closeOnEsc: true,
                withDefaultData: false,
                dataMapSwitch: false,
                size: 'md',
                overlay: false,
              },
              id: 'u:2390b1025db2',
            },
            {
              type: 'button',
              // label: '删除',
              icon: 'fa fa-minus',
              level: 'link',
              className: 'text-danger',
              confirmText: '确定要删除？',
              id: 'u:53c93a8ddcc2',
              onEvent: {
                click: {
                  actions: [
                    {
                      actionType: 'custom',
                      script: (context, doAction, event) => {
                        const delIdndex = event.data.index;
                        const data = removeField(node.data, delIdndex);
                        doAction({
                          actionType: 'setValue',
                          componentId: 'u:crud',
                          args: {
                            value: {
                              items: [
                                ...data.ContentPartDefinitionRecord
                                  .ContentPartFieldDefinitionRecords,
                              ],
                            },
                          },
                        });
                        crudDoAction(data);
                      },
                    },
                  ],
                },
              },
            },
          ],
          id: 'u:81578b2c1896',
        },
      ],
      bulkActions: [
        {
          type: 'button',
          level: 'link',
          label: '批量删除',
          actionType: 'ajax',
          confirmText: '确定要删除？',
          id: 'u:0af06c06dde3',
          onEvent: {
            click: {
              actions: [
                {
                  actionType: 'custom',
                  script: (context, doAction, event) => {
                    // console.log('nodeDatanodeData', nodeData);
                    const data = removeFields(node.data, event.data.selectedItems);
                    doAction({
                      actionType: 'setValue',
                      componentId: 'u:crud',
                      args: {
                        value: {
                          items: [
                            ...data.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords,
                          ],
                        },
                      },
                    });
                    crudDoAction(data);
                  },
                },
              ],
            },
          },
        },
      ],
      // itemActions: [],
      // features: ['create', 'update', 'delete', 'bulkDelete'],
      headerToolbar: nodeState.editMode
        ? [
            {
              type: 'drag-toggler',
              tpl: '内容',
              wrapperComponent: '',
              id: 'u:a0869072b1a0',
              align: 'right',
            },
            {
              type: 'button',
              actionType: 'drawer',
              size: 'sm',
              icon: 'fa fa-plus',
              level: 'link',
              drawer: {
                title: '新增',
                body: [fieldFormSchema(true)],
                resizable: true,
                closeOnEsc: true,
                // dataMapSwitch: false,
                size: 'md',
                overlay: false,
              },
              id: 'u:7fe0418f7258',
            },
            'bulkActions',
          ]
        : [],
    };
    console.log('schema', schema);
    return schema;
  };

  const editTypeSchema = {
    type: 'button',
    // label: '编辑',
    id: 'u:91c3b1b81',
    icon: 'fa fa-pencil',
    level: 'link',
    onEvent: {
      click: {
        actions: [
          {
            actionType: 'custom',
            script: (a, doAction, c) => {
              // 使用当前nodeData为表单设置初始值
              const editFormSchema = {
                type: 'form',
                data: (node.data as ContentTypeNodeData).ContentTypeDefinitionRecord,
                id: 'frmTypEdit',
                title: '表单',
                onEvent: {
                  submitSucc: {
                    weight: 0,
                    actions: [
                      {
                        actionType: 'custom',
                        script: (formRendder) => {
                          const formData = formRendder.getData();
                          node.data = {
                            ...node.data,
                            dataChanged: true,
                            ContentTypeDefinitionRecord: {
                              ...node.data.ContentTypeDefinitionRecord,
                              Name: formData.Name,
                              DisplayName: formData.DisplayName,
                            },
                          };
                        },
                      },
                    ],
                  },
                },
                body: [
                  {
                    type: 'input-text',
                    label: '显示名称',
                    name: 'DisplayName',
                    id: 'u:a73ec2dd0728',
                  },
                  {
                    label: '技术名称',
                    type: 'input-text',
                    name: 'Name',
                    id: 'u:1067cab4b614',
                    // value: '${IF(__isPlaceholder,pinyinStartCase(DisplayName),Name)}',
                    value: '${pinyinStartCase(DisplayName,Name)}',
                    addOn: {
                      label: 'Pinyin',
                      type: 'button',
                      position: 'right',
                      id: 'u:e463287acabd',
                      onEvent: {
                        click: {
                          weight: 0,
                          actions: [
                            {
                              actionType: 'setValue',
                              componentId: 'u:1067cab4b614',
                              args: {
                                value: '${pinyinStartCase(DisplayName)}',
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
                wrapWithPanel: false,
              };
              const dialogSchema = {
                actionType: 'dialog',
                dialog: {
                  type: 'dialog',
                  title: '编辑类型',
                  body: [editFormSchema],
                  showCloseButton: true,
                  showErrorMsg: true,
                  showLoading: true,
                  id: 'u:ca9bf9237cd6',
                  closeOnEsc: false,
                },
              };
              doAction(dialogSchema);
            },
          },
        ],
        weight: 0,
      },
    },
  };

  return (
    <div className="er-type-node">
      <div className="fields-nodeType" ref={nodeHtmlRootRef}>
        <Row className="custom-drag-handle">
          <Col>
            <div
              title="双击复制"
              style={{ fontSize: '15px', fontWeight: 'bold' }}
              onDoubleClick={() => {
                copy(props.node.data?.ContentTypeDefinitionRecord?.DisplayName);
                toast.success('显示名称已复制到剪切板');
              }}
            >
              {props.node.data?.ContentTypeDefinitionRecord?.DisplayName}
            </div>
            <span
              title="双击复制"
              className="cxd-TplField"
              onDoubleClick={() => {
                copy(id);
                toast.success('技术名称已复制到剪切板');
              }}
            >
              {props.node.data?.ContentTypeDefinitionRecord?.Name}
            </span>
          </Col>
          <span
            style={{
              marginRight: '5px',
              visibility: node.data.isNew || node.data.dataChanged ? 'visible' : 'hidden',
            }}
          >
            *
          </span>
          <Col>
            <AMISComponent schema={editTypeSchema} />
          </Col>
        </Row>
        <div className="fieldsList" style={{ userSelect: 'auto', cursor: 'default' }}>
          <div className="node-toolbar">
            <Checkbox
              checked={nodeState.expand}
              onChange={() => {
                setNodeState((s) => ({ ...s, expand: !s.expand }));
              }}
            >
              展开字段
            </Checkbox>
            {nodeState.expand ? (
              <Checkbox
                checked={nodeState.editMode}
                onChange={() => {
                  setNodeState((s) => ({
                    ...s,
                    editMode: !s.editMode,
                    showName: true,
                    showType: true,
                  }));
                }}
              >
                编辑模式
              </Checkbox>
            ) : (
              <></>
            )}

            {nodeState.expand ? (
              <div>
                <Checkbox
                  checked={nodeState.showName}
                  onChange={() => {
                    setNodeState((s) => ({ ...s, showName: !s.showName }));
                  }}
                >
                  技术名称
                </Checkbox>
                <Checkbox
                  checked={nodeState.showType}
                  onChange={() => {
                    setNodeState((s) => ({ ...s, showType: !s.showType }));
                  }}
                >
                  类型
                </Checkbox>
              </div>
            ) : (
              <></>
            )}
          </div>
          {nodeState.expand ? <AMISComponent schema={getNodeSchema} /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default NodeComponent;
