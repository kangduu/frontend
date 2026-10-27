import React, { Component } from 'react'
import { ConfigProvider } from 'antd';
// import enUS from 'antd/lib/locale/en_US';
// import zhCN from 'antd/lib/locale/zh_CN';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import locale from 'antd/lib/locale/zh_CN';

import Home from './pages/Home';
import './App.less';

class App extends Component {
  state = {

  }
  render() {
    return (
      <ConfigProvider locale={locale}>
        <Home />
      </ConfigProvider>
    )
  }
}
export default App