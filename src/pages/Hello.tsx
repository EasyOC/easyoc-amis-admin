import {schema2component} from '@/components/AMISRenderer';

const schema = {
  type: 'page',
  style: {},
  regions: ['body', 'toolbar', 'header'],
  title: '客户管理',
  data: {
    contentType: 'Customer'
  },
  body: [
    {
      type: 'crud',
      name: 'contentMangeCrud',
      perPage: 10,
      alwaysShowPagination: true,
      perPageAvailable: [10, 20, 50, 100],
      footerToolbar: [
        {
          type: 'statistics'
        },
        {
          type: 'switch-per-page'
        },
        {
          type: 'pagination',
          align: 'right'
        }
      ],
      api: {
        method: 'post',
        url: '/api/graphql',
        data: {
          '&': '$$'
        },
        dataType: 'json',
        requestAdaptor:
          '\n//输入 amisExt. 触发代码提示\n//console.log("api.发送适配器", JSON.stringify(api.body))\nvar conditions = amisExt.getConditionFilter(api.body.conditions);\n// 自定义过滤 示例， contentPicker 传入 字段名即可\n// if (api.body?.shelfID?.firstValue) {\n//     conditions.filters.push({ logic: \'And\', filters: Array(0), operator: \'Equals\', field: \'shelfID\', value: api.body.shelfID.firstValue })\n// }\nif (api.body.displayText) {\n    conditions.filters.push({ logic: \'And\', filters: Array(0), operator: \'Contains\', field: \'displayText\', value: api.body.displayText })\n}\nconst variables = {\n    jsonFilter: JSON.stringify(conditions),\n}\nconsole.log("conditions", conditions);\n\n// const filterParams=[`status: ${api.data.status}`]\n\n// if(api.data.displayText){\n//     filterParams.push(`where: {displayText_contains: "${api.data.displayText}"}`)\n// }\n// if(api.data.orderBy){\n//     filterParams.push(`orderBy:{${api.body.orderBy}:${api.body.orderDir.toUpperCase()}}`)\n// }\n// console.log("filterParams.join(\',\')",filterParams.join(\',\'))\nconst  query=`query curdQuery($jsonFilter:String){ \n        data:pagedContentItems( \n            contentType: Customer\n            ${api.body.page?"page:"+api.body.page:""}  \n            ${api.body.perPage?"pageSize:"+api.body.perPage:""}\n            orderBy: {field: \\"${api.body.orderBy?api.body.orderBy:\'modifiedUtc\'}\\", direction: ${api.body.orderDir?api.body.orderDir.toUpperCase():\'DESC\' } } \n            dynamicJSONFilter: $jsonFilter\n              )\n            {  \n                total                 \n                items \n                { \n                    ... on  Customer\n                        {\n  contentItemId \n  displayText \n  name \n  custNum \n  marketSegment {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  source {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  industry {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  custClass {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  salesOwner {\n    firstValue \n    firstUserProfiles {\n      displayText \n    }\n  }\n  address {\n    countryName \n    province \n    city \n    postalCode \n    details \n    name \n  }\n  modifiedUtc \n  createdUtc \n  owner \n  author \n  publishedUtc \n  contentItemVersionId \n  contentType \n  latest \n  published \n}\n                    \n                }\n            }\n        }`\napi.data={query,variables}\nconsole.log("api.发送适配器2",api) \nreturn api',
        adaptor: 'return response.data.data || []'
      },
      columns: [
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
                            wrapperComponent: 'h1'
                          }
                        ],
                        md: 9
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
                                          body: [
                                            {
                                              type: 'property',
                                              id: 'u:1577f3084cdd',
                                              title: '',
                                              labelStyle: {
                                                textAlign: 'right'
                                              },
                                              contentStyle: {
                                                textAlign: 'left'
                                              },
                                              items: [
                                                {
                                                  label: '编号',
                                                  content: '${contentItemId}',
                                                  span: 1
                                                },
                                                {
                                                  label: '版本号',
                                                  content:
                                                    '${contentItemVersionId}',
                                                  span: 1
                                                },
                                                {
                                                  label: '添加时间',
                                                  content:
                                                    '${createdUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss }',
                                                  span: 1
                                                },
                                                {
                                                  label: '修改人',
                                                  content: '${author}',
                                                  span: 1
                                                },
                                                {
                                                  span: 1,
                                                  label: '修改时间',
                                                  content:
                                                    '${modifiedUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss } '
                                                }
                                              ],
                                              column: 2,
                                              mode: 'table',
                                              closeOnEsc: false,
                                              closeOnOutside: false,
                                              showCloseButton: true,
                                              className: 'm-b-md'
                                            },
                                            {
                                              name: 'name',
                                              label: '客户名称',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'custNum',
                                              label: '客户编号',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'customerRemark',
                                              label: '客户备注',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'marketSegment.firstValue',
                                              label: '市场细分',
                                              description: null,
                                              type: 'select',
                                              required: false,
                                              disabled: false,
                                              checkAll: false,
                                              searchable: true,
                                              multiple: false,
                                              extractValue: false,
                                              autoComplete: {
                                                method: 'post',
                                                url: '/api/graphql',
                                                dataType: 'json',
                                                replaceData: false,
                                                requestAdaptor:
                                                  'const query=`\n                        {\n                            options:marketSegment\n                            (status: PUBLISHED, first: 10, \n                                where: {displayText_contains: \\"${api.body.term}\\"}) \n                            {\n                                label:displayText\n                                value:contentItemId\n                            }\n                        }`\n                        api.data={query}\n                        return api'
                                              }
                                            },
                                            {
                                              name: 'source.firstValue',
                                              label: '客户来源',
                                              description: null,
                                              type: 'select',
                                              required: false,
                                              disabled: false,
                                              checkAll: false,
                                              searchable: true,
                                              multiple: false,
                                              extractValue: false,
                                              autoComplete: {
                                                method: 'post',
                                                url: '/api/graphql',
                                                dataType: 'json',
                                                replaceData: false,
                                                requestAdaptor:
                                                  'const query=`\n                        {\n                            options:customerSource\n                            (status: PUBLISHED, first: 10, \n                                where: {displayText_contains: \\"${api.body.term}\\"}) \n                            {\n                                label:displayText\n                                value:contentItemId\n                            }\n                        }`\n                        api.data={query}\n                        return api'
                                              }
                                            },
                                            {
                                              name: 'industry.firstValue',
                                              label: '行业',
                                              description: null,
                                              type: 'select',
                                              required: false,
                                              disabled: false,
                                              checkAll: false,
                                              searchable: true,
                                              multiple: false,
                                              extractValue: false,
                                              autoComplete: {
                                                method: 'post',
                                                url: '/api/graphql',
                                                dataType: 'json',
                                                replaceData: false,
                                                requestAdaptor:
                                                  'const query=`\n                        {\n                            options:industry\n                            (status: PUBLISHED, first: 10, \n                                where: {displayText_contains: \\"${api.body.term}\\"}) \n                            {\n                                label:displayText\n                                value:contentItemId\n                            }\n                        }`\n                        api.data={query}\n                        return api'
                                              }
                                            },
                                            {
                                              name: 'custClass.firstValue',
                                              label: '客户分类',
                                              description: null,
                                              type: 'select',
                                              required: false,
                                              disabled: false,
                                              checkAll: false,
                                              searchable: true
                                            },
                                            {
                                              name: 'salesOwner.firstValue',
                                              label: '销售负责人',
                                              description: null,
                                              type: 'select',
                                              required: false,
                                              disabled: false,
                                              autoComplete: {
                                                method: 'post',
                                                url: '/api/graphql',
                                                dataType: 'json',
                                                replaceData: false,
                                                requestAdaptor:
                                                  'const query=`\n                    {\n                        options:userProfile(first: 10, where: {displayText_contains: \\"${api.body.term}\\"}) {\n                          label:displayText\n                          value:userId\n                        }\n                      }`\n                    api.data={query}\n                    return api'
                                              }
                                            },
                                            {
                                              name: 'address.countryName',
                                              label: '国家',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'address.province',
                                              label: '省份',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'address.city',
                                              label: '城市',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'address.postalCode',
                                              label: '邮编',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'address.details',
                                              label: '详细地址',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'address.location',
                                              label: '定位',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            },
                                            {
                                              name: 'address.name',
                                              label: '地址名称',
                                              description: null,
                                              type: 'input-text',
                                              required: false,
                                              disabled: false
                                            }
                                          ],
                                          initApi: {
                                            method: 'get',
                                            url: '/api/graphql?query={\n        contentItem(contentItemId: "${contentItemId}")\n     {contentItemId displayText contentType contentItemVersionId modifiedUtc  publishedUtc owner createdUtc  author\n        ... on Customer\n           {\n  contentItemId \n  displayText \n  name \n  custNum \n  marketSegment {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  source {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  industry {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  custClass {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  salesOwner {\n    firstValue \n    firstUserProfiles {\n      displayText \n    }\n  }\n  address {\n    countryName \n    province \n    city \n    postalCode \n    details \n    name \n  }\n  modifiedUtc \n  createdUtc \n  owner \n  author \n  publishedUtc \n  contentItemVersionId \n  contentType \n  latest \n  published \n}\n        }\n      }',
                                            data: null,
                                            dataType: 'json',
                                            replaceData: true,
                                            onPreRequest: '',
                                            responseData: null,
                                            adaptor:
                                              'return {data:response.data.contentItem}',
                                            sendOn: '!!this.contentItemId'
                                          },
                                          api: {
                                            method: 'post',
                                            url: '/api/ContentManagement/PostContent',
                                            dataType: 'json',
                                            data: {
                                              '&': '$$',
                                              'contentType': 'Customer'
                                            }
                                          },
                                          name: 'EditForm',
                                          actions: [
                                            {
                                              type: 'button',
                                              label: '取消',
                                              actionType: 'cancel',
                                              id: 'u:69fd7c21307f'
                                            },
                                            {
                                              type: 'button',
                                              label: '提交',
                                              actionType: 'confirm',
                                              id: 'u:1a8dd8ace1f7',
                                              reload:
                                                'contentMangeCrud,contentViewer',
                                              level: 'primary'
                                            }
                                          ],
                                          debug: false
                                        }
                                      ],
                                      closeOnEsc: true,
                                      closeOnOutside: true,
                                      showCloseButton: true,
                                      size: 'lg'
                                    }
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
                                      url: '/api/ContentManagement/Delete?contentItemId=${contentItemId}'
                                    }
                                  }
                                ],
                                id: 'u:a285dc1ca629'
                              }
                            ],
                            id: 'u:5f77e976da71',
                            style: {
                              float: 'right'
                            }
                          }
                        ],
                        md: 3
                      }
                    ]
                  }
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
                              resetPage: true
                            },
                            actionType: 'reload',
                            dataMergeMode: 'merge'
                          }
                        ]
                      }
                    },
                    initApi: {
                      method: 'get',
                      url: '/api/graphql?query={\n        contentItem(contentItemId: "${contentItemId}")\n     {contentItemId displayText contentType contentItemVersionId modifiedUtc  publishedUtc owner createdUtc  author\n        ... on Customer\n           {\n  contentItemId \n  displayText \n  name \n  custNum \n  marketSegment {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  source {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  industry {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  custClass {\n    firstValue \n    firstContentItem {\n      displayText \n    }\n  }\n  salesOwner {\n    firstValue \n    firstUserProfiles {\n      displayText \n    }\n  }\n  address {\n    countryName \n    province \n    city \n    postalCode \n    details \n    name \n  }\n  modifiedUtc \n  createdUtc \n  owner \n  author \n  publishedUtc \n  contentItemVersionId \n  contentType \n  latest \n  published \n}\n        }\n      }',
                      data: null,
                      dataType: 'json',
                      replaceData: true,
                      onPreRequest: '',
                      responseData: null,
                      adaptor: 'return {data:response.data.contentItem}',
                      sendOn: '!!this.contentItemId'
                    },
                    body: [
                      {
                        type: 'property',
                        className: 'b-b m-b',
                        labelStyle: {
                          textAlign: 'right'
                        },
                        contentStyle: {
                          textAlign: 'left'
                        },
                        column: 2,
                        items: [
                          {
                            label: '编号',
                            content: '${contentItemId}',
                            span: 1
                          },
                          {
                            label: '版本号',
                            content: '${contentItemVersionId}',
                            span: 1
                          },
                          {
                            span: 1,
                            label: '修改时间',
                            content:
                              '${modifiedUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss } '
                          },
                          {
                            label: '修改人',
                            content: '${author}',
                            span: 1
                          },
                          {
                            label: '添加时间',
                            content:
                              '${createdUtc | toDate |date:YYYY-MM-DD HH\\:mm\\:ss }',
                            span: 1
                          }
                        ]
                      },
                      {
                        type: 'property',
                        labelStyle: {
                          textAlign: 'right'
                        },
                        contentStyle: {
                          textAlign: 'left'
                        },
                        column: 2,
                        items: [
                          {
                            content: '${ name }',
                            label: '客户名称',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ custNum }',
                            label: '客户编号',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ customerRemark }',
                            label: '客户备注',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content:
                              '${ marketSegment.firstContentItem.displayText }',
                            label: '市场细分',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ source.firstContentItem.displayText }',
                            label: '客户来源',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content:
                              '${ industry.firstContentItem.displayText }',
                            label: '行业',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content:
                              '${ custClass.firstContentItem.displayText }',
                            label: '客户分类',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content:
                              '${ salesOwner.firstUserProfiles.displayText }',
                            label: '销售负责人',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.countryName }',
                            label: '国家',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.province }',
                            label: '省份',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.city }',
                            label: '城市',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.postalCode }',
                            label: '邮编',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.details }',
                            label: '详细地址',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.location }',
                            label: '定位',
                            span: 1,
                            type: 'text'
                          },
                          {
                            content: '${ address.name }',
                            label: '地址名称',
                            span: 1,
                            type: 'text'
                          }
                        ]
                      }
                    ]
                  }
                ],
                type: 'drawer',
                resizable: true,
                closeOnEsc: true,
                closeOnOutside: true,
                showCloseButton: false,
                size: 'lg',
                data: null,
                actions: []
              },
              id: 'u:bceb50b750dd'
            }
          ],
          id: 'u:69cc303c6b0c'
        },
        {
          name: 'name',
          label: '客户名称',
          sortable: true,
          type: 'text',
          id: 'u:77eef8c84e82'
        },
        {
          name: 'custNum',
          label: '客户编号',
          sortable: true,
          type: 'text',
          id: 'u:5a8d931c03c7'
        },
        {
          name: 'customerRemark',
          label: '客户备注',
          sortable: true,
          type: 'text',
          id: 'u:946cec4ed513'
        },
        {
          name: 'marketSegment.firstContentItem.displayText',
          label: '市场细分',
          sortable: false,
          type: 'text',
          id: 'u:bd83ac80139c'
        },
        {
          name: 'source.firstContentItem.displayText',
          label: '客户来源',
          sortable: false,
          type: 'text',
          id: 'u:cecee23f3be2'
        },
        {
          name: 'industry.firstContentItem.displayText',
          label: '行业',
          sortable: false,
          type: 'text',
          id: 'u:e0489b6d1d0c'
        },
        {
          name: 'custClass.firstContentItem.displayText',
          label: '客户分类',
          sortable: false,
          type: 'text',
          id: 'u:67554c0635f4'
        },
        {
          name: 'salesOwner.firstUserProfiles.displayText',
          label: '销售负责人',
          sortable: false,
          type: 'text',
          id: 'u:44e19f8f17ec'
        },
        {
          name: 'address.countryName',
          label: '国家',
          type: 'text',
          id: 'u:06edaf89c6a8'
        },
        {
          name: 'address.province',
          label: '省份',
          type: 'text',
          id: 'u:f57f420565b3'
        },
        {
          name: 'address.city',
          label: '城市',
          type: 'text',
          id: 'u:9bbd47b6f438'
        },
        {
          name: 'address.postalCode',
          label: '邮编',
          type: 'text',
          id: 'u:5f051dbee0cc'
        },
        {
          name: 'address.details',
          label: '详细地址',
          type: 'text',
          id: 'u:c3752fa2e27e'
        },
        {
          name: 'address.location',
          label: '定位',
          type: 'text',
          id: 'u:7b7278fe973b'
        },
        {
          name: 'address.name',
          label: '地址名称',
          type: 'text',
          id: 'u:a449d12628d5'
        },
        {
          type: 'date',
          label: '修改时间',
          name: 'modifiedUtc',
          placeholder: '-',
          sortable: true,
          id: 'u:f7fc21d70b3a'
        },
        {
          name: 'createdUtc',
          label: '添加时间',
          type: 'date',
          placeholder: '-',
          sortable: true,
          toggled: false,
          id: 'u:e048ba2fe20e'
        },
        {
          type: 'text',
          name: 'author',
          label: '修改人',
          placeholder: '-',
          sortable: true,
          id: 'u:794d7afed554'
        }
      ],
      placeholder: '未查询到数据',
      itemActions: [],
      features: ['filter', 'create', 'update', 'view', 'delete'],
      headerToolbar: [
        {
          type: 'columns-toggler',
          align: 'right',
          icon: 'fas fa-cog',
          overlay: true,
          footerBtnSize: 'sm'
        },
        {
          type: 'button',
          label: '新增',
          actionType: 'drawer',
          level: 'primary',
          drawer: {
            title: '新增',
            body: [
              {
                type: 'form',
                api: {
                  method: 'post',
                  url: '/api/ContentManagement/PostContent',
                  dataType: 'json',
                  data: {
                    '&': '$$',
                    'contentType': 'Customer'
                  }
                },
                body: [
                  {
                    name: 'name',
                    label: '客户名称',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'custNum',
                    label: '客户编号',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'customerRemark',
                    label: '客户备注',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'marketSegment.firstValue',
                    label: '市场细分',
                    description: null,
                    type: 'select',
                    required: false,
                    disabled: false,
                    checkAll: false,
                    searchable: true,
                    multiple: false,
                    extractValue: false,
                    autoComplete: {
                      method: 'post',
                      url: '/api/graphql',
                      dataType: 'json',
                      replaceData: false,
                      requestAdaptor:
                        'const query=`\n                            {\n                                options:marketSegment\n                                (status: PUBLISHED, first: 10, \n                                    where: {displayText_contains: \\"${api.body.term}\\"}) \n                                {\n                                    label:displayText\n                                    value:contentItemId\n                                }\n                            }`\n                            api.data={query}\n                            return api'
                    }
                  },
                  {
                    name: 'source.firstValue',
                    label: '客户来源',
                    description: null,
                    type: 'select',
                    required: false,
                    disabled: false,
                    checkAll: false,
                    searchable: true,
                    multiple: false,
                    extractValue: false,
                    autoComplete: {
                      method: 'post',
                      url: '/api/graphql',
                      dataType: 'json',
                      replaceData: false,
                      requestAdaptor:
                        'const query=`\n                            {\n                                options:customerSource\n                                (status: PUBLISHED, first: 10, \n                                    where: {displayText_contains: \\"${api.body.term}\\"}) \n                                {\n                                    label:displayText\n                                    value:contentItemId\n                                }\n                            }`\n                            api.data={query}\n                            return api'
                    }
                  },
                  {
                    name: 'industry.firstValue',
                    label: '行业',
                    description: null,
                    type: 'select',
                    required: false,
                    disabled: false,
                    checkAll: false,
                    searchable: true,
                    multiple: false,
                    extractValue: false,
                    autoComplete: {
                      method: 'post',
                      url: '/api/graphql',
                      dataType: 'json',
                      replaceData: false,
                      requestAdaptor:
                        'const query=`\n                            {\n                                options:industry\n                                (status: PUBLISHED, first: 10, \n                                    where: {displayText_contains: \\"${api.body.term}\\"}) \n                                {\n                                    label:displayText\n                                    value:contentItemId\n                                }\n                            }`\n                            api.data={query}\n                            return api'
                    }
                  },
                  {
                    name: 'custClass.firstValue',
                    label: '客户分类',
                    description: null,
                    type: 'select',
                    required: false,
                    disabled: false,
                    checkAll: false,
                    searchable: true
                  },
                  {
                    name: 'salesOwner.firstValue',
                    label: '销售负责人',
                    description: null,
                    type: 'select',
                    required: false,
                    disabled: false,
                    autoComplete: {
                      method: 'post',
                      url: '/api/graphql',
                      dataType: 'json',
                      replaceData: false,
                      requestAdaptor:
                        'const query=`\n                        {\n                            options:userProfile(first: 10, where: {displayText_contains: \\"${api.body.term}\\"}) {\n                            label:displayText\n                            value:userId\n                            }\n                        }`\n                        api.data={query}\n                        return api'
                    }
                  },
                  {
                    name: 'address.countryName',
                    label: '国家',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'address.province',
                    label: '省份',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'address.city',
                    label: '城市',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'address.postalCode',
                    label: '邮编',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'address.details',
                    label: '详细地址',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'address.location',
                    label: '定位',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  },
                  {
                    name: 'address.name',
                    label: '地址名称',
                    description: null,
                    type: 'input-text',
                    required: false,
                    disabled: false
                  }
                ],
                onEvent: {
                  submitSucc: {
                    weight: 0,
                    actions: [
                      {
                        componentId: 'u:9d76fc1b21cc',
                        args: {
                          resetPage: true
                        },
                        actionType: 'reload',
                        dataMergeMode: 'merge'
                      }
                    ]
                  }
                },
                initApi: '',
                name: 'addForm',
                actions: []
              }
            ],
            type: 'drawer',
            closeOnEsc: true,
            resizable: true,
            closeOnOutside: true,
            showCloseButton: true,
            size: 'lg'
          },
          id: 'u:597f3314f0d7'
        },
        {
          type: 'bulk-actions'
        },
        {
          type: 'button',
          tpl: '内容',
          label: '导入',
          perPageAvailable: [10],
          level: 'link',
          actionType: 'dialog',
          dialog: {
            type: 'dialog',
            title: '批量导入',
            body: [
              {
                type: 'form',
                api: '/amis/api/mock2/form/saveForm',
                debug: false,
                body: [
                  {
                    type: 'hidden',
                    name: 'contentType',
                    id: 'u:0147574696e9'
                  },
                  {
                    type: 'input-excel',
                    name: 'excel',
                    label: '上传 Excel'
                  }
                ]
              }
            ],
            closeOnEsc: false,
            closeOnOutside: false,
            showCloseButton: true,
            actions: [
              {
                type: 'button',
                label: '提交',
                actionType: 'ajax',
                id: 'u:16e6290ef54f',
                api: {
                  method: 'post',
                  url: '/api/ContentManagement/Import',
                  dataType: 'json',
                  requestAdaptor:
                    "console.log('upload api', api)\r\n\r\nconst inputList = []\r\n\r\napi.data.excel.forEach((item)=>{\r\n   const model = {schema: JSON.stringify(api.data.excel)}\r\n   inputList.push(model)\r\n})\r\n\r\n\r\nconsole.log('uplod api input',inputList)\r\n\r\nconst data = {\r\n  draft : false,\r\n  contentType : api.data.contentType,\r\n   inputList : inputList\r\n}\r\n\r\n\r\nconsole.log('upload api22222', data)\r\n\r\napi.data = data\r\n\r\nreturn api",
                  data: {
                    '&': '$$'
                  },
                  replaceData: false
                },
                close: false,
                level: 'primary'
              },
              {
                type: 'button',
                label: '取消',
                actionType: 'cancel',
                id: 'u:8fbe3dbbdc4c'
              }
            ]
          },
          id: 'u:c283e85d34a9'
        }
      ],
      bulkActions: [
        {
          type: 'submit',
          label: '批量删除',
          perPageAvailable: [10],
          block: false,
          level: 'danger',
          tooltip: '',
          tooltipPlacement: 'bottom',
          confirmText: '确认删选中项目吗？',
          id: 'u:8895e8c3345a',
          onEvent: {
            click: {
              weight: 0,
              actions: [
                {
                  args: {
                    options: {},
                    api: {
                      url: '/api/ContentManagement/BatchDelete',
                      method: 'delete',
                      messages: {},
                      data: {
                        selectedItems: '${selectedItems}'
                      },
                      requestAdaptor:
                        'console.log("api", api)\r\nvar ids = api.body.selectedItems.map(x => x.contentItemId);\r\napi.data = {\r\n  ids: ids.join(\',\')\r\n}\r\nreturn api'
                    }
                  },
                  actionType: 'ajax',
                  outputVar: 'responseResult'
                },
                {
                  componentId: 'u:717480fd6724',
                  args: {
                    resetPage: true
                  },
                  actionType: 'reload',
                  dataMergeMode: 'merge'
                }
              ]
            }
          }
        }
      ],
      messages: {},
      primaryField: 'contentItemId',
      filter: {
        title: '查询条件',
        name: 'searchForm',
        body: [
          {
            type: 'input-text',
            name: 'displayText',
            label: '名称',
            size: 'lg',
            id: 'u:680c8488d2d1'
          }
        ],
        actions: [
          {
            type: 'submit',
            label: '搜索',
            actionType: 'submit',
            id: 'u:f919f2d70d5d',
            level: 'primary'
          },
          {
            type: 'button',
            label: '高级..',
            actionType: 'drawer',
            name: 'conditionsDrawer',
            drawer: {
              position: 'right',
              resizable: true,
              closeOnEsc: true,
              closeOnOutside: true,
              showCloseButton: true,
              title: '',
              overlay: false,
              width: '1000px',
              body: {
                type: 'form',
                title: '表单',
                body: {
                  type: 'condition-builder',
                  label: '',
                  name: 'conditions',
                  searchable: true,
                  fields: [
                    {
                      name: 'displayText',
                      label: '显示名称',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      name: 'published',
                      label: '发布状态',
                      type: 'select',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ],
                      options: [
                        {
                          label: '已发布或草稿',
                          value: 'PUBLISHEDORLATEST'
                        },
                        {
                          label: '只看最新版',
                          value: 'LATEST'
                        },
                        {
                          label: '所有发布版',
                          value: 'PUBLISHED'
                        },
                        {
                          label: '所有草稿',
                          value: 'DRAFT'
                        }
                      ]
                    },
                    {
                      label: '修改时间',
                      name: 'modifiedUtc',
                      type: 'date',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '大于等于',
                          value: 'GREATER_THAN_OR_EQUAL'
                        },
                        {
                          label: '小于等于',
                          value: 'LESS_THAN_OR_EQUAL'
                        },
                        {
                          label: '大于',
                          value: 'GREATER_THAN'
                        },
                        {
                          label: '小于',
                          value: 'LESS_THAN'
                        },
                        'between'
                      ]
                    },
                    {
                      label: '添加时间',
                      type: 'date',
                      name: 'createdUtc',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '大于等于',
                          value: 'GREATER_THAN_OR_EQUAL'
                        },
                        {
                          label: '小于等于',
                          value: 'LESS_THAN_OR_EQUAL'
                        },
                        {
                          label: '大于',
                          value: 'GREATER_THAN'
                        },
                        {
                          label: '小于',
                          value: 'LESS_THAN'
                        },
                        'between'
                      ]
                    },
                    {
                      type: 'select',
                      name: 'author',
                      label: '修改人',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ],
                      source: {
                        method: 'post',
                        url: '/api/graphql',
                        dataType: 'json',
                        replaceData: false,
                        requestAdaptor:
                          'const query=`\n                    {\n                        options:userProfile(first: 10}) {\n                          label:displayText\n                          value:userId\n                        }\n                      }`\n                    api.data={query}\n                    return api'
                      }
                    },
                    {
                      label: '客户名称',
                      name: 'name',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '客户编号',
                      name: 'custNum',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '市场细分',
                      name: 'marketSegment.firstValue',
                      type: 'select',
                      source: {
                        method: 'post',
                        url: '/api/graphql',
                        dataType: 'json',
                        replaceData: false,
                        requestAdaptor:
                          '\n                        /*\n                        Contains/StartsWith/EndsWith/NotContains/NotStartsWith/NotEndsWith：包含/不包含，like \'%xx%\'，或者 like \'xx%\'，或者 like \'%xx\'\nEqual/NotEqual：等于/不等于\nGreaterThan/GreaterThanOrEqual：大于/大于等于\nLessThan/LessThanOrEqual：小于/小于等于\nRange：范围查询\nDateRange：日期范围，有特殊处理 value[1] + 1\nAny/NotAny：是否符合 value 中任何一项（直白的说是 SQL IN）\nCustom：自定义解析\n\nvar filters = amisExt.buildConditionFilter([\n    { "logic": "And", "operator": "Contains", "field": "displayText", "value": api.body.displayText },\n    { "logic": "And", "operator": "Contains", "field": "pO", "value": api.body.poFilter },\n    { "logic": "And", "operator": "Equals", "field": "sOA", "value": api.body.soaFilter },\n    { "logic": "And", "operator": "Any", "field": "plant", "value": api.body.plantFilter },\n    { "logic": "And", "operator": "Contains", "field": "item", "value": api.body.itemFilter },\n    { "logic": "And", "operator": "Contains", "field": "vendor", "value": api.body.vendorFilter },\n    { "logic": "And", "operator": "RANGE", "field": "documentDate", "value": api.body.docDateFilter }\n  ])\n  if (filters?.length > 0) {\n    variables.jsonFilter = JSON.stringify({\n      "filters": [\n        ...filters\n      ], "logic": "and"\n    })\n  }\n  \n                        \n                        */\n                            //console.log(\'genFilterOptions 111111111111111111111111\')\n\n                            //console.log("genFilterOptions body", api.body);\n                            const text_containsName = "";\n\n                            const query=`\n                            {\n                                options:marketSegment\n                                (status: PUBLISHED, first: 10, \n                                    where: {displayText_contains: "${text_containsName}"}) \n                                {\n                                    label:displayText\n                                    value:contentItemId\n                                }\n                            }`\n                            //console.log(\'genFilterOptions 3\',query)\n\n                            api.data={query}\n\n                            //console.log(\'genFilterOptions 2\',api)\n                            return api'
                      },
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ]
                    },
                    {
                      label: '客户来源',
                      name: 'source.firstValue',
                      type: 'select',
                      source: {
                        method: 'post',
                        url: '/api/graphql',
                        dataType: 'json',
                        replaceData: false,
                        requestAdaptor:
                          '\n                        /*\n                        Contains/StartsWith/EndsWith/NotContains/NotStartsWith/NotEndsWith：包含/不包含，like \'%xx%\'，或者 like \'xx%\'，或者 like \'%xx\'\nEqual/NotEqual：等于/不等于\nGreaterThan/GreaterThanOrEqual：大于/大于等于\nLessThan/LessThanOrEqual：小于/小于等于\nRange：范围查询\nDateRange：日期范围，有特殊处理 value[1] + 1\nAny/NotAny：是否符合 value 中任何一项（直白的说是 SQL IN）\nCustom：自定义解析\n\nvar filters = amisExt.buildConditionFilter([\n    { "logic": "And", "operator": "Contains", "field": "displayText", "value": api.body.displayText },\n    { "logic": "And", "operator": "Contains", "field": "pO", "value": api.body.poFilter },\n    { "logic": "And", "operator": "Equals", "field": "sOA", "value": api.body.soaFilter },\n    { "logic": "And", "operator": "Any", "field": "plant", "value": api.body.plantFilter },\n    { "logic": "And", "operator": "Contains", "field": "item", "value": api.body.itemFilter },\n    { "logic": "And", "operator": "Contains", "field": "vendor", "value": api.body.vendorFilter },\n    { "logic": "And", "operator": "RANGE", "field": "documentDate", "value": api.body.docDateFilter }\n  ])\n  if (filters?.length > 0) {\n    variables.jsonFilter = JSON.stringify({\n      "filters": [\n        ...filters\n      ], "logic": "and"\n    })\n  }\n  \n                        \n                        */\n                            //console.log(\'genFilterOptions 111111111111111111111111\')\n\n                            //console.log("genFilterOptions body", api.body);\n                            const text_containsName = "";\n\n                            const query=`\n                            {\n                                options:customerSource\n                                (status: PUBLISHED, first: 10, \n                                    where: {displayText_contains: "${text_containsName}"}) \n                                {\n                                    label:displayText\n                                    value:contentItemId\n                                }\n                            }`\n                            //console.log(\'genFilterOptions 3\',query)\n\n                            api.data={query}\n\n                            //console.log(\'genFilterOptions 2\',api)\n                            return api'
                      },
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ]
                    },
                    {
                      label: '行业',
                      name: 'industry.firstValue',
                      type: 'select',
                      source: {
                        method: 'post',
                        url: '/api/graphql',
                        dataType: 'json',
                        replaceData: false,
                        requestAdaptor:
                          '\n                        /*\n                        Contains/StartsWith/EndsWith/NotContains/NotStartsWith/NotEndsWith：包含/不包含，like \'%xx%\'，或者 like \'xx%\'，或者 like \'%xx\'\nEqual/NotEqual：等于/不等于\nGreaterThan/GreaterThanOrEqual：大于/大于等于\nLessThan/LessThanOrEqual：小于/小于等于\nRange：范围查询\nDateRange：日期范围，有特殊处理 value[1] + 1\nAny/NotAny：是否符合 value 中任何一项（直白的说是 SQL IN）\nCustom：自定义解析\n\nvar filters = amisExt.buildConditionFilter([\n    { "logic": "And", "operator": "Contains", "field": "displayText", "value": api.body.displayText },\n    { "logic": "And", "operator": "Contains", "field": "pO", "value": api.body.poFilter },\n    { "logic": "And", "operator": "Equals", "field": "sOA", "value": api.body.soaFilter },\n    { "logic": "And", "operator": "Any", "field": "plant", "value": api.body.plantFilter },\n    { "logic": "And", "operator": "Contains", "field": "item", "value": api.body.itemFilter },\n    { "logic": "And", "operator": "Contains", "field": "vendor", "value": api.body.vendorFilter },\n    { "logic": "And", "operator": "RANGE", "field": "documentDate", "value": api.body.docDateFilter }\n  ])\n  if (filters?.length > 0) {\n    variables.jsonFilter = JSON.stringify({\n      "filters": [\n        ...filters\n      ], "logic": "and"\n    })\n  }\n  \n                        \n                        */\n                            //console.log(\'genFilterOptions 111111111111111111111111\')\n\n                            //console.log("genFilterOptions body", api.body);\n                            const text_containsName = "";\n\n                            const query=`\n                            {\n                                options:industry\n                                (status: PUBLISHED, first: 10, \n                                    where: {displayText_contains: "${text_containsName}"}) \n                                {\n                                    label:displayText\n                                    value:contentItemId\n                                }\n                            }`\n                            //console.log(\'genFilterOptions 3\',query)\n\n                            api.data={query}\n\n                            //console.log(\'genFilterOptions 2\',api)\n                            return api'
                      },
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ]
                    },
                    {
                      label: '客户分类',
                      name: 'custClass.firstValue',
                      type: 'select',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ]
                    },
                    {
                      label: '销售负责人',
                      name: 'salesOwner.firstValue',
                      type: 'select',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        'select_any_in',
                        'select_not_any_in'
                      ],
                      source: {
                        method: 'post',
                        url: '/api/graphql',
                        dataType: 'json',
                        replaceData: false,
                        requestAdaptor:
                          'const query=`\n                    {\n                        options:userProfile(first: 10, where: {displayText_contains: "${api.body.term}"}) {\n                          label:displayText\n                          value:userId\n                        }\n                      }`\n                    api.data={query}\n                    return api'
                      }
                    },
                    {
                      label: '国家',
                      name: 'address.countryName',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '省份',
                      name: 'address.province',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '城市',
                      name: 'address.city',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '邮编',
                      name: 'address.postalCode',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '详细地址',
                      name: 'address.details',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    },
                    {
                      label: '地址名称',
                      name: 'address.name',
                      type: 'text',
                      operators: [
                        {
                          label: '等于',
                          value: 'EQUALS'
                        },
                        {
                          label: '不等于',
                          value: 'NOT_EQUAL'
                        },
                        {
                          label: '包含',
                          value: 'CONTAINS'
                        },
                        {
                          label: '不匹配',
                          value: 'NOT_CONTAINS'
                        },
                        {
                          label: '匹配开头',
                          value: 'STARTS_WITH'
                        },
                        {
                          label: '匹配结尾',
                          value: 'ENDS_WITH'
                        },
                        {
                          label: '不开头',
                          value: 'NOT_STARTS_WITH'
                        },
                        {
                          label: '不结尾',
                          value: 'NOT_ENDS_WITH'
                        }
                      ]
                    }
                  ]
                },
                id: 'u:6c7f8dc7b9b6',
                target: 'searchForm'
              }
            },
            id: 'u:35997d029d9e'
          }
        ],
        checkAll: false,
        submitOnChange: false,
        perPageAvailable: [10],
        mode: 'inline',
        panelClassName: '',
        id: 'u:a722ddcd1fb8'
      },
      keepItemSelectionOnPageChange: true,
      labelTpl: '${displayText||contentItemId}',
      filterTogglable: true,
      filterColumnCount: 3,
      syncLocation: false,
      defaultParams: {},
      id: 'u:30354379daf6'
    }
  ],
  definitions: {},
  messages: {},
  id: 'u:d5633c06d697'
};

export default schema2component(schema);
