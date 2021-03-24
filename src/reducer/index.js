import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

const initialState = {
  initialValue: 0,
  name: 'qammar raza',
  allTasks: []
}


export const postTask = createAsyncThunk('/tasks/postTask', async (values, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:8080/tasks/addTask', values)
    return response.data;
  }
  catch (err) {
    notification.error({
      message: 'FAILED',
      description: err.response.data.message,
      top: 65
    })
    return thunkAPI.rejectWithValue({
      err: err.response.data.message,
      status: err.response.status
    })
  }
});

export const getTasks = createAsyncThunk('/tasks/getAllTasks', async (values, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:8080/tasks/getTasks')
    return response.data

  } catch (err) {
    notification.error({
      message: 'FAILED',
      description: err.response.data.message,
      top: 65
    });
    return thunkAPI.rejectWithValue({
      err: err.response.data.message,
      status: err.response.status
    })

  }
});

export const deleteTask = createAsyncThunk('/tasks/deleteTask', async (values, thunkAPI) => {
  try {
    const response = await axios.delete('http://localhost:8080/tasks/deleteTasks', { data: { id: values } });
    const { data } = response || {};
    notification.success({
      message: 'Task Deleted',
      description: data.message,
      top: 65
    })
    return response.data

  } catch (err) {
    notification.error({
      message: 'FAILED',
      description: err.response.data.message,
      top: 65
    });
    return thunkAPI.rejectWithValue({
      err: err.response.data.message,
      status: err.response.status
    })
  }
})

export const editTask = createAsyncThunk('/tasks/editTasks', async (values, thunkAPI) => {
  try {
    const response = axios.put('http://localhost:8080/tasks/editTasks', values);
    return response.data;
  } catch (err) {
    notification.error({
      message: 'FAILED',
      description: err.response.data.message,
      top: 65
    });
    return thunkAPI.rejectWithValue({
      err: err.response.data.message,
      status: err.response.status
    })
  }
})


const initialSlice = createSlice({
  name: 'initialReducer',
  initialState,
  reducers: {
    increment(state) {
      state.initialValue++
    },
    decrement(state) {
      state.initialValue--
    }
  },
  extraReducers: {
    [postTask.pending]: (state, action) => {
      state.loading = true
    },
    [postTask.fulfilled]: (state, action) => {
      const { values } = action.payload || {};
      const { customerName, customerQuantity, customerSubName } = values || {};
      state.name = customerName;
      state.customerQuantity = customerQuantity;
      state.customerSubName = customerSubName
      state.loading = false
    },
    [postTask.rejected]: (state, action) => {
      state.loading = false
    },
    [getTasks.pending]: (state, action) => {
      state.loading = true
    },
    [getTasks.fulfilled]: (state, action) => {
      const { payload } = action || {};
      const { tasks } = payload || {};
      state.allTasks = tasks
      state.loading = false
    },
    [getTasks.rejected]: (state, action) => {
      state.loading = false
    },
    [deleteTask.pending]: (state, action) => {
      state.loading = true
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteTask.rejected]: (state, action) => {
      state.loading = false
    },
    [editTask.pending]: (state, action) => {
      state.loading = true
    },
    [editTask.fulfilled]: (state, action) => {
      state.loading = false
    },
    [editTask.rejected]: (state, action) => {
      state.loading = false
    }

  }
});

export const { increment, decrement } = initialSlice.actions;
export default initialSlice.reducer;