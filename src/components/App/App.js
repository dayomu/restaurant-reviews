import React, { Component } from 'react';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './App.css';

import Reviews from '../Reviews/Reviews';

class App extends Component {
  render() {
    const { Header, Content } = Layout;
    
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">Restaurant Reviews</div>
        </Header>
        <Content className="app-content">
          <Reviews />
        </Content>
      </Layout>
    );
  }
}

export default App;