import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { ConfigProvider, } from 'antd';

import store from "src/redux";

import App from './App';

// import {
//   Provider,
//   connectAdvanced,
//   ReactReduxContext,
//   connect,
//   batch,
//   useDispatch,
//   createDispatchHook,
//   useSelector,
//   createSelectorHook,
//   useStore,
//   createStoreHook,
//   shallowEqual
// } from "react-redux";


//   antd  
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

import './styles/index.less'

moment.locale('zh-cn');

render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
  document.getElementById('root')
);