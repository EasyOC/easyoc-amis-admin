import { Tabs } from 'antd'
import Basic from './basic'
import Dag from './dag'
import Flow from './flow'
import { PageContainer } from '@ant-design/pro-components';
import './index.less'

// const Xflow = () => {
//   const tabs = [
//     { label: "Basic", key: "1", children: <Basic /> },
//     { label: "Dag", key: "2", children: <Dag /> },
//     { label: "Flow", key: "3", children: <Flow /> }
//   ]
//   return (
//     <Tabs items={tabs.map((e) => {
//       return {
//         label: e.label,
//         key: e.key,
//         children:e.children
//       }
//     })
//     } />
//     // <Tabs items={tabs} />
//   )
// }

const { TabPane } = Tabs

const Xflow = () => {
  return (
    <Tabs type="card">
      <TabPane tab="Basic" key="1" style={{ minHeight: 600, height: 'calc(100vh - 56px)' }}>
        <Basic />
      </TabPane>
      <TabPane tab="Dag" key="2" style={{ minHeight: 600, height: 'calc(100vh - 56px)' }}>
        <Dag />
      </TabPane>
      <TabPane tab="Flow" key="3" style={{ minHeight: 600, height: 'calc(100vh - 56px)' }}>
        <Flow />
      </TabPane>
    </Tabs>
  )
}

export default () => {
  return (
    <PageContainer title={false}>
      <Xflow />
    </PageContainer>
  );
};