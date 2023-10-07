import React from 'react';
import {Graph, Node} from '@antv/x6';
import '../index.less';

const style: React.CSSProperties = {background: '', padding: '8px 0'};
//TODO: 远程资源保存到本地
const image = {
  logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
  success:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
  failed:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
  running:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ'
};
export class ActivityNode extends React.Component<{node: Node; graph: Graph}> {
  componentDidUpdate() {
    const {node} = this.props;
    if (node) {
      if (node.hasChanged('data')) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {node} = this.props;
    const nodedata = node?.getData();
    // debugger;
    // const data = node?.getData() as NodeStatus;
    const {name, label, status = 'default'} = nodedata;
    return (
      <div className={`node ${status}`}>
        <div>
          <img src={image.logo} alt="logo" />
          <span className="label">{label}</span>
          <span className="status">
            {status === 'success' && <img src={image.success} alt="success" />}
            {status === 'failed' && <img src={image.failed} alt="failed" />}
            {status === 'running' && <img src={image.running} alt="running" />}
          </span>
        </div>
        <div className="subheading">
          <span>{name}</span>
        </div>
      </div>
    );
  }
}
