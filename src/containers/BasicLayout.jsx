import React from 'react'
import { connect } from 'react-redux'
import {Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Menu, Input, Button, Tooltip } from 'antd'
import withStyle, { antdStyle } from '../withStyle'
import MyFooter from './footer/Footer'
import { getMenus, getRoutes, getParentKey } from '../../src/router/utils'
import style from './BasicLayout.less'
import avatar from '@assets/image/avatar.jpg'
import sf from '@assets/image/sf.jpg'
import ad_1 from '@assets/image/ad_1.jpg'
import { placeIcon, githubIcon, juejinIcon } from '@assets/svg/path'

const menuCodes = {
  首页: '001',
  分类: '002',
  标签: '004',
  归档: '005',
  转载: '006',
  开源: '007',
  关于: '008',
  建议: '00901',
  工具: '00902',
}

const { menusData, newRouterConfig } = getMenus(menuCodes)
const { routesData } = getRoutes(menuCodes, newRouterConfig)

const { Header, Content, Footer } = Layout
const { Search } = Input


// 菜单需引入menu icon样式
@withStyle(style, ...antdStyle('layout', 'menu', 'input', 'icon', 'button', 'tooltip'))
@connect(
  state => ({
    articleDirectory: state.article.articleDirectory,
    aclStat: state.article.aclStat,
  })
)

class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'mail',
    }
  }

  componentDidMount() {

  }

  onClickMenu = (item) => {
    window.location.href = `/${item.key}`
  }

  jumpToLogin = () => {
    window.open('http://localhost:3002/#/login')
  }

  jumpToHome = () => {
    window.location.href = '/home'
  }

  onClickAd1 = () => {
    window.open('https://activity.huaweicloud.com/2020feb_promotion/index.html?utm_source=segmentfault&utm_medium=banner&utm_campaign=10033&utm_content=&utm_term=&utm_adplace=AdPlace024691')
  }

  render() {
    const { location: { pathname}, articleDirectory=null, aclStat } = this.props
    const { article_stat=0, category_stat=0, label_stat=0 } = aclStat || {}
    const parentKey = getParentKey(pathname)

    return (
      <Layout className="basic-layout">
        <div className="shadow">
          <Header className="basic-layout-header">
            <i className="iconfont icon-logo logo" onClick={this.jumpToHome} />
            <Menu
              selectedKeys={[parentKey]}
              onClick={this.onClickMenu}
              mode="horizontal"
              className="menu"
            >
              {menusData}
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
            <div className='right'>
              <div className='right-card'>
                <div className="author">
                  <img
                    onDoubleClick={this.jumpToLogin}
                    alt="罗强"
                    style={{ marginBottom: 10, width: 128, borderRadius: 4}}
                    src={`../${avatar}`}
                  />
                  <span className="block name">罗强</span>
                  <span className="block">Web Front-End</span>
                  <span className="block place">
                    <svg viewBox="0 0 1024 1024" width="16" height="16">
                      <path d={placeIcon} fill="#7a7a7a" />
                    </svg>
                    China
                  </span>
                </div>
                <div className="statistic">
                  <div className="stat">
                    <span className="block">文章</span>
                    <span className="block number">{article_stat}</span>
                  </div>
                  <div className="stat">
                    <span className="block">分类</span>
                    <span className="block number">{category_stat}</span>
                  </div>
                  <div className="stat">
                    <span className="block">标签</span>
                    <span className="block number">{label_stat}</span>
                  </div>
                </div>
                <div className="attention">
                  <Button type="primary" className="button">关注</Button>
                </div>
                <div className="linkage">
                  <div className="link">
                    <Tooltip placement="bottom" title="github" overlayClassName="link-tip">
                      <svg viewBox="0 0 1024 1024" width="16" height="16">
                        <path d={githubIcon} fill="#231F20" />
                      </svg>
                    </Tooltip>
                  </div>
                  <div className="link">
                    <Tooltip placement="bottom" title="segmentfault" overlayClassName="link-tip">
                      <img src={`../${sf}`} width={14} />
                    </Tooltip>
                  </div>
                  <div className="link">
                    <Tooltip placement="bottom" title="juejin" overlayClassName="link-tip">
                      <svg viewBox="0 0 45 38" width="18px" height="14px" >
                        <path d={juejinIcon} fill="#006CFF"></path>
                      </svg>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className='right-card ad_1' id="ad_1" onClick={this.onClickAd1}>
                <img src={`../${ad_1}`} width={320} style={{ borderRadius: 4 }} />
              </div>
              { articleDirectory
                ? <div className='right-card directory' id="directory">
                  <div className="title">目录</div>
                  <div
                    id="article-directory"
                    className="article-directory"
                    dangerouslySetInnerHTML={{ __html: articleDirectory }}
                  />
                </div>
                : null
              }
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
