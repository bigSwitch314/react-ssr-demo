import React from 'react'
import {Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Input, Icon } from 'antd'
import withStyle from '../withStyle'

import MyFooter from './footer/Footer'

import Home from '@pages/home/Home.jsx'

import style1 from './BasicLayout.less'
import  style2 from 'antd/lib/layout/style/index.css'
import  style3 from 'antd/lib/menu/style/index.css'
import  style4 from 'antd/lib/input/style/index.css'
import  style5 from 'antd/lib/icon/style/index.css'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu
const { Search } = Input

@withStyle(style5, style4, style3, style2, style1)
class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'mail',
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {

    return (
      <Layout className="basic-layout">
        <Header className="basic-layout-header">
          <i className="iconfont icon-logo logo" />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="menu"
          >
            <Menu.Item key="1">
              <Link to='/home'>首页</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/category'>分类</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/label'>标签</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='/archive'>归档</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to='/transshipment'>转载</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to='/openSource'>开源</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to='/about'>关于</Link>
            </Menu.Item>

            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  更多<Icon type="down" style={{ fontSize: 12, marginRight: 4 }}/>
                </span>
              }
            >
              <Menu.Item key="52">建议</Menu.Item>
              <Menu.Item key="53">工具</Menu.Item>
            </SubMenu>
          </Menu>
          <Search
            placeholder=""
            onSearch={value => console.log(value)}
            className="search"
          />
          <i className="iconfont icon-user admin" />
        </Header>

        <Content className="basic-layout-content">
          <div className='content'>
            <div className='left'>
              <div className='card'>
                <Switch>
                  <Route
                    extra
                    key='1'
                    path={'/home'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='2'
                    path={'/category'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='3'
                    path={'/label'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='4'
                    path={'/archive'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='5'
                    path={'/transshipment'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='6'
                    path={'/openSource'}
                    component={Home}
                  />
                  <Route
                    extra
                    key='7'
                    path={'/about'}
                    component={Home}
                  />
                </Switch>
              </div>
              <div className='card'></div>
            </div>
            <div className='right'>
              <div className='card'>11111</div>
              <div className='card'>22222</div>
              <div className='card'>33333</div>
            </div>
          </div>
        </Content>
        <Footer className="basic-layout-footer">
          <MyFooter/>
        </Footer>
      </Layout>

    )
  }
}

export default BasicLayout
