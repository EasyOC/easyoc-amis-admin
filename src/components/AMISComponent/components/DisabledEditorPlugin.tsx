import { registerEditorPlugin, BasePlugin, getSchemaTpl } from 'amis-editor';
import {
  RendererEventContext,
  SubRendererInfo,
  BasicSubRenderInfo,
  PluginInterface,
} from 'amis-editor-core/lib/plugin';

import { merge } from 'lodash';

/**
 * 用于隐藏一些不需要的Editor组件
 * 备注: 如果不知道当前Editor中有哪些预置组件，可以在这里设置一个断点，console.log 看一下 renderers。
 */

// 需要在组件面板中隐藏的组件
const disabledRenderers: string[] = ['remark'];

export class ManagerEditorPlugin extends BasePlugin {
  order = 9999;
  buildSubRenderers(
    context: RendererEventContext,
    renderers: Array<SubRendererInfo>,
  ): BasicSubRenderInfo | Array<BasicSubRenderInfo> | void {
    // 更新NPM自定义组件排序和分类
    for (let index = 0, size = renderers.length; index < size; index++) {
      const renderer = renderers[index];
      // 判断是否需要隐藏 Editor预置组件
      const pluginRendererName = renderer.rendererName;
      if (pluginRendererName && disabledRenderers.indexOf(pluginRendererName) > -1) {
        renderer.disabledRendererPlugin = true; // 更新状态
      }

      if (pluginRendererName == 'select') {
        console.log('plugin下拉框', renderer);

        const oldMethod = Object.assign({}, { panelBodyCreator: renderer.plugin.panelBodyCreator });
        //重写 /修改
        renderer.plugin.panelBodyCreator = renderer.plugin.panelBody = [
          {
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
          },
        ];
        renderer.plugin.panelBodyCreator = undefined;
      }
    }
  }
}

registerEditorPlugin(ManagerEditorPlugin);
