export default {
  "type": "page",
  "regions": [
    "body",
    "toolbar",
    "header"
  ],
  "title": "动态页管理",
  "data": {
    "contentType": ""
  },
  "body": [
    {
      "type": "crud",
      "affixHeader": false,
      "name": "contentMangeCrud",
      "perPage": 10,
      "alwaysShowPagination": true,
      "perPageAvailable": [
        10,
        20,
        50,
        100
      ],
      "footerToolbar": [
        {
          "type": "statistics"
        },
        {
          "type": "switch-per-page"
        },
        {
          "type": "pagination",
          "align": "right"
        }
      ],
      "api": {
        "method": "post",
        "url": "/api/graphql",
        "data": {
          "&": "$$"
        },
        "dataType": "json",
        "requestAdaptor": ""
      },
      "columns": [],
      "placeholder": "未查询到数据",
      "itemActions": [],
      "features": [
        "filter",
        "create",
        "update",
        "view",
        "delete"
      ],
      "headerToolbar": [
        {
          "type": "columns-toggler",
          "align": "right",
          "icon": "fas fa-cog",
          "overlay": true,
          "footerBtnSize": "sm"
        },
        {
          "type": "button",
          "label": "新增",
          "actionType": "drawer",
          "level": "primary",
          "drawer": {
            "title": "新增",
            "body": [
              {
                "type": "form",
                "api": {
                  "method": "post",
                  "url": "/api/ContentManagement/PostContent",
                  "dataType": "json"
                },
                "body": [
                  {
                    "type": "hidden",
                    "name": "contentType",
                    "label": "ContentType",
                    "value": "AmisSchema"
                  },
                  {
                    "type": "hidden",
                    "name": "isDraft",
                    "label": "isDraft"
                  },
                  {
                    "type": "input-text",
                    "name": "displayText",
                    "label": "显示名称",
                    "required": true
                  },
                  {
                    "type": "input-text",
                    "name": "name",
                    "label": "页面名称",
                    "required": true,
                    "id": "u:344a4699b814"
                  },
                  {
                    "type": "textarea",
                    "name": "description",
                    "label": "描述"
                  },
                  {
                    "type": "textarea",
                    "name": "schema",
                    "label": "JSON Schema",
                    "language": "json",
                    "minRows": 3,
                    "maxRows": 20,
                    "minLength": 5,
                    "maxLength": "",
                    "showCounter": true,
                    "mode": "",
                    "inline": false
                  }
                ],
                "onEvent": {
                  "submitSucc": {
                    "weight": 0,
                    "actions": [
                      {
                        "componentId": "u:9d76fc1b21cc",
                        "args": {
                          "resetPage": true
                        },
                        "actionType": "reload",
                        "dataMergeMode": "merge"
                      }
                    ]
                  }
                },
                "initApi": "",
                "name": "addForm",
                "actions": []
              }
            ],
            "type": "drawer",
            "closeOnEsc": true,
            "resizable": true,
            "closeOnOutside": true,
            "showCloseButton": true,
            "size": "lg"
          }
        },
        {
          "type": "bulk-actions"
        },
        {
          "type": "button",
          "tpl": "内容",
          "label": "导入",
          "perPageAvailable": [
            10
          ],
          "level": "link",
          "actionType": "dialog",
          "dialog": {
            "type": "dialog",
            "title": "批量导入",
            "body": [
              {
                "type": "form",
                "api": "/amis/api/mock2/form/saveForm",
                "debug": false,
                "body": [
                  {
                    "type": "hidden",
                    "name": "contentType",
                    "id": "u:0147574696e9"
                  },
                  {
                    "type": "input-excel",
                    "name": "excel",
                    "label": "上传 Excel"
                  }
                ]
              }
            ],
            "closeOnEsc": false,
            "closeOnOutside": false,
            "showCloseButton": true,
            "actions": [
              {
                "type": "button",
                "label": "提交",
                "actionType": "ajax",
                "id": "u:16e6290ef54f",
                "api": {
                  "method": "post",
                  "url": "/api/ContentManagement/Import",
                  "dataType": "json",
                  "requestAdaptor": "console.log('upload api', api)\r\n\r\nconst inputList = []\r\n\r\napi.data.excel.forEach((item)=>{\r\n   const model = {schema: JSON.stringify(api.data.excel)}\r\n   inputList.push(model)\r\n})\r\n\r\n\r\nconsole.log('uplod api input',inputList)\r\n\r\nconst data = {\r\n  draft : false,\r\n  contentType : api.data.contentType,\r\n   inputList : inputList\r\n}\r\n\r\n\r\nconsole.log('upload api22222', data)\r\n\r\napi.data = data\r\n\r\nreturn api",
                  "data": {
                    "&": "$$"
                  },
                  "replaceData": false
                },
                "close": false,
                "level": "primary"
              },
              {
                "type": "button",
                "label": "取消",
                "actionType": "cancel",
                "id": "u:8fbe3dbbdc4c"
              }
            ]
          }
        }
      ],
      "bulkActions": [
        {
          "type": "submit",
          "label": "批量删除",
          "perPageAvailable": [
            10
          ],
          "block": false,
          "level": "danger",
          "tooltip": "",
          "tooltipPlacement": "bottom",
          "confirmText": "确认删选中项目吗？",
          "id": "u:8895e8c3345a",
          "onEvent": {
            "click": {
              "weight": 0,
              "actions": [
                {
                  "args": {
                    "options": {
                    },
                    "api": {
                      "url": "/api/ContentManagement/BatchDelete",
                      "method": "delete",
                      "messages": {
                      },
                      "data": {
                        "selectedItems": "${selectedItems}"
                      },
                      "requestAdaptor": "console.log(\"api\", api)\r\nvar ids = api.body.selectedItems.map(x => x.contentItemId);\r\napi.data = {\r\n  ids: ids.join(',')\r\n}\r\nreturn api"
                    }
                  },
                  "actionType": "ajax",
                  "outputVar": "responseResult"
                },
                {
                  "componentId": "u:717480fd6724",
                  "args": {
                    "resetPage": true
                  },
                  "actionType": "reload",
                  "dataMergeMode": "merge"
                }
              ]
            }
          }
        }
      ],
      "messages": {},
      "primaryField": "contentItemId",
      "filter": {
        "title": "查询条件",
        "name": "searchForm",
        "body": [
          {
            "type": "input-text",
            "name": "displayText",
            "label": "名称",
            "size": "lg"
          }
        ],
        "actions": [
          {
            "type": "submit",
            "label": "搜索",
            "actionType": "submit",
            "id": "u:f919f2d70d5d",
            "level": "primary"
          },
          {
            "type": "button",
            "label": "高级..",
            "actionType": "drawer",
            "name": "conditionsDrawer",
            "drawer": {
              "position": "right",
              "resizable": true,
              "closeOnEsc": true,
              "closeOnOutside": true,
              "showCloseButton": true,
              "title": "",
              "overlay": false,
              "width": "1000px",
              "body": {
                "type": "form",
                "title": "表单",
                "body": {
                  "type": "condition-builder",
                  "label": "",
                  "name": "conditions",
                  "searchable": true,
                  "fields": []
                },
                "id": "u:6c7f8dc7b9b6",
                "target": "searchForm"
              }
            }
          }
        ],
        "checkAll": false,
        "submitOnChange": false,
        "perPageAvailable": [
          10
        ],
        "mode": "inline",
        "panelClassName": ""
      },
      "keepItemSelectionOnPageChange": true,
      "labelTpl": "${displayText||contentItemId}",
      "filterTogglable": true,
      "filterColumnCount": 3,
      "syncLocation": false,
      "defaultParams": {}
    }
  ],
  "definitions": {},
  "messages": {},
  "style": {}
}