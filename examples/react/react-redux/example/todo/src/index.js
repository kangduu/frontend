import React from 'react';
import { render } from 'react-dom';
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import todoApp from "./reducers";
import App from './App';
import './styles/index.less';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');

// const store = createStore(todoApp)
render(
    <App />,
    document.getElementById('root')
);