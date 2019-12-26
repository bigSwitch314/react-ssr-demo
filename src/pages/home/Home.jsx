import React from 'react'
import { connect } from 'react-redux'
import { List, Pagination } from 'antd'
import withStyle, { antdStyle } from '../../withStyle'
import style from './Home.less'
import { getArticleList } from '@modules/article'

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
    type: 2,
  },
]


@withStyle(style, ...antdStyle('list', 'pagination'))
@connect(
  state => ({
    articleList: state.article.articleList,
  }), {
    getArticleList,
  }
)

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
    this.getArticleList()
  }

  getArticleList() {
    this.props.getArticleList()
  }

  render() {
    // const { articleList } = this.state
    const { articleList: { list }} = this.props

    return (
      <div className="home">
        {list && list.length === 0
          ? (<div className="no-article">还未发布文章哦～</div>)
          : (<div className="article">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <span key={1}> 6天前 </span>,
                    <span key={2}> FRONTEND/JAVASCRIPT </span>,
                    <span key={3}> 阅读约 21 分钟 </span>,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href="http://ant.design">{item.title}</a>}
                    description={null}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>)
        }
        <div className="pagination">
          <Pagination defaultCurrent={1} total={500} />
        </div>
      </div>
    )
  }
}

Home.loadData = (store) => {
  console.log('loadData00000000-----')
  return store.dispatch(getArticleList())
}

export default Home
