import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

const initialState = {
    initialValue: 0,
    name: 'qammar raza'
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
        }
    }
});

export const { increment, decrement } = initialSlice.actions;
export default initialSlice.reducer;