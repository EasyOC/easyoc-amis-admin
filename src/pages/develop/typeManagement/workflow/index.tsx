import React from 'react';
import {Graph, Node, Cell, Path} from '@antv/x6';
import {register} from '@antv/x6-react-shape';
import {Selection} from '@antv/x6-plugin-selection';
import {Snapline} from '@antv/x6-plugin-snapline';
import AMISComponent from '@/components/AMISComponent';
import {WofklowInstance, WorkFlowType} from './Types';
import {PageContainer} from '@ant-design/pro-components';
// import { Flow } from '../xflow/flow';
import './index.less';
import {inject, observer} from 'mobx-react';
import {ActivityNode} from './Components/ActivityNode';
import schema2component from '@/components/AMISComponent/schema2component';
interface NodeStatus {
  id: string;
  status: string;
  label?: string;
}

register({
  shape: 'dag-node',
  width: 180,
  height: 42,
  component: ActivityNode,
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff'
          }
        }
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff'
          }
        }
      }
    }
  }
});

Graph.registerEdge(
  'dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 1,
        targetMarker: null
      }
    }
  },
  true
);

Graph.registerConnector(
  'algo-connector',
  (s, e) => {
    const offset = 4;
    const deltaY = Math.abs(e.y - s.y);
    const control = Math.floor((deltaY / 3) * 2);

    const v1 = {x: s.x, y: s.y + offset + control};
    const v2 = {x: e.x, y: e.y - offset - control};

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `
    );
  },
  true
);

// 画布标题处理
const listTitleHandle = (workflowType: WorkFlowType) => {};

// 节点数据处理
const nodeDataHandle = (workflowType: WorkFlowType) => {
  const resultNodeData = workflowType.Activities.map((e, i) => {
    return {
      id: e.ActivityId,
      shape: 'dag-node',
      x: e.X,
      y: e.Y,
      data: {
        label: e.Properties.ActivityMetadata.Title ?? e.Name,
        name: e.Name,
        status: 'success',
        activityData: e
      },
      ports: [
        {
          id: e.ActivityId,
          group: i % 2 == 1 ? 'top' : 'bottom'
        }
      ]
    };
  });
  const nodeFlowLine = workflowType.Transitions.map(e => {
    return {
      id: e.Id,
      shape: 'dag-edge',
      source: {
        cell: e.SourceActivityId,
        port: e.SourceActivityId
      },
      target: {
        cell: e.DestinationActivityId,
        port: e.DestinationActivityId
      },
      zIndex: 0
    };
  }) as any;
  nodeFlowLine.forEach(e => {
    resultNodeData.push(e);
  });
  console.log(
    '🚀 ~ file: index.tsx:165 ~ nodeFlowLine.forEach ~ resultNodeData:',
    resultNodeData
  );

  return resultNodeData;
};

// 节点状态处理
const nodeStatusHandle = (workflowInstance: WofklowInstance) => {
  const resultNodeStatuswww = workflowInstance.BlockingActivities.map(e => {
    return {
      id: e.ActivityId,
      status: 'running'
    };
  });
  const resultNodeStatus = [] as any;
  resultNodeStatus.push(resultNodeStatuswww);
  return resultNodeStatus;
};

const nodeDataSource = {
  Id: 1148162,
  WorkflowTypeId: '4rdym78mqgcdfw2dmn06q4skns',
  Name: 'aaa',
  IsEnabled: true,
  IsSingleton: false,
  LockTimeout: 0,
  LockExpiration: 0,
  DeleteFinishedWorkflows: false,
  Activities: [
    {
      ActivityId: '40t5rq6w394wswpdjh8m83xqca',
      Name: 'TimerEvent',
      X: 50,
      Y: 50,
      IsStart: true,
      Properties: {
        ActivityMetadata: {
          Title: '开始节点'
        },
        CronExpression: '20 22 * * *',
        UseSiteTimeZone: true
      }
    },
    {
      ActivityId: '49t1zyg5gv37ergy7thrc277mx',
      Name: 'TimerEvent',
      X: 540,
      Y: 130,
      IsStart: false,
      Properties: {
        ActivityMetadata: {
          Title: null
        },
        CronExpression: '20 * * * *',
        UseSiteTimeZone: true
      }
    }
  ],
  Transitions: [
    {
      Id: 0,
      SourceActivityId: '40t5rq6w394wswpdjh8m83xqca',
      SourceOutcomeName: 'Done',
      DestinationActivityId: '49t1zyg5gv37ergy7thrc277mx'
    }
  ]
} as WorkFlowType;

const nodeDataInstance = {
  Id: 1635527,
  WorkflowId: '4kb4bf2vkg9bb7deh4dr2f48x5',
  WorkflowTypeId: '4rdym78mqgcdfw2dmn06q4skns',
  State: {
    //最后执行时间
    LastExecutedOn: '2023-08-20T14:20:49.6132462Z',
    LastResult: null,
    Input: {},
    Output: {},
    Properties: {},
    ActivityStates: {
      '40t5rq6w394wswpdjh8m83xqca': {
        ActivityMetadata: {
          Title: null
        },
        CronExpression: '20 22 * * *',
        UseSiteTimeZone: true,
        StartedTime: '2023-08-20T22:20:49.6131615Z'
      },
      '49t1zyg5gv37ergy7thrc277mx': {
        ActivityMetadata: {
          Title: null
        },
        CronExpression: '20 * * * *',
        UseSiteTimeZone: true
      },
      '4eq99sbz67pxyx4wryfnkaspcf': {
        ActivityMetadata: {
          Title: null
        },
        Actions: ['AAA'],
        Roles: ['User']
      }
    },
    ExecutedActivities: []
  },
  Status: 4,
  LockTimeout: 0,
  LockExpiration: 0,
  BlockingActivities: [
    {
      //时钟 图标 （闪电 和时钟 两个图标）
      ActivityId: '40t5rq6w394wswpdjh8m83xqca',
      IsStart: true,
      Name: 'TimerEvent'
    }
  ],
  CreatedUtc: '2023-08-20T14:20:49.6084629Z',
  IsAtomic: false
} as WofklowInstance;

const data = [
  {
    label: 'Workflow ID',
    content: nodeDataInstance.WorkflowId
  },
  {
    label: 'Created',
    content: nodeDataInstance.CreatedUtc
  },
  {
    label: 'Status',
    content: nodeDataInstance.Status
  },
  {
    label: 'Correlation ID',
    content: nodeDataInstance.Id,
    span: 3
  }
];

const propertyList = {
  type: 'page',
  body: {
    type: 'property',
    title: '标题',
    items: data
  }
};

@inject('store')
@observer
export default class WorkflowIndex extends React.Component {
  private container!: HTMLDivElement;
  componentDidMount() {
    const graph: Graph = new Graph({
      container: this.container,
      width: 1150,
      height: 450,
      background: {
        color: '#fff'
      },
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel']
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4
            }
          }
        }
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'algo-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet({magnet}) {
          return magnet.getAttribute('port-group') !== 'top';
        },
        createEdge() {
          return graph.createEdge({
            shape: 'dag-edge',
            attrs: {
              line: {
                strokeDasharray: '5 5'
              }
            },
            zIndex: -1
          });
        }
      }
    });

    const selection = new Selection({
      multiple: true,
      rubberEdge: true,
      rubberNode: true,
      modifiers: 'shift',
      rubberband: true
    });
    graph.use(selection);
    graph.use(new Snapline());

    graph.on('edge:connected', ({edge}) => {
      edge.attr({
        line: {
          strokeDasharray: ''
        }
      });
    });

    graph.on('node:change:data', ({node}) => {
      const edges = graph.getIncomingEdges(node);
      const {status} = node.getData() as NodeStatus;
      edges?.forEach(edge => {
        if (status === 'running') {
          edge.attr('line/strokeDasharray', 5);
          edge.attr('line/style/animation', 'running-line 30s infinite linear');
        } else {
          edge.attr('line/strokeDasharray', '');
          edge.attr('line/style/animation', '');
        }
      });
    });

    // 初始化节点/边
    const init = (data: Cell.Metadata[]) => {
      const cells: Cell[] = [];
      data.forEach(item => {
        if (item.shape === 'dag-node') {
          cells.push(graph.createNode(item));
        } else {
          cells.push(graph.createEdge(item));
        }
      });
      graph.resetCells(cells);
    };

    // 显示节点状态
    const showNodeStatus = async (statusList: NodeStatus[][]) => {
      console.log(
        '🚀 ~ file: index.tsx:643 ~ Example ~ showNodeStatus ~ statusList:',
        statusList
      );
      const tempList = statusList;
      if (tempList.length > 0) {
        const status = tempList.shift();
        console.log(
          '🚀 ~ file: index.tsx:684 ~ Example ~ showNodeStatus ~ status:',
          status
        );
        status?.forEach(item => {
          const {id, status} = item;
          const node = graph.getCellById(id);
          const data = node.getData() as NodeStatus;
          node.setData({
            ...data,
            status: status
          });
        });
        setTimeout(() => {
          showNodeStatus(statusList);
        }, 1000);
      }
    };
    // init(data);
    init(nodeDataHandle(nodeDataSource));
    showNodeStatus(nodeStatusHandle(nodeDataInstance));
  }
  componentWillUnmount(): void {
    this.container = null;
  }
  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  render() {
    return (
      <PageContainer subTitle={false} title={false}>
        <div className="x6-graph-wrap">
          {schema2component(propertyList)}
          <div ref={this.refContainer} className="work-flow" />
        </div>
        {/* <Flow /> */}
      </PageContainer>
    );
  }
}
