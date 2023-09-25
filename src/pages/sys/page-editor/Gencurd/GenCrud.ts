/* eslint-disable @typescript-eslint/no-use-before-define */

import { camelCase, mustNotEndsWith } from '@/utils';
import { merge } from 'lodash';
import type { ContentFieldsMappingDto, EditViewContentDefinitionDto } from './contentApi';
import { FieldType } from './contentApi';
// import { ContentFieldsMappingDto, EditViewContentDefinitionDto } from '@pkg/apis/eoc/app-service-proxies';
import crud from './schematpls/crud';

function genColumns(
  fields: ContentFieldsMappingDto[],
  filterFields: any[],
  typeName: string,
  gpFields: string,
) {
  const viewDetailsBodyFields: any = [];
  const editFormBodyColumns: any = [
    {
      type: 'property',
      id: 'u:1577f3084cdd',
      title: '',
      labelStyle: {
        textAlign: 'right',
      },
      contentStyle: {
        textAlign: 'left',
      },
      items: [
        {
          label: '编号',
          content: '${contentItemId}',
          span: 1,
        },
        {
          label: '版本号',
          content: '${contentItemVersionId}',
          span: 1,
        },
        {
          label: '添加时间',
          content: '${createdUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss }',
          span: 1,
        },
        {
          label: '修改人',
          content: '${author}',
          span: 1,
        },
        {
          span: 1,
          label: '修改时间',
          content: '${modifiedUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss } ',
        },
        // {
        //     "span": 1,
        //     "label": "最新版本",
        //     "content": "${latest?\"是\":\"否\"}"
        // }
      ],
      column: 2,
      mode: 'table',
      closeOnEsc: false,
      closeOnOutside: false,
      showCloseButton: true,
      className: 'm-b-md',
    },
  ];

  const defaultSchema = [
    {
      type: 'operation',
      name: 'displayText',
      label: '显示名称',
      buttons: [
        {
          type: 'button',
          label: '${displayText||contentItemId}',
          actionType: 'drawer',
          level: 'link',
          drawer: {
            name: 'contentViewer',
            title: [
              {
                type: 'grid',
                id: 'u:4c36265f4f72',
                columns: [
                  {
                    body: [
                      {
                        type: 'tpl',
                        tpl: '${displayText||contentItemId}',
                        inline: false,
                        id: 'u:150d786edfa7',
                        wrapperComponent: 'h1',
                      },
                    ],
                    md: 9,
                  },
                  {
                    body: [
                      {
                        type: 'container',
                        body: [
                          {
                            type: 'button-toolbar',
                            buttons: [
                              {
                                label: '编辑',
                                type: 'button',
                                actionType: 'drawer',
                                level: 'success',
                                drawer: {
                                  resizable: true,
                                  type: 'drawer',

                                  title: '编辑',
                                  body: [
                                    {
                                      type: 'form',
                                      body: editFormBodyColumns,
                                      initApi: {
                                        method: 'get',
                                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                                        url: genDetailsApi(typeName, gpFields),
                                        data: null,
                                        dataType: 'json',
                                        replaceData: true,
                                        onPreRequest: '',
                                        responseData: null,
                                        adaptor: 'return {data:response.data.contentItem}',
                                        sendOn: '!!this.contentItemId',
                                      },
                                      api: {
                                        method: 'post',
                                        url: '/api/ContentManagement/PostContent',
                                        dataType: 'json',
                                        data: {
                                          '&': '$$',
                                          contentType: typeName,
                                        },
                                      },
                                      name: 'EditForm',
                                      actions: [
                                        {
                                          type: 'button',
                                          label: '取消',
                                          actionType: 'cancel',
                                          id: 'u:69fd7c21307f',
                                        },
                                        {
                                          type: 'button',
                                          label: '提交',
                                          actionType: 'confirm',
                                          id: 'u:1a8dd8ace1f7',
                                          reload: 'contentMangeCrud,contentViewer',
                                          level: 'primary',
                                        },
                                      ],
                                      debug: false,
                                    },
                                  ],
                                  closeOnEsc: true,
                                  closeOnOutside: true,
                                  showCloseButton: true,
                                  size: 'lg',
                                },
                              },
                              {
                                type: 'button',
                                label: '删除',
                                actionType: 'ajax',
                                level: 'danger',
                                tooltip: '',
                                tooltipPlacement: 'bottom',
                                confirmText: '确认删除此内容吗？',
                                api: {
                                  method: 'delete',
                                  url: '/api/ContentManagement/Delete?contentItemId=${contentItemId}',
                                },
                              },
                            ],
                            id: 'u:a285dc1ca629',
                          },
                        ],
                        id: 'u:5f77e976da71',
                        style: {
                          float: 'right',
                        },
                      },
                    ],
                    md: 3,
                  },
                ],
              },
            ],
            body: [
              {
                type: 'form',
                onEvent: {
                  submitSucc: {
                    weight: 0,
                    actions: [
                      {
                        componentId: 'u:9d76fc1b21cc',
                        args: {
                          resetPage: true,
                        },
                        actionType: 'reload',
                        dataMergeMode: 'merge',
                      },
                    ],
                  },
                },
                initApi: {
                  method: 'get',
                  url: genDetailsApi(typeName, gpFields),
                  data: null,
                  dataType: 'json',
                  replaceData: true,
                  onPreRequest: '',
                  responseData: null,
                  adaptor: 'return {data:response.data.contentItem}',
                  sendOn: '!!this.contentItemId',
                },
                body: [
                  {
                    type: 'property',
                    className: 'b-b m-b',
                    labelStyle: {
                      textAlign: 'right',
                    },
                    contentStyle: {
                      textAlign: 'left',
                    },
                    column: 2,
                    items: [
                      {
                        label: '编号',
                        content: '${contentItemId}',
                        span: 1,
                      },
                      {
                        label: '版本号',
                        content: '${contentItemVersionId}',
                        span: 1,
                      },
                      {
                        span: 1,
                        label: '修改时间',
                        content: '${modifiedUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss } ',
                      },
                      {
                        label: '修改人',
                        content: '${author}',
                        span: 1,
                      },
                      {
                        label: '添加时间',
                        content: '${createdUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss }',
                        span: 1,
                      },
                    ],
                  },
                  {
                    type: 'property',
                    labelStyle: {
                      textAlign: 'right',
                    },
                    contentStyle: {
                      textAlign: 'left',
                    },
                    column: 2,
                    items: viewDetailsBodyFields,
                  },
                ],
              },
            ],
            type: 'drawer',
            resizable: true,
            closeOnEsc: true,
            closeOnOutside: true,
            showCloseButton: false,
            size: 'lg',
            data: null,
            actions: [],
          },
        },
      ],
    },
  ];

  const defaultfilterFieldList = [
    {
      name: 'displayText',
      label: '显示名称',
      type: 'text',
      operators: genFilterOptions(FieldType.TextField),
    },
    // {
    //     "label": "最新版",
    //     "name": "latest",
    //     "type": "boolean",
    //     operators: genFilterOptions(FieldType.BooleanField)
    // },
    {
      name: 'published',
      label: '发布状态',
      type: 'select',
      operators: genFilterOptions(FieldType.ContentPickerField),
      options: [
        {
          label: '已发布或草稿',
          value: 'PUBLISHEDORLATEST',
        },
        {
          label: '只看最新版',
          value: 'LATEST',
        },
        {
          label: '所有发布版',
          value: 'PUBLISHED',
        },
        {
          label: '所有草稿',
          value: 'DRAFT',
        },
      ],
    },

    {
      label: '修改时间',
      name: 'modifiedUtc',
      type: 'date',
      operators: genFilterOptions(FieldType.DateField),
    },
    {
      label: '添加时间',
      type: 'date',
      name: 'createdUtc',
      operators: genFilterOptions(FieldType.DateField),
    },
    {
      type: 'select',
      name: 'author',
      label: '修改人',
      operators: genFilterOptions(FieldType.UserPickerField),
      source: {
        method: 'post',
        url: '/api/graphql',
        dataType: 'json',
        replaceData: false,
        requestAdaptor: `const query=\`
                    {
                        options:userProfile(first: 10}) {
                          label:displayText
                          value:userId
                        }
                      }\`
                    api.data={query}
                    return api`,
      },
    },
  ];

  defaultfilterFieldList.forEach((field) => filterFields.push(field));

  //filterFields =  [...defaultfilterFieldList];

  fields
    .filter((x) => !x.isBasic)
    .forEach((o) => {
      const field: any = {
        name: o.graphqlValuePath,
        label: o.displayName,
      };

      if (!ColExceptFields.includes(o.fieldType || '') && o.isSelf) {
        field.sortable = true;
      }

      const seeField: any = {
        content: '${ ' + o.graphqlValuePath + ' }',
        label: o.displayName,
        span: 1,
        type: 'text',
      };

      setColumnType(o, field);

      // 设置详情字段
      setViewDetailsField(o, seeField);
      defaultSchema.push(field);
      viewDetailsBodyFields.push(seeField);

      const editItem: any = {
        name: o.graphqlValuePath,
        label: o.displayName,
        description: o.description,
        type: 'input-text',
        required: false,
        disabled: false,
        // value: "${ " + o.graphqlValuePath + " }",
      };
      setEditField(o, editItem);
      editFormBodyColumns.push(editItem);

      const filterField = {
        label: o.displayName,
        name: o.graphqlValuePath,
        type: 'text',
      };
      setFilterColumnField(o, filterField, filterFields);
      // filterFields.push(filterField)
    });

  const restSchema = [
    // {
    //     "type": "status",
    //     "label": "最新版",
    //     "name": "latest",
    //     "toggled": false
    // },
    // {
    //     "type": "status",
    //     "name": "published",
    //     "label": "发布状态",
    //     "placeholder": "-",
    //     "toggled": false
    // },

    {
      type: 'date',
      label: '修改时间',
      name: 'modifiedUtc',
      placeholder: '-',
      sortable: true,
    },
    {
      name: 'createdUtc',
      label: '添加时间',
      type: 'date',
      placeholder: '-',
      sortable: true,
      toggled: false,
    },
    {
      type: 'text',
      name: 'author',
      label: '修改人',
      placeholder: '-',
      sortable: true,
    },
  ];
  defaultSchema.push(...(restSchema as any));
  // const formItems = genFormItems(fields);
  // formItems.forEach(o => editFormBodyColumns.push(o));
  //console.log('editFormBodyColumns: ', editFormBodyColumns);
  return defaultSchema;
}

// 生成新建页面的字段
function genFormItems(fields: ContentFieldsMappingDto[]) {
  const formItems: any[] = [];
  fields
    .filter((x) => !x.isBasic)
    .forEach((field) => {
      const item: any = {
        name: field.graphqlValuePath,
        label: field.displayName,
        description: field.description,
        type: 'input-text',
        required: false,
        disabled: false,
      };
      const fieldSettings = field.fieldSettings;
      if (field.fieldType)
        switch (field.fieldType) {
          case FieldType.TextField:
            item.type = 'input-text';
            if (fieldSettings?.ContentPartFieldSettings?.Editor == 'PredefinedList') {
              item.type = 'select';
              if (fieldSettings?.TextFieldPredefinedListEditorSettings?.Options) {
                item.options = fieldSettings?.TextFieldPredefinedListEditorSettings?.Options.map(
                  (x: any) => {
                    return {
                      label: x.name,
                      value: x.value,
                    };
                  },
                );
              }
            }
            break;
          //下拉菜单数据源
          case FieldType.ContentPickerField:
            merge(item, {
              type: 'select',
              checkAll: false,
              searchable: true,
              name: field.graphqlValuePath,
            });
            // eslint-disable-next-line no-case-declarations
            const pickerTypeConfig =
              fieldSettings?.ContentPickerFieldSettings?.DisplayedContentTypes;

            if (pickerTypeConfig && pickerTypeConfig.length > 0) {
              const pickerType = pickerTypeConfig[0];
              //console.log('genFormItems pickerTypeConfig: ', JSON.stringify(pickerTypeConfig), JSON.stringify(pickerTypeConfig[0]), JSON.stringify(pickerType));
              const multiple = fieldSettings?.ContentPickerFieldSettings?.Multiple ?? false;
              item.multiple = multiple;
              item.extractValue = multiple;

              if (multiple) {
                item.name = field.graphqlValuePath?.replace('firstValue', 'contentItemIds');
              }

              // else {
              //     item.name = field.graphqlValuePath?.replace('contentItemIds.firstValue', 'firstValue')
              // }
              item.autoComplete = {
                method: 'post',
                url: '/api/graphql',
                dataType: 'json',
                replaceData: false,
                requestAdaptor: `const query=\`
                            {
                                options:${camelCase(pickerType)}
                                (status: PUBLISHED, first: 10, 
                                    where: {displayText_contains: \\"\${api.body.term}\\"}) 
                                {
                                    label:displayText
                                    value:contentItemId
                                }
                            }\`
                            api.data={query}
                            return api`,
              };
            }
            break;
          case FieldType.UserPickerField:
            item.name = field.graphqlValuePath?.replace(
              'userIds.firstValue',
              'firstUserProfiles.displayText',
            );
            item.autoComplete = {
              method: 'post',
              url: '/api/graphql',
              dataType: 'json',
              replaceData: false,
              requestAdaptor: `const query=\`
                        {
                            options:userProfile(first: 10, where: {displayText_contains: \\"\${api.body.term}\\"}) {
                            label:displayText
                            value:userId
                            }
                        }\`
                        api.data={query}
                        return api`,
            };

            item.type = 'select';
            break;
          case FieldType.DateField:
            item.type = 'input-date';
            break;
          case FieldType.DateTimeField:
            item.type = 'input-datetime';
            break;
          case FieldType.TimeField:
            item.type = 'input-time';
            item.timeFormat = 'HH:mm:ss';
            break;
          case FieldType.BooleanField:
            item.type = 'switch';
            break;
        }
      formItems.push(item);
    });
  return formItems;
}

function genFilterOptions(fieldType: FieldType) {
  const defaultOptions: any = [
    { label: '等于', value: 'EQUALS' },
    { label: '不等于', value: 'NOT_EQUAL' },
  ];

  // {label:"模糊匹配",value:"CONTAINS"},
  // {label:"匹配开头",value:"STARTS_WITH"},
  // {label:"匹配结尾",value:"ENDS_WITH"},
  // {label:"不匹配",value:"NOT_CONTAINS"},
  // {label:"不开头",value:"NOT_STARTS_WITH"},
  // {label:"大于等于",value:"GREATER_THAN_OR_EQUAL"},
  // {label:"不结尾",value:"NOT_ENDS_WITH"},
  // {label:"大于",value:"GREATER_THAN"},
  // {label:"小于",value:"LESS_THAN"},
  // {label:"小于等于",value:"LESS_THAN_OR_EQUAL"},
  // {label:"范围",value:"RANGE"},
  // {label:"时间范围",value:"DATE_RANGE"},
  // {label:"包含",value:"ANY"},
  // {label:"不包含",value:"NOT_ANY"},
  // {label:"",value:"CUSTOM"},
  switch (fieldType) {
    case FieldType.TextField:
      defaultOptions.push({ label: '包含', value: 'CONTAINS' });
      defaultOptions.push({ label: '不匹配', value: 'NOT_CONTAINS' });
      defaultOptions.push({ label: '匹配开头', value: 'STARTS_WITH' });
      defaultOptions.push({ label: '匹配结尾', value: 'ENDS_WITH' });
      defaultOptions.push({ label: '不开头', value: 'NOT_STARTS_WITH' });
      defaultOptions.push({ label: '不结尾', value: 'NOT_ENDS_WITH' });
      break;
    case FieldType.NumericField:
      defaultOptions.push({ label: '大于等于', value: 'GREATER_THAN_OR_EQUAL' });
      defaultOptions.push({ label: '小于等于', value: 'LESS_THAN_OR_EQUAL' });
      defaultOptions.push({ label: '大于', value: 'GREATER_THAN' });
      defaultOptions.push({ label: '小于', value: 'LESS_THAN' });
      defaultOptions.push('between');
      break;
    case FieldType.DateField:
    case FieldType.DateTimeField:
      defaultOptions.push({ label: '大于等于', value: 'GREATER_THAN_OR_EQUAL' });
      defaultOptions.push({ label: '小于等于', value: 'LESS_THAN_OR_EQUAL' });
      defaultOptions.push({ label: '大于', value: 'GREATER_THAN' });
      defaultOptions.push({ label: '小于', value: 'LESS_THAN' });
      defaultOptions.push('between');
      break;
    case FieldType.UserPickerField:
    case FieldType.ContentPickerField:
      defaultOptions.push('select_any_in');
      defaultOptions.push('select_not_any_in');
      break;
    default:
      break;
  }

  return defaultOptions;
}
const graphqlPartName = (partName) => {
  return camelCase(mustNotEndsWith(partName, 'Part'));
};

// 生成详情页面的字段
function setViewDetailsField(fieldDef: ContentFieldsMappingDto, field: any) {
  field.type = 'text';
  switch (fieldDef.fieldType) {
    case FieldType.DateTimeField:
      field.content = '${createdUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss }';
      break;
    case FieldType.ContentPickerField:
      field.content =
        '${ ' +
        fieldDef.graphqlValuePath?.replace('firstValue', 'firstContentItem.displayText') +
        ' }';
      break;
    case FieldType.UserPickerField:
      field.content =
        '${ ' +
        fieldDef.graphqlValuePath?.replace('firstValue', 'firstUserProfiles.displayText') +
        ' }';
      break;
    case FieldType.MediaField:
      field.content = {
        type: 'image',
        src: "${'/media/'+" + fieldDef.graphqlValuePath + '.paths[0]| apiUrl }',
      };
      break;
    default:
      break;
  }
}

// 生成列表页面的字段
function setColumnType(fieldDef: ContentFieldsMappingDto, field: any) {
  field.type = 'text';
  switch (fieldDef.fieldType) {
    case FieldType.TextField:
      break;
    case FieldType.BooleanField:
      field.type = 'status';
      break;
    case FieldType.DateField:
    case FieldType.DateTimeField:
      field.type = 'date';
      field.placeholder = '-';
      break;
    case FieldType.TimeField:
      field.type = 'text';
      break;
    case FieldType.NumericField:
      field.type = 'text';
      break;
    case FieldType.ContentPickerField:
      field.name = fieldDef.graphqlValuePath?.replace('firstValue', 'firstContentItem.displayText');
      field.sortable = false;
      break;
    case FieldType.UserPickerField:
      field.name = fieldDef.graphqlValuePath?.replace(
        'firstValue',
        'firstUserProfiles.displayText',
      );
      field.sortable = false;
      break;
    case FieldType.MediaField:
      field.type = 'image';
      field.toggled = false;
      field.src = "${'/media/'+" + fieldDef.graphqlValuePath + '.paths[0]| apiUrl }';
      field.name = fieldDef.graphqlValuePath + '.paths[0]';
      break;
    default:
      field.type = 'text';
      break;
  }
}

// 生成高级筛选的字段
function setFilterColumnField(fieldDef: ContentFieldsMappingDto, field: any, filterFields: any[]) {
  switch (fieldDef.fieldType) {
    case FieldType.TextField:
      field.operators = genFilterOptions(fieldDef.fieldType);
      filterFields.push(field);
      break;
    case FieldType.BooleanField:
      field.type = 'boolean';
      field.operators = genFilterOptions(fieldDef.fieldType);
      filterFields.push(field);
      break;
    case FieldType.DateField:
    case FieldType.DateTimeField:
      field.type = 'date';
      field.operators = genFilterOptions(fieldDef.fieldType);
      filterFields.push(field);
      break;
    case FieldType.TimeField:
      field.type = 'time';
      field.operators = genFilterOptions(fieldDef.fieldType);
      filterFields.push(field);
      break;
    case FieldType.NumericField:
      field.type = 'number';
      field.operators = genFilterOptions(fieldDef.fieldType);
      filterFields.push(field);
      break;
    case FieldType.ContentPickerField:
      // eslint-disable-next-line no-case-declarations
      const pickerTypeConfig =
        fieldDef.fieldSettings?.ContentPickerFieldSettings?.DisplayedContentTypes;
      if (pickerTypeConfig && pickerTypeConfig.length > 0) {
        const pickerType = pickerTypeConfig[0];
        //console.log('etFilterColumnType pickerTypeConfig: ', JSON.stringify(pickerTypeConfig), JSON.stringify(pickerTypeConfig[0]), JSON.stringify(pickerType));
        //const multiple = fieldDef.fieldSettings?.ContentPickerFieldSettings?.Multiple ?? false
        //field.multiple = multiple
        //field.extractValue = multiple

        field.source = {
          method: 'post',
          url: '/api/graphql',
          dataType: 'json',
          replaceData: false,
          requestAdaptor: `
                        /*
                        Contains/StartsWith/EndsWith/NotContains/NotStartsWith/NotEndsWith：包含/不包含，like '%xx%'，或者 like 'xx%'，或者 like '%xx'
Equal/NotEqual：等于/不等于
GreaterThan/GreaterThanOrEqual：大于/大于等于
LessThan/LessThanOrEqual：小于/小于等于
Range：范围查询
DateRange：日期范围，有特殊处理 value[1] + 1
Any/NotAny：是否符合 value 中任何一项（直白的说是 SQL IN）
Custom：自定义解析

var filters = amisExt.buildConditionFilter([
    { "logic": "And", "operator": "Contains", "field": "displayText", "value": api.body.displayText },
    { "logic": "And", "operator": "Contains", "field": "pO", "value": api.body.poFilter },
    { "logic": "And", "operator": "Equals", "field": "sOA", "value": api.body.soaFilter },
    { "logic": "And", "operator": "Any", "field": "plant", "value": api.body.plantFilter },
    { "logic": "And", "operator": "Contains", "field": "item", "value": api.body.itemFilter },
    { "logic": "And", "operator": "Contains", "field": "vendor", "value": api.body.vendorFilter },
    { "logic": "And", "operator": "RANGE", "field": "documentDate", "value": api.body.docDateFilter }
  ])
  if (filters?.length > 0) {
    variables.jsonFilter = JSON.stringify({
      "filters": [
        ...filters
      ], "logic": "and"
    })
  }
  
                        
                        */
                            //console.log('genFilterOptions 111111111111111111111111')

                            //console.log("genFilterOptions body", api.body);
                            const text_containsName = "";

                            const query=\`
                            {
                                options:${camelCase(pickerType)}
                                (status: PUBLISHED, first: 10, 
                                    where: {displayText_contains: "\${text_containsName}"}) 
                                {
                                    label:displayText
                                    value:contentItemId
                                }
                            }\`
                            //console.log('genFilterOptions 3',query)

                            api.data={query}

                            //console.log('genFilterOptions 2',api)
                            return api`,
        };
      }
      field.name = fieldDef.graphqlValuePath?.replace(
        'contentItemIds.firstValue',
        'firstContentItem.displayText',
      );
      field.type = 'select';
      field.operators = genFilterOptions(fieldDef.fieldType);
      filterFields.push(field);
      break;
    case FieldType.UserPickerField:
      field.name = fieldDef.graphqlValuePath?.replace(
        'userIds.firstValue',
        'firstUserProfiles.displayText',
      );
      field.type = 'select';
      field.operators = genFilterOptions(fieldDef.fieldType);
      field.source = {
        method: 'post',
        url: '/api/graphql',
        dataType: 'json',
        replaceData: false,
        requestAdaptor: `const query=\`
                    {
                        options:userProfile(first: 10, where: {displayText_contains: "\${api.body.term}"}) {
                          label:displayText
                          value:userId
                        }
                      }\`
                    api.data={query}
                    return api`,
      };
      filterFields.push(field);
      break;
    case FieldType.MediaField:
    default:
      break;
  }
}

// 生成编辑表单的字段
function setEditField(fieldDef: ContentFieldsMappingDto, field: any) {
  if (fieldDef.fieldType)
    switch (fieldDef.fieldType) {
      case FieldType.TextField:
        field.type = 'input-text';
        if (fieldDef.fieldSettings?.ContentPartFieldSettings?.Editor == 'PredefinedList') {
          field.type = 'select';
          if (fieldDef.fieldSettings?.TextFieldPredefinedListEditorSettings?.Options) {
            field.options =
              fieldDef.fieldSettings?.TextFieldPredefinedListEditorSettings?.Options.map(
                (x: any) => {
                  return {
                    label: x.name,
                    value: x.value,
                  };
                },
              );
          }
        }
        break;
      //下拉菜单数据源
      case FieldType.ContentPickerField:
        merge(field, {
          type: 'select',
          checkAll: false,
          searchable: true,
          name: fieldDef.graphqlValuePath,
        });
        // eslint-disable-next-line no-case-declarations
        const pickerTypeConfig =
          fieldDef.fieldSettings?.ContentPickerFieldSettings?.DisplayedContentTypes;
        if (pickerTypeConfig && pickerTypeConfig.length > 0) {
          const pickerType = pickerTypeConfig[0];
          const multiple = fieldDef.fieldSettings?.ContentPickerFieldSettings?.Multiple ?? false;
          field.multiple = multiple;
          field.extractValue = multiple;

          if (multiple) {
            field.name = fieldDef.graphqlValuePath?.replace('firstValue', 'contentItemIds');
          }

          // else {
          //     field.name = fieldDef.graphqlValuePath?.replace('contentItemIds.firstValue', 'firstValue')
          // }
          field.autoComplete = {
            method: 'post',
            url: '/api/graphql',
            dataType: 'json',
            replaceData: false,
            requestAdaptor: `const query=\`
                        {
                            options:${camelCase(pickerType)}
                            (status: PUBLISHED, first: 10, 
                                where: {displayText_contains: \\"\${api.body.term}\\"}) 
                            {
                                label:displayText
                                value:contentItemId
                            }
                        }\`
                        api.data={query}
                        return api`,
          };
          // field.value = "${ " + fieldDef.graphqlValuePath?.replace('contentItemIds.firstValue', 'firstContentItem.displayText') + " }"
        }
        break;
      case FieldType.UserPickerField:
        field.name = fieldDef.graphqlValuePath?.replace(
          'userIds.firstValue',
          'firstUserProfiles.displayText',
        );
        field.autoComplete = {
          method: 'post',
          url: '/api/graphql',
          dataType: 'json',
          replaceData: false,
          requestAdaptor: `const query=\`
                    {
                        options:userProfile(first: 10, where: {displayText_contains: \\"\${api.body.term}\\"}) {
                          label:displayText
                          value:userId
                        }
                      }\`
                    api.data={query}
                    return api`,
        };

        field.type = 'select';
        break;
      case FieldType.DateField:
        field.type = 'input-date';
        break;
      case FieldType.DateTimeField:
        field.type = 'input-datetime';
        break;
      case FieldType.TimeField:
        field.type = 'input-time';
        field.timeFormat = 'HH:mm:ss';
        field.inputFormat = 'HH:mm:ss';
        break;
      case FieldType.BooleanField:
        field.type = 'switch';
        break;
      case FieldType.MediaField:
        // field.type = "input-image"
        field.name = fieldDef.graphqlValuePath + '.paths';
        break;
    }
}

// 生成GraphQL查询语句
export function buildGraphqlFields(fields: ContentFieldsMappingDto[]) {
  const gfields: { [key: string]: any } = {};
  fields
    // .filter((x) => !GraphQLNotSupportFields.includes(x.fieldType))
    .forEach((field) => {
      // console.log('field: ', field);
      const fieldName = camelCase(field.fieldName) ?? '';

      let tempPart = gfields;
      if (!field.isSelf) {
        if (!gfields[graphqlPartName(field.partName)]) {
          gfields[graphqlPartName(field.partName)] = {};
        }
        tempPart = gfields[graphqlPartName(field.partName)];
      }

      switch (field.fieldType) {
        case FieldType.ContentPickerField:
          tempPart[fieldName] = {
            firstValue: false,
            firstContentItem: {
              displayText: false,
            },
          };
          break;
        case FieldType.UserPickerField:
          tempPart[fieldName] = {
            firstValue: false,
            firstUserProfiles: { displayText: false },
          };
          break;
        case FieldType.MediaField:
          tempPart[fieldName] = {
            urls: false,
            paths: false,
          };
        case FieldType.HtmlField:
        case FieldType.GeoPointField:
          break;
        default:
          tempPart[fieldName] = false;
      }
    });
  // console.log('stringify', JSON.stringify(gfields, null, 2))
  // console.log('gfields: ', gfields);
  const tempGraphqlStr = JSON.stringify(gfields, null, 2).replace(/false|'|"|:|,/g, '');
  return tempGraphqlStr;
}

export default async function buildCrud(
  typeDef: EditViewContentDefinitionDto,
  genOptions?: {
    listType: 'hasPage' | 'noPage';
    isPartial: boolean;
    targetFunction: '新增' | '修改' | '删除' | '导入';
    functions: ('新增' | '修改' | '删除' | '导入')[];
  },
) {
  const typeName = typeDef.name as string;
  const fields = typeDef.fields as ContentFieldsMappingDto[];
  //console.log('fields: ', fields);
  const gpFields = buildGraphqlFields(fields as any);
  //根据字段构建查询字段
  const tempGraphqlStr = `query curdQuery($jsonFilter:String){ 
        data:pagedContentItems( 
            contentType: ${typeName}
            \${api.body.page?"page:"+api.body.page:""}  
            \${api.body.perPage?"pageSize:"+api.body.perPage:""}
            orderBy: {field: \\"\${api.body.orderBy?api.body.orderBy:'modifiedUtc'}\\", direction: \${api.body.orderDir?api.body.orderDir.toUpperCase():'DESC' } } 
            dynamicJSONFilter: $jsonFilter
              )
            {  
                total                 
                items 
                { 
                    ... on  ${typeName}
                        ${gpFields}
                    
                }
            }
        }`;

  // const tempGraphqlStr = ` {
  //     items: ${typeName[0].toLowerCase()+ typeName.slice(1)} ${buildGraphqlFields(fields as any)}
  //   }`
  // console.log('tempGraphqlStr: ', tempGraphqlStr);

  const requestAdaptor = `
//输入 amisExt. 触发代码提示
//console.log("api.发送适配器", JSON.stringify(api.body))
var conditions = amisExt.getConditionFilter(api.body.conditions);
// 自定义过滤 示例， contentPicker 传入 字段名即可
// if (api.body?.shelfID?.firstValue) {
//     conditions.filters.push({ logic: 'And', filters: Array(0), operator: 'Equals', field: 'shelfID', value: api.body.shelfID.firstValue })
// }
if (api.body.displayText) {
    conditions.filters.push({ logic: 'And', filters: Array(0), operator: 'Contains', field: 'displayText', value: api.body.displayText })
}
const variables = {
    jsonFilter: JSON.stringify(conditions),
}
console.log("conditions", conditions);

// const filterParams=[\`status: \${api.data.status}\`]

// if(api.data.displayText){
//     filterParams.push(\`where: {displayText_contains: "\${api.data.displayText}"}\`)
// }
// if(api.data.orderBy){
//     filterParams.push(\`orderBy:{\${api.body.orderBy}:\${api.body.orderDir.toUpperCase()}}\`)
// }
// console.log("filterParams.join(',')",filterParams.join(','))
const  query=\`${tempGraphqlStr}\`
api.data={query,variables}
console.log("api.发送适配器2",api) 
return api`;

  const filterFields: any = [];

  crud.title = `${typeDef.displayName}管理`;
  crud.data.contentType = typeName;
  crud.body[0].columns = genColumns(fields, filterFields, typeName, gpFields) as any;
  crud.body[0].api.requestAdaptor = requestAdaptor;
  //@ts-ignore
  crud.body[0].api.adaptor = `return response.data.data || []`;
  //新增
  //@ts-ignore
  crud.body[0].headerToolbar[1].drawer.body[0].body = genFormItems(fields);
  //@ts-ignore
  crud.body[0].headerToolbar[1].drawer.body[0].api.data = {
    '&': '$$',
    contentType: typeName,
  };
  const condition = crud.body[0].filter.actions.find((o) => o.name == 'conditionsDrawer') as any;
  if (condition) {
    condition.drawer.body.body.fields = filterFields;
  }

  console.log('crud: ', crud);
  return crud;
}

const ColExceptFields = ['GeoPointField', 'MediaField'];
function genDetailsApi(typeName: string, gpFields: string) {
  const template = `/api/graphql?query={
        contentItem(contentItemId: "\${contentItemId}")
     {contentItemId displayText contentType contentItemVersionId modifiedUtc  publishedUtc owner createdUtc  author
        ... on ${typeName}
           ${gpFields}
        }
      }`;
  return template;
}

// enum FieldType2121 {
//     CONTAINS,
//     STARTS_WITH,
//     ENDS_WITH,
//     NOT_CONTAINS,
//     NOT_STARTS_WITH,
//     NOT_ENDS_WITH,
//     EQUAL,
//     EQUALS,
//     EQ,
//     NOT_EQUAL,
//     GREATER_THAN,
//     GREATER_THAN_OR_EQUAL,
//     LESS_THAN,
//     LESS_THAN_OR_EQUAL,
//     RANGE,
//     DATE_RANGE,
//     ANY,
//     NOT_ANY,
//     CUSTOM
// }
