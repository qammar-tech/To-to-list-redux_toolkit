// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';


// ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import store from './reducer/store'
import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
