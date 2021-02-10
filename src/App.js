import React, { useState, useEffect } from 'react';
import './App.css';
import { increment } from './reducer/index';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Button, Card, Icon } from 'antd';


const App = () => {
  const [modalOpen, setModal] = useState(false);
  const initialValue = useSelector((state) => state.initialSlice)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(increment());
  }, []);

  const some = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/tasks/getTasks',
    }).then(({ data }) => console.log('this is the response: ', data))
      .catch((error) => console.log('this is the error: ', error));
  }

  console.log('this is the state: ', initialValue)
  return (
    <div className="App">
      <h1>Something to test with redux toolkit</h1>
      <Button>
        <Icon type='user' />
        Add a Task To Do
      </Button>
    </div>
  );
}

export default App;
