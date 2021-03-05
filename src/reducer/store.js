import { configureStore } from '@reduxjs/toolkit';
import initialSlice from './index';
// import logger from 'redux-logger';


export default configureStore({
    reducer: {
        initialSlice,
        // middleware: [logger]
    }
});
