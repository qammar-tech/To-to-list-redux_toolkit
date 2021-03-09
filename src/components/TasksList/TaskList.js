import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask } from '../../reducer/index';
import { List, Card, Button, Spin } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group';



const TaskList = (props) => {

  const dispatch = useDispatch();
  const initialState = useSelector((state) => state.initialSlice);
  const { allTasks } = initialState || {};

  useEffect(() => {
    dispatch(getTasks())
  }, []);

  const deleteTaskHandler = (item) => {
    console.log('this is the item to be deleted: ', item)
    dispatch(deleteTask(item.id)).then(() => {
      dispatch(getTasks());
    });
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Availabel Tasks: </h1>
      <div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={allTasks}
          renderItem={item => (
            <List.Item>
              <Card
                title={item.taskName}
                actions={[
                  <ButtonGroup>
                    <Button type="primary" onClick={() => props.onEdit(item)}>Edit</Button>
                    <Button type="danger" onClick={() => deleteTaskHandler(item)}>Delete</Button>
                  </ButtonGroup>
                ]}
              >
                Quantity: {item.quantity}
              </Card>
            </List.Item>
          )}
        />

      </div>
    </div>
  )

}


export default TaskList;