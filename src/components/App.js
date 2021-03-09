import React, { useEffect } from 'react';
import { getTasks, editTask } from '../reducer/index';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { postTask } from '../reducer/index';
import AllTasks from './TasksList/TaskList';
import './App.css';

const App = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();


  const some = (values) => {
    console.log('these are te values: ', values)
    // const { resetFields } = form;
    if (values.id == undefined) {
      dispatch(postTask(values)).then(() => {
        dispatch(getTasks());
        resetFields()
      })
    } else {
      dispatch(editTask(values)).then(() => {
        dispatch(getTasks());
        resetFields();
      })
    }
  }

  const editFeilds = (item) => {
    console.log('this is the edit feild: ', item);
    form.setFieldsValue({
      customerName: item.taskName,
      customerSubName: item.subName,
      customerQuantity: item.quantity,
      id: item.id
    })
  }

  return (
    <div className="App">
      <h1>Something to test with redux toolkit</h1>
      <div style={{ display: 'inline' }}>
        <Form layout="horizontal" requiredMark="optional" onFinish={some} form={form}>
          <div className="what">
            <Form.Item
              name="customerName"
              rules={[{ required: true, min: 1, message: 'Please enter your name' }]}
            >
              <Input placeholder="Customer Name" />
            </Form.Item>
          </div>
          <div className="what">
            <Form.Item
              name="customerQuantity"
              rules={[{ required: true, min: 1, message: 'Please enter your quantity' }]}
            >
              <Input placeholder="Customer Qunatity" />
            </Form.Item>
          </div>
          <div className="what">
            <Form.Item
              name="customerSubName"
              rules={[{ required: true, min: 1, message: 'Please enter your subname name' }]}
            >
              <Input placeholder="Customer SubName" />
            </Form.Item>
          </div>
          <div className="what">
            <Form.Item
              name="id"
              hidden={true}
            // rules={[{ required: true, min: 1, message: 'Please enter your subname name' }]}
            >
              <Input placeholder="Customer SubName" />
            </Form.Item>
          </div>
          <div className="what">
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <AllTasks onEdit={editFeilds} />
    </div>
  );
}

export default App;
