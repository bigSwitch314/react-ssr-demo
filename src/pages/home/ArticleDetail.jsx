import React from 'react'
import { connect } from 'react-redux'
import withStyle, { antdStyle } from '../../withStyle'
import { getArticleDetail } from '@modules/article'
import marked from '@components/markdown/helpers/marked'
import handleCode from '@components/markdown/helpers/handelCode'
import style from './ArticleDetail.less'
import highlightSty from 'highlight.js/styles/tomorrow.css'
import markdownSty from '@components/markdown/editor/index.less';


const getQueryStringArgs = (search) => {
  const pairs = search.slice(1).split('&')
  const result = {}
  pairs.forEach((pair) => {
    if (pair && pair.indexOf('=') !== -1) {
      pair = pair.split('=')
      // 兼容写法
      result[pair[0]] = result[
        pair[0].toLocaleLowerCase()
      ] = decodeURIComponent(pair[1] || '')
    }
  })

  return JSON.parse(JSON.stringify(result))
}


@withStyle(style, highlightSty, markdownSty, ...antdStyle('list'))
@connect(
  state => ({
    articleDetail: state.article.articleDetail,
  }), {
    getArticleDetail,
  }
)

class ArticleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articleDetail: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userList !== state.userList) {
      return { userList: props.userList }
    }

    return null
  }

  componentDidMount() {
    const { articleDetail } = this.props
    if (Object.keys(articleDetail).length === 0) {
      this.getArticleDetail()
    }
  }

  getArticleDetail() {
    const { location: { search=''}} = this.props.history
    const param = getQueryStringArgs(search)
    this.props.getArticleDetail(param)
  }

  /** 查询父级 */
  query() {
    const { category_id, parent_category_id, category_name, parent_category_name } = this.props.articleDetail
    const articleQueryParam = {
      type: 'category',
      name: category_name,
      parentName: parent_category_name,
      id: category_id,
      parentId: parent_category_id,
    }
    localStorage.setItem('articleQueryParam', JSON.stringify(articleQueryParam))
    // 跳转到文章查询页面
    window.location.href = '/articleQuery'
  }

  render() {
    const { content_md, title, parent_category_name, category_name } = this.props.articleDetail

    return (
      <div className="article-detial">
        <div className="title">{title}</div>
        <div className="metadata">
          <span className="block">前3天</span>
          <span className="block link" onClick={() => this.query()}>
            {parent_category_name ? `${parent_category_name}/${category_name}` : category_name}
          </span>
          <span className="block">阅读约4分钟</span>
        </div>
        <div
          className="for-preview for-markdown-preview"
          dangerouslySetInnerHTML={{ __html: handleCode(marked(content_md)) }}
        />
      </div>
    )
  }
}

ArticleDetail.loadData = (store, param={}) => {
  console.log('getArticleDetail----11111111-------', param.id)
  return store.dispatch(getArticleDetail(param))
}

export default ArticleDetail
