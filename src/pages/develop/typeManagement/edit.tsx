import AMISComponent from '@/components/AMISComponent';
import { treeFind } from '@/utils';
import { PageContainer } from '@ant-design/pro-components';
// import jsonschema from './edit.json';
import { addField, updateField } from './ModelsER/components/typeNodeService';

//查找组件
// const btnCtl = treeFind(jsonschema, (node) => node.id == '');
//修改组件事件
// btnCtl
export default () => {
  const fieldFormSchema = (isNew) => {
    return {
      type: 'form',
      onEvent: {
        submitSucc: {
          weight: 0,
          actions: [
            {
              actionType: 'custom',
              script: (context, doAction, event) => {
                let formdata = context.getData();
                const data = [
                  ...event.data.recipe.ContentPartDefinitionRecord
                    .ContentPartFieldDefinitionRecords,
                ];
                data[event.data.index] = formdata;
                doAction({
                  actionType: 'setValue',
                  componentId: 'frmType',
                  args: {
                    value: {
                      recipe: {
                        ...event.data.recipe,
                        ContentPartDefinitionRecord: {
                          ContentPartFieldDefinitionRecords: data,
                        },
                      },
                    },
                  },
                });
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
          disabled: !isNew,
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
                      option: '',
                      id: 'u:79ce100f5166',
                      mode: 'normal',
                      staticClassName: '',
                    },
                  ],
                  strictMode: true,
                  syncFields: [],
                  tabsMode: false,
                  mode: 'normal',
                  maxLength: '',
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

  const jsScheme = () => {
    const jsS = {
      type: 'page',
      regions: ['body', 'toolbar', 'header'],
      body: [
        {
          type: 'form',
          title: '表单',
          body: [
            {
              type: 'grid',
              columns: [
                {
                  body: [
                    {
                      type: 'select',
                      label: '类型',
                      name: 'typeName',
                      id: 'u:01e84799b97b',
                      source: {
                        method: 'get',
                        url: '/api/ContentTypeManagement/GetAllTypes',
                        data: {
                          typeName: '${typeName}',
                          pageSize: -1,
                        },
                        adaptor:
                          'var items = response.data.items.map(x=>{\r\n    return {label:x.displayName,value:x.name}\r\n})\r\nreturn {options:items}',
                        replaceData: false,
                        dataType: 'json',
                        messages: {},
                      },
                      searchable: true,
                      submitOnChange: false,
                      validations: {},
                      mode: 'horizontal',
                      size: '',
                      horizontal: {
                        leftFixed: 'normal',
                        left: 2,
                        right: 10,
                      },
                      checkAll: false,
                      multiple: false,
                      value: 'JinShuiProductCode',
                    },
                  ],
                  id: 'u:99d4de29bfc8',
                },
                {
                  body: [
                    {
                      type: 'submit',
                      label: '刷新',
                      id: 'u:c25bbea0513a',
                      checkAll: false,
                      level: 'primary',
                    },
                  ],
                  md: 3,
                  id: 'u:12fa4d220217',
                },
              ],
              id: 'u:eec0b89bd4a5',
            },
          ],
          id: 'u:crud',
          actions: [],
          submitOnChange: true,
          submitOnInit: true,
          reload: 'frmType',
          target: 'frmType',
          checkAll: false,
          name: 'firstForm',
          wrapWithPanel: false,
          className: 'm-b',
          mode: 'horizontal',
          horizontal: {
            leftFixed: '',
            left: 4,
            right: 8,
          },
        },
        {
          type: 'form',
          title: '类型管理',
          body: [
            {
              type: 'input-text',
              id: 'u:a2462ffb5d3a',
              label: '显示名称',
              name: 'recipe.ContentTypeDefinitionRecord.DisplayName',
            },
            {
              type: 'input-text',
              label: '技术名称',
              name: 'recipe.ContentTypeDefinitionRecord.Name',
              id: 'u:19f1ad66f79e',
            },

            {
              type: 'tabs',
              tabs: [
                {
                  title: '字段',
                  body: [
                    {
                      type: 'grid',
                      columns: [
                        {
                          body: [
                            {
                              type: 'input-table',
                              name: 'recipe.ContentPartDefinitionRecord.ContentPartFieldDefinitionRecords',
                              label: '字段列表',
                              columns: [
                                {
                                  label: '显示名称',
                                  name: 'Settings.ContentPartFieldSettings.DisplayName',
                                  // quickEdit: {
                                  //   type: 'input-text',
                                  //   name: 'Settings.ContentPartFieldSettings.DisplayName',
                                  // },
                                  id: 'u:a06d524fe3d9',
                                },
                                {
                                  label: '技术名',
                                  name: 'Name',
                                  // quickEdit: {
                                  //   type: 'input-text',
                                  //   name: 'Name',
                                  // },
                                  id: 'u:ab9ef29927e8',
                                  type: 'text',
                                },
                                // 类型
                                {
                                  label: '类型',
                                  name: 'FieldName',
                                  // quickEdit: {
                                  //   type: 'select',
                                  //   name: 'FieldName',
                                  //   id: 'u:f53f66009b4f',
                                  //   multiple: false,
                                  //   options: [
                                  //     {
                                  //       label: '文本',
                                  //       value: 'TextField',
                                  //     },
                                  //     {
                                  //       label: '布尔值',
                                  //       value: 'BooleanField',
                                  //     },
                                  //     {
                                  //       label: '内容选择器',
                                  //       value: 'ContentPickerField',
                                  //     },
                                  //     {
                                  //       label: '用户选择器',
                                  //       value: 'UserPickerField',
                                  //     },
                                  //   ],
                                  //   mode: 'popOver',
                                  // },
                                  id: 'u:92fccdae42e5',
                                  type: 'mapping',
                                  map: {
                                    '*': '通配值',
                                    TextField: '文本',
                                    BooleanField: '布尔值',
                                    ContentPickerField: '内容选择器',
                                    UserPickerField: '用户选择器',
                                    NumericField: '数值',
                                  },
                                  placeholder: '-',
                                },
                                // 操作
                                {
                                  type: 'operation',
                                  label: '操作',
                                  hidden: false,
                                  width: 50,
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
                                                const data = [
                                                  ...event.data.recipe.ContentPartDefinitionRecord
                                                    .ContentPartFieldDefinitionRecords,
                                                ];
                                                data.splice(event.data.index, 1);
                                                doAction({
                                                  actionType: 'setValue',
                                                  componentId: 'frmType',
                                                  args: {
                                                    value: {
                                                      recipe: {
                                                        ...event.data.recipe,
                                                        ContentPartDefinitionRecord: {
                                                          ContentPartFieldDefinitionRecords: data,
                                                        },
                                                      },
                                                    },
                                                  },
                                                });
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
                                            // const data = removeFields(nodeData, scope.data.selectedItems);
                                            doAction({
                                              actionType: 'setValue',
                                              componentId: 'u:crud',
                                              args: {
                                                value: {
                                                  // items: [
                                                  //   ...data.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords,
                                                  // ],
                                                },
                                              },
                                            });
                                            // crudDoAction(data);
                                          },
                                        },
                                      ],
                                    },
                                  },
                                },
                              ],
                              headerToolbar: [
                                {
                                  type: 'button',
                                  actionType: 'drawer',
                                  icon: 'fa fa-plus',
                                  label: '新增',
                                  size: 'sm',
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
                              ],
                              // addable: true,
                              strictMode: true,
                              id: 'u:da87bd4ae935',
                              minLength: 0,
                              showIndex: false,
                              mode: 'normal',
                            },
                          ],
                          id: 'u:3df3db4b8cf4',
                        },
                        // 部件
                        {
                          body: [
                            {
                              type: 'input-table',
                              columns: [
                                {
                                  name: 'Name',
                                  label: '部件名称',
                                  id: 'u:a06d524fe3d9',
                                },
                                {
                                  label: 'JSON',
                                  type: 'tpl',
                                  id: 'u:f761c5617e11',
                                  // quickEdit: {
                                  //   type: 'editor',
                                  //   name: 'Settings',
                                  //   id: 'u:38e4d54b9b8e',
                                  //   label: 'JSON预览',
                                  //   mode: 'popOver',
                                  //   saveImmediately: false,
                                  //   language: 'json',
                                  // },
                                  placeholder: '-',
                                },
                                {
                                  type: 'operation',
                                  label: '操作',
                                  hidden: false,
                                  width: 50,
                                  buttons: [
                                    {
                                      type: 'button',
                                      icon: 'fa fa-pencil',
                                      level: 'link',
                                      actionType: 'drawer',
                                      drawer: {
                                        type: 'drawer',
                                        title: '编辑',
                                        id: 'u:78aacd2ce06b',
                                        resizable: true,
                                        closeOnEsc: true,
                                        withDefaultData: false,
                                        dataMapSwitch: false,
                                        size: 'md',
                                        overlay: false,
                                        body: [
                                          {
                                            type: 'tabs',
                                            tabs: [
                                              {
                                                title: 'Title',
                                                body: [
                                                  {
                                                    type: 'input-text',
                                                    label: '显示名称',
                                                    name: 'Settings.ContentTypePartSettings.DisplayName',
                                                    id: 'u:aaf92f5f4ba1',
                                                    description: '将在屏幕中显示的零件的名称。',
                                                    value: 'Title',
                                                  },
                                                  {
                                                    type: 'input-text',
                                                    label: '描述',
                                                    name: 'Settings.ContentTypePartSettings.Description',
                                                    id: 'u:7311f11028ac',
                                                    description: '将在屏幕中显示的零件的说明。',
                                                    value:
                                                      'Provides a Title for your content item.',
                                                  },
                                                ],
                                                id: 'u:0f5bde06a3f1',
                                                hiddenOn: "${PartName!='TitlePart'}",
                                              },
                                              {
                                                title: '地址信息',
                                                body: [
                                                  {
                                                    type: 'input-text',
                                                    label: '显示名称',
                                                    name: 'Settings.ContentTypePartSettings.DisplayName',
                                                    id: 'u:69bbd56b28f4',
                                                    description: '将在屏幕中显示的零件的名称。',
                                                  },
                                                  {
                                                    type: 'input-text',
                                                    label: '描述',
                                                    name: 'Settings.ContentTypePartSettings.Description',
                                                    id: 'u:7c6dbae03cbb',
                                                    description: '将在屏幕中显示的零件的说明。',
                                                  },
                                                  {
                                                    type: 'checkbox',
                                                    option: '折叠',
                                                    name: 'Settings.GraphQLContentTypePartSettings.Collapse',
                                                    id: 'u:b16871b2952d',
                                                    description:
                                                      '检查以折叠 graphql 架构中的字段。',
                                                  },
                                                  {
                                                    type: 'checkbox',
                                                    option: '隐藏',
                                                    name: 'Settings.GraphQLContentTypePartSettings.Hidden',
                                                    id: 'u:7a7613075dd8',
                                                    description:
                                                      '选中可以隐藏 GrapphQL 模式的类型。',
                                                  },
                                                ],
                                                id: 'u:503a8b2066fd',
                                                hiddenOn: "${PartName!='AddressPart'}",
                                              },
                                              {
                                                title: '数据容器',
                                                body: [
                                                  {
                                                    type: 'checkbox',
                                                    option: '折叠',
                                                    name: 'Settings.GraphQLContentTypePartSettings.Collapse',
                                                    id: 'u:f4600312b911',
                                                    description:
                                                      '检查以折叠 graphql 架构中的字段。',
                                                  },
                                                  {
                                                    type: 'checkbox',
                                                    option: '隐藏',
                                                    name: 'Settings.GraphQLContentTypePartSettings.Hidden',
                                                    id: 'u:d06bd4deaed6',
                                                    description:
                                                      '选中可以隐藏 GrapphQL 模式的类型。',
                                                  },
                                                ],
                                                id: 'u:0dfe9f1b62c2',
                                                hiddenOn: "${PartName!='DIndexPart'}",
                                              },
                                            ],
                                            id: 'u:ad732a22084c',
                                            hidden: false,
                                          },
                                        ],
                                      },
                                      id: 'u:2390b1025db2',
                                    },
                                    {
                                      type: 'button',
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
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                  id: 'u:81578b2c1896',
                                },
                              ],
                              id: 'u:da87bd4ae935',
                              name: 'recipe.ContentTypeDefinitionRecord.ContentTypePartDefinitionRecords',
                              label: '部件列表',
                              footerAddBtn: {
                                label: '新增',
                                icon: 'fa fa-plus',
                                id: 'u:b621b048d522',
                              },
                              strictMode: true,
                              minLength: 0,
                              copyable: false,
                              editable: false,
                              removable: false,
                              showIndex: false,
                              mode: 'normal',
                            },
                          ],
                          id: 'u:d951cec1d746',
                        },
                      ],
                      id: 'u:e9874d82adda',
                    },
                  ],
                  id: 'u:ef60795ad72c',
                },
                {
                  title: '变更预览',
                  body: [
                    {
                      type: 'diff-editor',
                      label: '',
                      name: 'recipe',
                      id: 'u:566e609a0d3a',
                      language: 'json',
                      diffValue: '${snapshot}',
                      mode: 'normal',
                      allowfullScreen: true,
                    },
                  ],
                  id: 'u:f4c3dffd9f25',
                  themeConfig: {},
                  className: 'b-5x',
                },
              ],
              id: 'u:28f461d523ac',
              themeConfig: {},
            },

            {
              type: 'crud',
              id: 'u:crud',
              data: 'recipe.ContentPartDefinitionRecord.ContentPartFieldDefinitionRecords',
              columns: [
                {
                  label: '显示名称',
                  name: 'Settings.ContentPartFieldSettings.DisplayName',
                  id: 'u:a06d524fe3d9',
                },
                {
                  label: '技术名',
                  name: 'Name',
                  id: 'u:ab9ef29927e8',
                  type: 'text',
                },
                // 类型
                {
                  label: '类型',
                  name: 'FieldName',
                  id: 'u:92fccdae42e5',
                  type: 'mapping',
                  map: {
                    '*': '通配值',
                    TextField: '文本',
                    BooleanField: '布尔值',
                    ContentPickerField: '内容选择器',
                    UserPickerField: '用户选择器',
                    NumericField: '数值',
                  },
                  placeholder: '-',
                },
                // 操作
                {
                  type: 'operation',
                  label: '操作',
                  hidden: false,
                  width: 50,
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
                                const data = [
                                  ...event.data.recipe.ContentPartDefinitionRecord
                                    .ContentPartFieldDefinitionRecords,
                                ];
                                data.splice(event.data.index, 1);
                                doAction({
                                  actionType: 'setValue',
                                  componentId: 'frmType',
                                  args: {
                                    value: {
                                      recipe: {
                                        ...event.data.recipe,
                                        ContentPartDefinitionRecord: {
                                          ContentPartFieldDefinitionRecords: data,
                                        },
                                      },
                                    },
                                  },
                                });
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
                            // const data = removeFields(nodeData, scope.data.selectedItems);
                            doAction({
                              actionType: 'setValue',
                              componentId: 'u:crud',
                              args: {
                                value: {
                                  // items: [
                                  //   ...data.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords,
                                  // ],
                                },
                              },
                            });
                            // crudDoAction(data);
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              headerToolbar: [
                {
                  type: 'button',
                  actionType: 'drawer',
                  icon: 'fa fa-plus',
                  label: '新增',
                  size: 'sm',
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
              ],
            },
          ],
          mode: 'horizontal',
          id: 'frmType',
          checkAll: false,
          name: 'frmType',
          initApi: {
            method: 'get',
            messages: {},
            url: '/api/ContentTypeManagement/GetTypeDefinitionRecipe?name=${typeName}&withSettings=true',
            adaptor:
              '\r\nconst snapshot = JSON.stringify(response.data,null,2)\r\nconst recipe = { ...response.data }\r\n\r\nreturn {\r\n  snapshot,\r\n  recipe\r\n}',
            sendOn: 'this.typeName',
          },
          // debug: true,
          themeConfig: {},
          onEvent: {
            change: {
              weight: 0,
              actions: [],
            },
          },
        },
      ],
      messages: {},
      style: {
        boxShadow: ' 0px 0px 0px 0px transparent',
      },
      title: '类型管理',
      toolbar: [
        {
          type: 'button',
          label: '创建类型',
          actionType: 'dialog',
          dialog: {
            title: '系统提示',
            body: '对你点击了',
          },
          id: 'u:c05b56857f31',
        },
      ],
      id: 'u:a37e55d78e70',
      pullRefresh: {
        disabled: true,
      },
    };
    console.log('🚀 ~ file: edit.tsx:832 ~ jsScheme ~ jsS:', jsS);
    return jsS;
  };
  return (
    <PageContainer>
      <AMISComponent schema={jsScheme} />
    </PageContainer>
  );
};