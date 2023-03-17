import { setVariable } from 'amis';
import { BasePlugin, getSchemaTpl } from 'amis-editor';
// import { setVariable } from 'amis-widget/dist';

export default class TableEditor extends BasePlugin {
  rendererName = 'ant-table';

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json';

  // 用来配置名称和描述
  name = 'ant-Table-Pro';
  description = '这只是个示例';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['自定义', '表单项'];

  // 图标
  icon = 'fa fa-user';

  // 用来生成预览图的
  previewSchema = {
    type: 'ant-table',
    target: 'demo',
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'ant-table',
    target: '233',
    api: '',
  };

  // 右侧面板相关
  panelTitle = '自定义组件';
  panelControls = [
    {
      type: 'tabs',
      tabsMode: 'line',
      className: 'm-t-n-xs',
      contentClassName: 'no-border p-l-none p-r-none',
      tabs: [
        {
          title: '常规',
          controls: [
            {
              name: 'target',
              label: 'Target',
              type: 'text',
            },
          ],
        },

        {
          title: '接口',
          controls: [
            getSchemaTpl('api', {
              label: '数据拉取接口',
              sampleBuilder: (schema: any) => {
                const data: any = {
                  items: [],
                  total: 0,
                };

                if (Array.isArray(schema.columns)) {
                  const item = {};
                  schema.columns.forEach((control: any) => {
                    if (control.name) {
                      setVariable(item, control.name, 'sample');
                    }
                  });

                  data.items.push(item);
                }

                return JSON.stringify(
                  {
                    status: 0,
                    msg: '',
                    data: data,
                  },
                  null,
                  2,
                );
              },
            }),

            {
              name: 'initFetch',
              type: 'radios',
              label: '是否初始拉取',
              pipeIn: (value: any) =>
                (typeof value == 'boolean' && value) || (typeof value !== 'boolean' && ''),
              inline: true,
              onChange: () => {},
              options: [
                {
                  label: '是',
                  value: true,
                },

                {
                  label: '否',
                  value: false,
                },

                {
                  label: '表达式',
                  value: '',
                },
              ],
            },

            {
              name: 'initFetch',
              autoComplete: false,
              visibleOn: 'typeof this.initFetch !== "boolean"',
              type: 'input-text',
              placeholder: '用 JS 表达式来决定',
              className: 'm-t-n-sm',
            },

            {
              name: 'loadDataOnce',
              label: '一次性拉取',
              type: 'switch',
              mode: 'inline',
              className: 'block',
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'click',
                rootClose: true,
                content:
                  '开启后，数据只会在初始的时候拉取，后续分页、排序不再请求接口，都由前端直接完成。',
                placement: 'left',
              },
            },

            {
              label: '开启定时刷新',
              type: 'switch',
              name: 'interval',
              visibleOn: 'data.api',
              pipeIn: (value: any) => !!value,
              pipeOut: (value: any) => (value ? 3000 : undefined),
              mode: 'inline',
              className: 'block',
            },

            {
              name: 'interval',
              type: 'input-number',
              visibleOn: 'typeof data.interval === "number"',
              step: 500,
              className: 'm-t-n-sm',
              description: '设置后将自动定时刷新，单位 ms',
            },

            {
              name: 'silentPolling',
              label: '静默刷新',
              type: 'switch',
              mode: 'inline',
              visibleOn: '!!data.interval',
              description: '设置自动定时刷新时是否显示loading',
            },

            {
              name: 'stopAutoRefreshWhen',
              label: '停止定时刷新检测表达式',
              type: 'input-text',
              visibleOn: '!!data.interval',
              description: '定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。',
            },

            {
              name: 'stopAutoRefreshWhenModalIsOpen',
              label: '当有弹框时关闭自动刷新',
              type: 'switch',
              visibleOn: '!!data.interval',
              mode: 'inline',
              className: 'block',
              description: '弹框打开关闭自动刷新，关闭弹框又恢复',
            },

            {
              type: 'divider',
            },

            {
              name: 'draggable',
              label: '是否可拖拽排序',
              type: 'switch',
              mode: 'inline',
              className: 'block',
            },

            getSchemaTpl('api', {
              label: '顺序保存接口',
              name: 'saveOrderApi',
              visibleOn: 'data.draggable',
            }),

            {
              type: 'divider',
            },

            getSchemaTpl('api', {
              label: '快速保存接口',
              name: 'quickSaveApi',
              description: '当 column 中设置了快速编辑后将使用此接口批量保存数据。',
            }),

            {
              type: 'divider',
            },

            getSchemaTpl('api', {
              label: '快速保存单条接口',
              name: 'quickSaveItemApi',
              description: '当 column 中设置了快速编辑且设置了立即保存，将使用此接口保存数据。',
            }),

            {
              type: 'divider',
            },

            {
              label: '默认消息提示',
              type: 'combo',
              name: 'messages',
              multiLine: true,
              description: '覆盖默认消息提示，但如果 api 返回 msg 则会优先使用这个 msg',
              items: [
                {
                  label: '获取成功提示',
                  type: 'input-text',
                  name: 'fetchSuccess',
                },

                {
                  label: '获取失败提示',
                  type: 'input-text',
                  name: 'fetchFailed',
                },

                {
                  label: '保存顺序成功提示',
                  type: 'input-text',
                  name: 'saveOrderSuccess',
                },

                {
                  label: '保存顺序失败提示',
                  type: 'input-text',
                  name: 'saveOrderFailed',
                },

                {
                  label: '快速保存成功提示',
                  type: 'input-text',
                  name: 'quickSaveSuccess',
                },

                {
                  label: '快速保存失败提示',
                  type: 'input-text',
                  name: 'quickSaveFailed',
                },
              ],
            },
          ],
        },

        {
          title: '外观',
          controls: [],
        },
      ],
    },
  ];
}
