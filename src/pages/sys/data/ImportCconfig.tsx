//使用 React 和 antd 组件 实现如下需求：
//该页面 用于配置如何从 Excel中导入数据到指定的数据库
//配置页面包含，一个步骤表单组件，包含几个步骤：配置数据源，导入目标配置
// 第一个步骤 ，配置数据源 ，包含如下字段：
//数据源类型：下拉菜单，包含选项 "Excel（xlsx）"
//文件路径 ，起始行，起始列，是否包含标题，数据筛选条件
// 第二个步骤，导入目标配置，包含
// 数据源：下拉菜单
// 导入映射：该内容包含一个 Monaco-editor 组件， SQL 语法import React from 'react';
import {Steps, Form, Select, Input, Checkbox, Button} from 'antd';
import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';

import MonacoEditor from 'react-monaco-editor';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';

const {Step} = Steps;
const {Option} = Select;

const ReactPage: React.FC<{store: IMainStore}> = ({store}) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const handleEditorChange = value => {
    console.log(value);
  };

  return (
    <PageContainer title={'数据源设置'} loading={store.loading}>
      <Steps current={0}>
        <Step title="配置数据源" />
        <Step title="导入目标配置" />
      </Steps>
      <Form
        form={form}
        name="import-config"
        onFinish={onFinish}
        initialValues={{
          dataSourceType: 'Excel（xlsx）',
          filePath: '',
          startRow: 1,
          startColumn: 1,
          hasHeader: true,
          dataFilter: '',
          dataSource: '',
          importMapping: ''
        }}
      >
        <Form.Item
          label="数据源类型"
          name="dataSourceType"
          rules={[{required: true, message: '请选择数据源类型'}]}
        >
          <Select>
            <Option value="Excel（xlsx）">Excel（xlsx）</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="文件路径"
          name="filePath"
          rules={[{required: true, message: '请输入文件路径'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="起始行"
          name="startRow"
          rules={[{required: true, message: '请输入起始行'}]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="起始列"
          name="startColumn"
          rules={[{required: true, message: '请输入起始列'}]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="是否包含标题"
          name="hasHeader"
          valuePropName="checked"
          rules={[{required: true, message: '请选择是否包含标题'}]}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item label="数据筛选条件" name="dataFilter">
          <Input />
        </Form.Item>
      </Form>
      <Steps current={1} style={{marginTop: '50px'}}>
        <Step title="配置数据源" />
        <Step title="导入目标配置" />
      </Steps>
      <Form form={form} name="import-config" onFinish={onFinish}>
        <Form.Item
          label="数据源"
          name="dataSource"
          rules={[{required: true, message: '请选择数据源'}]}
        >
          <Select>
            <Option value="MySQL">MySQL</Option>
            <Option value="PostgreSQL">PostgreSQL</Option>
            <Option value="Oracle">Oracle</Option>
            <Option value="SQL Server">SQL Server</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="导入映射"
          name="importMapping"
          rules={[{required: true, message: '请输入导入映射'}]}
        >
          <MonacoEditor
            language="sql"
            theme="vs-dark"
            height={300}
            onChange={handleEditorChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            继续
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default inject('store')(observer(ReactPage));
// export default inject('store')(observer(ReactPage));
