import React from 'react'
import { connect } from 'react-redux'
import withStyle, { antdStyle } from '../../withStyle'
import style from './Home.less'
import { getArticleDetail } from '@modules/article'

@withStyle(style, ...antdStyle('list'))
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
    // this.getArticleDetail()
    console.log('history--------', this.props.history)
    const { articleDetail } = this.props
    console.log('articleDetail------', articleDetail)
  }

  getArticleDetail() {
    // this.props.getArticleDetail()
  }

  render() {
    const { articleDetail: { content_md } } = this.props

    return (
      <div className="home">
        {content_md}
      </div>
    )
  }
}

ArticleDetail.loadData = (store, param={}) => {
  console.log('getArticleDetail----11111111-------', param)
  return store.dispatch(getArticleDetail(param))
}

export default ArticleDetail
