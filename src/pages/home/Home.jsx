import React from 'react'
import { List } from 'antd'
import withStyle from '../../withStyle'
import './Home.less'

const testData = [
  {
    category_id: 1,
    category_name: 'PHP',
    content: 'Redis相信大家都不陌生，而如果只是用来取代memcached做缓存的话，实在是大材小用了。一起来看看生产环境下的常用用法。↵分布式锁↵',
    create_time: '2018-12-30',
    edit_time: '2019-05-15',
    id: 46,
    label_name: 'fds,lable7222,lable7112,lable71s22',
    read_number: 0,
    release: 1,
    title: 'test2',
    type: 1,
  }, {
    category_id: 1,
    category_name: 'PHP',
    content: 'Redis相信大家都不陌生，而如果只是用来取代memcached做缓存的话，实在是大材小用了。一起来看看生产环境下的常用用法。↵分布式锁↵',
    create_time: '2018-12-30',
    edit_time: '2019-08-15',
    id: 47,
    label_name: 'fds,lable7222,lable7112,lable71s22',
    read_number: 0,
    release: 1,
    title: 'test3',
    type: 1,
  },
]

import style0 from './Home.less'
import style1 from 'antd/lib/list/style/index.css'

@withStyle(style0, style1)
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articleList: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userList !== state.userList) {
      return { userList: props.userList }
    }

    return null
  }

  componentDidMount() {
    this.setState({
      articleList: testData,
    })
  }

  render() {
    const { articleList } = this.state
    return (
      <div className="home">
        {articleList.length === 0
          ? (<div className="no-article">还未发布文章哦～</div>)
          : (<div className="article">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={articleList}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <a href="http://ant.design" key="href">阅读原文</a>,
                  ]}
                  /* extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  } */
                >
                  <List.Item.Meta
                    title={<a href="http://ant.design">{item.title}</a>}
                    description={<div>
                      <i className="iconfont icon-user logo" />
                      创建于{item.create_time}
                      <span style={{ margin: 14 }}>|</span>
                      <i className="iconfont icon-user logo" />
                      分类于{item.category_name}
                      <span style={{ margin: 14 }}>|</span>
                      <i className="iconfont icon-eye logo" />
                      阅读次数{item.read_number}
                    </div>}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>)
        }
      </div>
    )
  }
}

export default Home
