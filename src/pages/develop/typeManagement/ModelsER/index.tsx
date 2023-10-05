/* eslint-disable react/button-has-type */
import {Graph, Node} from '@antv/x6';
import {Clipboard} from '@antv/x6-plugin-clipboard';
import {Selection} from '@antv/x6-plugin-selection';
import {History} from '@antv/x6-plugin-history';
import {Keyboard} from '@antv/x6-plugin-keyboard';
import {PageContainer} from '@ant-design/pro-components';
import {MiniMap} from '@antv/x6-plugin-minimap';
import {Scroller} from '@antv/x6-plugin-scroller';
import ButtonGroup from 'antd/es/button/button-group';
import AMISComponent from '@/components/AMISComponent';
import {useEffect, useRef, useState} from 'react';
import NodeComponent, {
  ContentTypeNodeData,
  InitNewNodeData,
  TypeNodeProps
} from './components/typeNode';
import {ScaleSettings, ScaleSettingsState} from './components/scale';
import {register, Portal} from '@antv/x6-react-shape';
import './index.less';
import {
  ContentType as ContentTypeDef,
  FieldName
} from '@/types/src/OCRecipeTypes';
import {PortManager} from '@antv/x6/lib/model/port';
import React from 'react';

/**
 * 生成旧的配方快照
 * @param inputNodeData
 * @returns
 */
const genRecipeSnapsort = (inputNodeData: ContentTypeNodeData[]) => {
  const nodeData = inputNodeData.filter(x => !x.isNew);
  const data = {
    steps: [
      {
        name: 'ReplaceContentDefinition',
        ContentTypes: [
          ...nodeData.map(x => x.serverSnapsort?.ContentTypeDefinitionRecord)
        ],
        ContentParts: [
          ...nodeData.map(x => x.serverSnapsort?.ContentPartDefinitionRecord)
        ]
      }
    ]
  };
  return data;
};

const genRecipe = (
  nodeData: Array<{
    ContentPartDefinitionRecord: any;
    ContentTypeDefinitionRecord: any;
  }>
) => {
  const data = {
    steps: [
      {
        name: 'ReplaceContentDefinition',
        ContentTypes: [...nodeData.map(x => x.ContentTypeDefinitionRecord)],
        ContentParts: [...nodeData.map(x => x.ContentPartDefinitionRecord)]
      }
    ]
  };
  return data;
};

const X6ReactPortalProvider = Portal.getProvider(); // 注意，一个 graph 只能申明一个 portal provider
interface PageState {
  showMiniMap: boolean;
  canUndo: boolean;
  canRedo: boolean;
  allTypes: Node[];
  nodeValues: string[];
  selectedNodes: string[];
}

register({
  shape: 'type-node',
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 5
          }
        }
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 5
          }
        }
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 5
          }
        }
      }
    }
  },
  component: NodeComponent
});

const ModelsER = () => {
  const [state, setState] = useState<PageState>({
    showMiniMap: true,
    canRedo: false,
    canUndo: false,
    allTypes: [],
    selectedNodes: [],
    nodeValues: []
  });
  let graph: Graph;
  const container = useRef<HTMLDivElement>(null);
  const minimapContainer = useRef<HTMLDivElement>(null);
  const [scaleLevel, setScaleLevel] = useState<number>(1);
  const [graphState, setGraphState] = useState<Graph>();

  let isMounted = false;
  useEffect(() => {
    if (isMounted) {
      return;
    }
    //@ts-ignore
    window.__x6_instances__ = [];
    graph = new Graph({
      container: container.current as HTMLDivElement,
      background: {
        color: '#fff'
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1 // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4 // 主次网格线间隔
          }
        ]
      },
      panning: true,
      mousewheel: {
        enabled: true,
        modifiers: 'Ctrl',
        guard: e => {
          const currentScale = graph?.zoom() || 1;
          setScaleLevel(currentScale);
          return true;
        },
        maxScale: 3,
        minScale: 0.1
      }
    });
    setGraphState(graph);
    //@ts-ignore
    window.__x6_instances__.push(graph);
    // 选择框插件
    graph.use(
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
        pointerEvents: 'none',
        modifiers: 'Ctrl',
        strict: true
      })
    );
    // 记录历史，用于撤销
    graph.use(
      new History({
        enabled: true
      })
    );
    // 键盘事件
    graph.use(
      new Keyboard({
        enabled: true,
        global: false,
        guard(this: Graph, e: KeyboardEvent) {
          return true;
        }
      })
    );
    // 复制黏贴
    graph.use(
      new Clipboard({
        enabled: true
      })
    );

    // 使用插件滚动条
    graph.use(
      new Scroller({
        enabled: true,
        pageVisible: true,
        pageBreak: false,
        pannable: true
      })
    );
    // 使用插件小地图
    graph.use(
      new MiniMap({
        container: minimapContainer.current as HTMLDivElement
      })
    );
    graph.on('node:selected', args => {
      state.selectedNodes.push(args.node.id);
    });
    graph.on('history:change', () => {
      state.canRedo = graph.canRedo();
      state.canUndo = graph.canUndo();
    });
    // 全屏清空
    graph.bindKey(['delete', 'backspace'], () => {
      const cells = graph.getSelectedCells();
      if (cells && cells.length) {
        graph.removeCells(cells);
      }
      return false;
    });
    addNodesFn(['Department', 'UserProfileInternal', 'Customer']);
    // addNodesFn(['Department', 'UserProfileInternal']);
    isMounted = true;
  }, []);

  const currentGraph = () => {
    return graph || graphState;
  };

  const protList: string[] = [];
  const refreshEdges = () => {
    const exisEdges = currentGraph().getEdges();
    exisEdges.forEach(x => {
      currentGraph().removeEdge(x.id);
    });
    currentGraph()
      .getNodes()
      .forEach((n: Node, i) => {
        const nodeType = n.data as ContentTypeDef;
        if (!nodeType.ContentPartDefinitionRecord) {
          return;
        }
        let sources =
          nodeType.ContentPartDefinitionRecord?.ContentPartFieldDefinitionRecords?.filter(
            x => x.FieldName == FieldName.ContentPickerField
          );
        if (sources && sources.length > 0) {
          const portItems: PortManager.PortMetadata[] = [];
          // 添加链接桩
          // sources.forEach((field) => {
          //   const portId = nodeType.ContentPartDefinitionRecord.Name + ' - ' + field.Name;
          //   if (!protList.includes(portId)) {
          //     protList.push(portId);
          //     portItems.push({
          //       id: portId,
          //       group: 'left',
          //     });
          //   }
          // });
          n.prop('ports/items', portItems);
          sources.forEach(field => {
            const sourcePort =
              nodeType.ContentPartDefinitionRecord?.Name + ' - ' + field.Name;
            if (
              !field.Settings?.ContentPickerFieldSettings?.DisplayedContentTypes
            ) {
              //TODO:如果存在此名称的 连线 ，则需要删除

              return;
            }
            //当前外键字段
            field.Settings?.ContentPickerFieldSettings?.DisplayedContentTypes?.forEach(
              targetTypeName => {
                const targetNode = currentGraph()
                  .getNodes()
                  .find(x => x.id == targetTypeName);
                if (targetNode) {
                  addEdgesFn(n, targetNode, {source: sourcePort});
                }
              }
            );
          });
        }
      });
  };
  const addEdgesFn = (
    source: Node,
    target: Node,
    prots: {source: string; target?: string}
  ) => {
    const graph = currentGraph();
    const edges = graph.getEdges();
    // if(edges.find(x=>x.source.)))
    if (source.id != target.id) {
      currentGraph().addEdge({
        // source: { cell: source, port: prots?.source },
        // target: { cell: target, port: prots?.target },
        source: {cell: source},
        target: {cell: target},
        label: source.id
      });
    }
  };
  const addNodesFn = (checkedValues: string[]) => {
    checkedValues.forEach(e => {
      // debugger;
      const localGraph = currentGraph();
      localGraph?.addNode({
        shape: 'type-node',
        x: 20 + Math.floor(localGraph.getNodes().length / 4) * 220,
        y: (localGraph.getNodes().length % 4) * 150 + 20,
        id: e,
        label: e,
        data: {afterLoad: refreshEdges}
      });
    });
  };

  // 清屏
  const clearScreen = () => {
    currentGraph()?.removeCells(currentGraph().getCells());
  };

  const handleUndo = () => {
    currentGraph()?.undo();
  };

  const handleOnRedo = () => {
    currentGraph()?.redo();
  };

  // 隐藏小地图按钮
  const btnHiddenMiniMap = {
    name: 'switch',
    type: 'switch',
    style: {
      position: 'relative',
      top: '10px'
      // marginTop: '20px',
    },
    onText: '缩略图',
    value: state.showMiniMap,
    offText: '缩略图',
    onEvent: {
      change: {
        actions: [
          {
            actionType: 'custom',
            script: (a, b, c) => {
              setState(s => ({...s, showMiniMap: c.data.value}));
            }
          }
        ]
      }
    }
  };

  // 撤销
  const btnRevoke = {
    type: 'button',
    label: '撤销',
    id: '',
    onEvent: {
      click: {
        actions: [
          {
            actionType: 'custom',
            script: () => {
              handleUndo();
            }
          }
        ]
      }
    }
  };
  // 重做
  const btnRedo = {
    type: 'button',
    label: '重做',
    id: '',
    onEvent: {
      click: {
        actions: [
          {
            actionType: 'custom',
            script: () => {
              handleOnRedo();
            }
          }
        ]
      }
    }
  };
  // 清空
  const btnClearSchema = {
    type: 'button',
    label: '清空',
    onEvent: {
      click: {
        actions: [
          {
            actionType: 'custom',
            script: () => {
              clearScreen();
            }
          }
        ]
      }
    }
  };
  // 新建
  const btnCreateNewSchema = {
    type: 'button',
    label: '新建',
    id: 'u:91c3b1b81c5e',
    onEvent: {
      click: {
        actions: [
          {
            actionType: 'dialog',
            dialog: {
              type: 'dialog',
              title: '新建类型',
              body: [
                {
                  type: 'form',
                  data: {},
                  id: 'u:37986fcdbc27',
                  title: '表单',
                  onEvent: {
                    submitSucc: {
                      weight: 0,
                      actions: [
                        {
                          actionType: 'custom',
                          script: (context, doAction, event) => {
                            const formData = context.getData();
                            let typeschema = InitNewNodeData(formData);
                            currentGraph()?.addNode({
                              shape: 'type-node',
                              x:
                                20 +
                                Math.floor(
                                  currentGraph()?.getNodes().length / 4
                                ) *
                                  220,
                              y:
                                (currentGraph()?.getNodes().length % 4) * 150 +
                                20,
                              id: formData.Name,
                              data: {...typeschema}
                              // data: typeschema,
                            });
                            doAction({
                              actionType: 'toast',
                              args: {msg: '新建成功'}
                            });
                          }
                        }
                      ]
                    }
                  },
                  body: [
                    {
                      type: 'input-text',
                      label: '显示名称',
                      name: 'DisplayName',
                      id: 'u:a73ec2dd0728'
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
                                  value: '${pinyinStartCase(DisplayName)}'
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  wrapWithPanel: false
                }
              ],
              showCloseButton: true,
              showErrorMsg: true,
              showLoading: true,
              id: 'u:ca9bf9237cd6',
              closeOnEsc: false
            }
          }
        ],
        weight: 0
      }
    }
  };
  // 添加
  const btnAddSchema = {
    type: 'button',
    label: '添加',
    onEvent: {
      click: {
        actions: [
          {
            args: {},
            actionType: 'drawer',
            drawer: {
              size: 'lg',
              resizable: true,
              overlay: false,
              closeOnEsc: true,
              type: 'drawer',
              title: '选择类型',
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
                              type: 'input-text',
                              name: 'filter',
                              label: '关键字',
                              id: 'u:d5ef7f843771',
                              size: 'full',
                              mode: 'horizontal'
                            }
                          ],
                          md: '',
                          id: 'u:e6d725fbe08f'
                        },
                        {
                          body: [
                            {
                              type: 'select',
                              label: '类型',
                              name: 'stereotype',
                              options: [
                                {
                                  label: '数据容器',
                                  value: 'ContenContainerTypeOnly'
                                },
                                {
                                  label: '仅动态索引',
                                  value: 'DIndexOnly'
                                },
                                {
                                  label: '所有',
                                  value: 'All'
                                },
                                {
                                  label: 'Widget',
                                  value: 'Widget'
                                },
                                {
                                  label: 'CustomUserSettings',
                                  value: 'CustomUserSettings'
                                },
                                {
                                  label: 'MenuItem',
                                  value: 'MenuItem'
                                }
                              ],
                              multiple: false,
                              value: 'ContenContainerTypeOnly',
                              id: 'u:77381e6fc489',
                              mode: 'horizontal'
                            }
                          ],
                          id: 'u:5bbe1001c91c'
                        }
                      ],
                      id: 'u:8a3f0184fd88'
                    },
                    {
                      type: 'picker',
                      label: '类型',
                      name: 'typeNames',
                      id: 'u:5736f5212043',
                      modalMode: 'dialog',
                      inline: false,
                      multiple: true,
                      embed: true,
                      source: {
                        method: 'get',
                        url: '/api/ContentTypeManagement/GetAllTypes?page=${page}&pageSize=${perPage}&typeName=${typeName}&filter=${filter}&stereotype=${stereotype}',
                        adaptor: response => {
                          const items = response.items.map(x => {
                            return {
                              label: `${x.displayName} - ${x.name}${
                                x.stereotype ? ' - ' + x.stereotype : ''
                              }`,
                              value: x.name
                            };
                          });
                          return {items, total: response.total};
                        },
                        replaceData: false,
                        dataType: 'json',
                        messages: {}
                      },
                      joinValues: false,
                      extractValue: true
                    }
                  ],
                  onEvent: {
                    submitSucc: {
                      weight: 0,
                      actions: [
                        {
                          actionType: 'custom',
                          script: context => {
                            const formData = context.getData();
                            addNodesFn(formData.typeNames);
                          }
                        }
                      ]
                    }
                  },
                  id: 'u:bc435d2aa3fe'
                }
              ],
              id: 'u:ce0a11f65c41'
            }
          }
        ]
      }
    },
    id: 'u:3e0852cc98db'
  };
  // 提交
  const btnSubmitSchema = {
    type: 'button',
    label: '提交',
    onEvent: {
      click: {
        actions: [
          {
            actionType: 'custom',
            script: (context, doAction, event) => {
              const afterUpdateNodes = currentGraph().getNodes();
              if (afterUpdateNodes.length == 0) {
                doAction({
                  actionType: 'toast',
                  args: {
                    msgType: 'error',
                    msg: '尚未添加任何类型'
                  }
                });
                return false;
              }
              if (!afterUpdateNodes.find(x => x.data?.dataChanged || false)) {
                doAction({
                  actionType: 'toast',
                  args: {
                    msgType: 'error',
                    msg: '未检测到任何更改'
                  }
                });
                return false;
              }
              doAction({
                actionType: 'dialog',
                dialog: {
                  type: 'dialog',
                  id: 'submitDialog',
                  title: '弹框标题',
                  body: [
                    {
                      type: 'form',
                      id: 'submitForm',
                      onEvent: {
                        submitSucc: {
                          weight: 0,
                          actions: [
                            {
                              actionType: 'custom',
                              script: () => {
                                currentGraph()
                                  .getNodes()
                                  .filter(
                                    (x: {data: ContentTypeNodeData}) =>
                                      x.data.dataChanged || x.data.isNew
                                  )
                                  .forEach(
                                    async (x: {data: ContentTypeNodeData}) => {
                                      await x.data?.initNodeData?.();
                                    }
                                  );
                              }
                            }
                          ]
                        }
                      },
                      data: {
                        originContent: () =>
                          JSON.stringify(
                            genRecipeSnapsort(
                              afterUpdateNodes.map(x => {
                                return x.data;
                              })
                            )
                          ),
                        recipeContent: () =>
                          JSON.stringify(
                            genRecipe(
                              afterUpdateNodes.map(x => {
                                return x.data;
                              })
                            )
                          )
                      }, //此处复制使用函数赋值，使用是与普通字段一样，不需要花括号
                      api: {
                        url: '/api/ContentTypeManagement/ImportDeploymentPackage',
                        method: 'post',
                        messages: {},
                        data: {
                          recipeContent: '${recipeContent}'
                        },
                        adaptor: () => {
                          // currentGraph
                          return {
                            msg: '提交成功'
                          };
                        }
                      },
                      title: '表单',
                      body: [
                        {
                          type: 'diff-editor',
                          label: '对比变更',
                          name: 'recipeContent',
                          id: 'u:6dfaeae678e5',
                          allowFullscreen: true,
                          language: 'json',
                          hiddenOn: '!compare',
                          diffValue: '${originContent}'
                        }
                        // {
                        //   type: 'editor',
                        //   label: '配方预览',
                        //   name: 'recipeContent',
                        //   style: { height: '500px' },
                        //   id: 'u:bf7d4d595e7e',
                        //   language: 'json',
                        //   allowFullscreen: true,
                        // },
                      ]
                    }
                  ],
                  showCloseButton: true,
                  showErrorMsg: true,
                  showLoading: true,
                  closeOnEsc: true,
                  size: 'xl'
                }
              });
            }
          }
        ]
      }
    },
    id: 'u:18e38ead27e9',
    level: 'primary'
  };
  // 展示所有按钮
  const topBtnSchema = Object.freeze({
    type: 'button-toolbar',
    buttons: [
      btnHiddenMiniMap,
      btnRevoke,
      btnRedo,
      btnClearSchema,
      btnCreateNewSchema,
      btnAddSchema,
      btnSubmitSchema
    ],
    id: 'u:402a9db42a6c'
  });

  // 比例尺
  const scaleChanged = (settgins: ScaleSettingsState) => {
    graphState?.scale(settgins?.scale || 1);
  };

  return (
    <>
      <div className="er-graph">
        {/* 小地图 */}
        <div
          className="app-minimap"
          ref={minimapContainer}
          style={{visibility: state.showMiniMap ? 'visible' : 'hidden'}}
        />
        {/* 比例尺 */}
        <div className="app-scale">
          <ScaleSettings
            center={() => graphState?.centerContent()}
            parentScale={scaleLevel}
            onChange={scaleChanged}
          />
        </div>
        {/* 右上角的按钮 */}
        <div style={{position: 'absolute', right: 10, top: 10, zIndex: 4}}>
          <ButtonGroup>
            <AMISComponent schema={topBtnSchema}></AMISComponent>
          </ButtonGroup>
        </div>

        <X6ReactPortalProvider />
        <div className="app-content" ref={container} />
      </div>
    </>
  );
};

export default () => {
  return (
    <PageContainer title={false}>
      <ModelsER />
    </PageContainer>
  );
};
