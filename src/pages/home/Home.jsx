import React from 'react'
import { connect } from 'react-redux'
import { List, Pagination, Empty, Skeleton } from 'antd'
import withStyle, { antdStyle } from '../../withStyle'
import style from './Home.less'
import { getArticleList, getAclStat } from '@modules/article'
import { getQueryStringArgs } from '@utils/urlParse'


@withStyle(style, ...antdStyle('list', 'pagination', 'empty', 'skeleton'))
@connect(
  state => ({
    articleList: state.article.articleList,
    loading: state.loading['article/getArticleList'],
  }), {
    getArticleList,
  },
)

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryParam: {},
      currentPage: 1,
      pageSize: 5,
    }
    this.doOnce = true
  }

  static getDerivedStateFromProps(props, state) {
    if (props.queryParam !== state.queryParam) {
      return { queryParam: props.queryParam }
    }

    return null
  }

  componentDidMount() {
    const search = window.location.search
    const { page_no=1 } = getQueryStringArgs(search) || {}
    this.setState({ currentPage: Number(page_no)})
  }

  getArticleList() {
    const { currentPage, pageSize } = this.state
    this.props.getArticleList({
      page_no: currentPage,
      page_size: pageSize,
    })
  }

  query(type, item) {
    const articleQueryParam = {
      type,
      name: item.category_name,
      parentName: item.parent_category_name || '',
      id: item.category_id,
      parentId: item.parent_category_id || '',
    }
    localStorage.setItem('articleQueryParam', JSON.stringify(articleQueryParam))
    // 跳转到查询页面
    window.location.href = `/articleQuery?type=1&id=${item.category_id}`
  }

  changePage = (currentPage) => {
    if (currentPage ===1 ) {
      window.location.href = '/home'
    } else {
      window.location.href = `/home?page_no=${currentPage}`
    }
  }

  getActions= (item) => {
    const actions = [
      <span key={1}> {item.create_time} </span>,
      <span key={2} onClick={() => this.query('category', item)}>
        {item.parent_category_name ? `${item.parent_category_name}/${item.category_name}` : item.category_name}
      </span>,
      <span key={3}> 阅读约 21 分钟 </span>,
    ]
    if (!item.category_name) {
      actions.splice(1, 1)
    }
    return actions
  }

  render() {
    const { currentPage, pageSize } = this.state
    const { articleList: { list=[], count=0 }, loading } = this.props

    return (
      <div className="home">
        {list && list.length === 0
          ? (<div className="no-article card">
            { loading === undefined ? <Skeleton active /> : <Empty /> }
          </div>)
          : (<div className="article">
            <List
              className="card"
              itemLayout="vertical"
              size="large"
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={this.getActions(item)}
                >
                  <List.Item.Meta
                    title={<a href={`/articleDetail?id=${item.id}`}>{item.title}</a>}
                    description={null}
                  />
                  {item.content}
                </List.Item>
              )}
            />
            <Pagination
              className="pagination"
              current={currentPage}
              pageSize={pageSize}
              total={count}
              onChange={this.changePage}
            />
          </div>)
        }
      </div>
    )
  }
}

Home.loadData = (store, param) => {
  const newParam = {
    page_no: param.page_no || 1,
    page_size: 5,
  }

  return [
    store.dispatch(getArticleList(newParam)),
    store.dispatch(getAclStat({})),
  ]
}

export default Home
