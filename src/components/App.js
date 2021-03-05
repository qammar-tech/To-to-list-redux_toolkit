import React, { useEffect } from 'react';
import { increment } from '../reducer/index';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { postTask } from '../reducer/index';
import './App.css';

const App = (props) => {

    const [form] = Form.useForm();
    // const [modalOpen, setModal] = useState(false);
    const initialValue = useSelector((state) => state.initialSlice)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(increment());
    }, []);

    const some = (values) => {
        dispatch(postTask(values))
    }

    return (
        <div className="App">
            <h1>Something to test with redux toolkit</h1>
            <div style={{ display: 'inline' }}>
                <Form layout="horizontal" requiredMark="optional" onFinish={some}>
                    <div className="some">
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
                                rules={[{ required: true, min: 1, message: 'Please enter your name' }]}
                            >
                                <Input placeholder="Customer Qunatity" />
                            </Form.Item>
                        </div>
                        <div className="what">
                            <Form.Item
                                name="customerSubName"
                                rules={[{ required: true, min: 1, message: 'Please enter your name' }]}
                            >
                                <Input placeholder="Customer SubName" />
                            </Form.Item>
                        </div>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
              </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            {/* <div style={{ display: 'block' }}>
        <Button onClick={some}>
          Add a Task To Do
        </Button>
      </div> */}
        </div>
    );
}

export default App;
