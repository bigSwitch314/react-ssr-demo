import React from 'react'
import { connect } from 'react-redux'
import { List, Pagination, Empty } from 'antd'
import withStyle, { antdStyle } from '../../withStyle'
import style from './ArticleQuery.less'
import { getArticleList, getAclStat } from '@modules/article'
import { getQueryStringArgs } from '@utils/urlParse'


@withStyle(style, ...antdStyle('list', 'pagination', 'empty'))
@connect(
  state => ({
    articleList: state.article.articleList,
  }), {
    getArticleList,
  },
)

class ArticleQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articleQueryParam: {},
      currentPage: 1,
      pageSize: 5,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.queryParam !== state.queryParam) {
      return { queryParam: props.queryParam }
    }

    return null
  }

  componentDidMount() {
    // 查询参数
    let articleQueryParam = localStorage.getItem('articleQueryParam')
    articleQueryParam = articleQueryParam && JSON.parse(articleQueryParam) || {}
    this.setState({ articleQueryParam })
    // 分页
    const search = window.location.search
    const { page_no=1 } = getQueryStringArgs(search) || {}
    this.setState({ currentPage: Number(page_no) })
  }

  getArticleList(param) {
    const { currentPage, pageSize } = this.state
    let newParam = {}
    if (param && param.type === 'category') {
      newParam = { category_id: param.id }
    }
    if (param && param.type === 'label') {
      newParam = { label_ids: param.id }
    }
    this.props.getArticleList({
      page_no: currentPage,
      page_size: pageSize,
      ...newParam,
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

  jumpTo() {
    const { articleQueryParam } = this.state
    const { type } = articleQueryParam
    // 跳转到分类或标签页面
    const typeArray = ['category', 'label']
    if (typeArray.indexOf(type) !== -1) {
      window.location.href = `/${type}`
    }
  }

  /** 查询父级 */
  queryParent() {
    const { articleQueryParam } = this.state
    const { type, parentName, parentId } = articleQueryParam
    const newArticleQueryParam = {
      type,
      name: parentName,
      parentName: '',
      id: parentId,
      parentId: '',
    }
    localStorage.setItem('articleQueryParam', JSON.stringify(newArticleQueryParam))
    // 跳转到文章查询页面
    window.location.href = `/articleQuery?type=1&id=${parentId}`
  }

  changePage = (currentPage) => {
    const { articleQueryParam } = this.state
    const { type, id } = articleQueryParam
    const newType = type === 'category' ? 1 : 2
    if (currentPage ===1 ) {
      window.location.href = `/articleQuery?type=${newType}&id=${id}`
    } else {
      window.location.href = `/articleQuery?type=${newType}&id=${id}&page_no=${currentPage}`
    }
  }

  render() {
    const { articleList: { list, count=0 } } = this.props
    const { articleQueryParam, currentPage, pageSize } = this.state
    const { type, name, parentName } = articleQueryParam || {}
    const typeName = type === 'category' ? '分类' : '标签'
    return (
      <div className="category">
        <div className="category card">
          <span
            className="link"
            onClick={() => this.jumpTo()}
          >
            {typeName}
          </span>
          <span className="oblique-line"> {' / '}</span>
          {
            parentName
              ? <span
                className="link"
                onClick={() => this.queryParent()}
              >
                {parentName}
              </span>
              : null
          }
          { parentName ? <span className="oblique-line">{' / '}</span> : null }
          <span> {name} </span>
        </div>
        {list && list.length === 0
          ? (<div className="no-article card"> <Empty/> </div>)
          : (<div className="article">
            <List
              className="card"
              itemLayout="vertical"
              size="large"
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <span key={1}> {item.create_time} </span>,
                    <span key={2} onClick={() => this.query('category', item)}>
                      {item.parent_category_name ? `${item.parent_category_name}/${item.category_name}` : item.category_name}
                    </span>,
                    <span key={3}> 阅读约 { Math.ceil(item.word_number/400)} 分钟</span>,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={`/articleDetail?id=${item.id}`}>{item.title}</a>}
                    description={null}
                  />
                  {item.content}
                </List.Item>
              )}
            />
            <div className="pagination">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={count}
                onChange={this.changePage}
              />
            </div>
          </div>)
        }
      </div>
    )
  }
}

ArticleQuery.loadData = (store, param) => {
  const { type, id, page_no=1 } = param
  let key = 'category_id'
  if (type ==='2') {
    key = 'label_ids'
  }
  const newParam = {
    [key]: id,
    page_no,
    page_size: 5,
  }
  return [
    store.dispatch(getAclStat()),
    store.dispatch(getArticleList(newParam)),
  ]
}

export default ArticleQuery
