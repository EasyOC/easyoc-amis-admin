import {
  getSchemaTpl,
  registerEditorPlugin,
  unRegisterEditorPlugin,
  getEditorPlugins,
  BasePlugin,
} from 'amis-editor';
import { EditorManager } from 'amis-editor/dist/manager';
// import {  } from 'amis-editor/dist/plugin/Form/Select';
import { merge } from 'lodash';
// import { getEventControlConfig } from 'amis-editor/dist/util';
// import { BaseEventContext } from 'amis-editor/dist/plugin';
// import { SelectControlPlugin, BaseEventContext } from 'amis-editor';

export class EOCSelectControlPlugin extends BasePlugin {
  // 关联渲染器名字
  rendererName = 'select';
  isBaseComponent = true;
  icon = 'fa fa-th-list';
  description = `支持多选，输入提示，可使用<code>source</code>获取选项`;
  docLink = '/amis/zh-CN/components/form/select';
  tags = ['表单项'];
  scaffold = {
    type: 'select',
    label: '选项',
    name: 'select',
    options: [
      {
        label: '选项A',
        value: 'A',
      },

      {
        label: '选项B',
        value: 'B',
      },
    ],
  };
  previewSchema: any = {
    type: 'form',
    className: 'text-left',
    mode: 'horizontal',
    wrapWithPanel: false,
    body: [
      {
        ...this.scaffold,
      },
    ],
  };
  notRenderFormZone = true;

  panelTitle = '下拉框';

  panelBodyCreator = (context: any) => {
    alert(111);
    var selectPlugin = getEditorPlugins().find((x) => x.id == 'SelectControlPlugin') as any;
    if (!selectPlugin.modified) {
      const schema = selectPlugin.panelBodyCreator(context);
      console.log('11111111111111111111111111111111selectPlugin', schema);
      selectPlugin = merge(selectPlugin, {
        tabs: [
          {
            title: 'EOC设定',
            body: [
              {
                type: 'select',
                label: '关联类型',
                options: [
                  { label: '菜单管理', value: 'AntdMenuItem' },
                  { label: 'Amis页面', value: 'AmisSchema' },
                ],
              },
            ],
          },
        ],
      });

      return selectPlugin;
    }
    selectPlugin.modified = true;
    return selectPlugin;
  };
}

unRegisterEditorPlugin('SelectControlPlugin');
//@ts-ignore
registerEditorPlugin(EOCSelectControlPlugin);
export default EOCSelectControlPlugin;
