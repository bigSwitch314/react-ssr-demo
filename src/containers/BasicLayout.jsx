import React from 'react'
import {Route, Link, Switch, Redirect } from 'react-router-dom'
import { Layout, Menu, Input, Icon } from 'antd'
import withStyle, { antdStyle } from '../withStyle'
import MyFooter from './footer/Footer'
import getRoutesData from '../../src/router/getRoutes'
import style from './BasicLayout.less'

const menuCodes = {
  首页: '001',
  分类: '002',
  标签: '004',
  归档: '005',
  转载: '006',
  开源: '007',
  关于: '008',
  更多: '009',
  下载: '00901',
}

const { routesData } = getRoutesData(menuCodes)

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu
const { Search } = Input


@withStyle(style, ...antdStyle('layout', 'menu', 'input', 'icon'))
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
        <div className="shadow">
          <Header className="basic-layout-header shadow">
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
          </Header>
        </div>

        <Content className="basic-layout-content">
          <div className='content'>
            <div className='left'>
              <div className='card'>
                <Switch>
                  {routesData.map(routes => routes.children.length > 0 ?
                    routes.children.map(route => (
                      <Route
                        extra
                        key={route.key}
                        path={route.fullPath}
                        component={route.component}
                      />
                    )) :
                    <Route
                      extra
                      key={routes.key}
                      path={routes.fullPath}
                      component={routes.component}
                    />,
                  )}
                  <Redirect to={routesData[0].fullPath} />
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
          <MyFooter {...this.props}/>
        </Footer>
      </Layout>

    )
  }
}

export default BasicLayout
