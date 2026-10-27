import React from 'react';

import { Layout } from 'antd';

import HeadBar from "src/components/home/header/HeadBar";
import SideBar from "src/components/home/sider/SideBar";
import RouteTags from "src/components/home/router-tags/RouteTags";
import ContentFields from "src/components/home/content/ContentFields";

import './styles/comp-field/App.less';
import * as colors from '@ant-design/colors';

console.log(colors);

function App() {

  const { Header, Content } = Layout;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />

      <Layout>
        <Header className="app-header">
          <HeadBar />
        </Header>

        <RouteTags />

        <Content className="app-content">
          <ContentFields />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
