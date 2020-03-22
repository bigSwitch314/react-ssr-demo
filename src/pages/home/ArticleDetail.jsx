import React from 'react'
import { connect } from 'react-redux'
import withStyle, { antdStyle } from '../../withStyle'
import { getArticleDetail } from '@modules/article'
import marked from '@components/markdown/helpers/marked'
import handleCode from '@components/markdown/helpers/handelCode'
import tranformToDirectory from '@components/markdown/helpers/tranformToDirectory'
import { arrowRightSmall, arrowLeftSmall } from '@assets/svg/path'
import style from './ArticleDetail.less'
import highlightSty from 'highlight.js/styles/tomorrow.css'
import markdownSty from '@components/markdown/editor/index.less';

@withStyle(style, highlightSty, markdownSty, ...antdStyle('list'))
@connect(
  state => ({
    articleDetail: state.article.articleDetail,
  })
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
    const html = handleCode(marked(articleDetail.content_md))
    const { directory, ids } = tranformToDirectory(html)
    this.props.dispatch({ type: 'article/articleDirectory', payload: directory })

    // 滚动事件
    const offsetTop = []
    for (let i=0; i < ids.length; i++) {
      const e = document.getElementById(ids[i])
      offsetTop.push(e.offsetTop)
    }
    window.addEventListener('scroll', function () {
      const scrollTop = document.body.scrollTop + 10
      let id = null
      for (let i=0; i < ids.length; i++) {
        if (offsetTop[i] < scrollTop && scrollTop < offsetTop[i+1]) {
          id = ids[i]
          break
        }
        if (i === (ids.length - 1) && offsetTop[i] < scrollTop) {
          id = ids[i]
        }
      }

      const a = document.getElementById('article-directory').getElementsByTagName('a')
      for (let i=0; i < a.length; i++) {
        if (id ===a[i].text) {
          a[i].style.color='red'
        } else {
          a[i].style.color='#6c757d'
        }
      }
    })

  }

  /** 查询父级 */
  query(label=null) {
    const { category_id, parent_category_id, category_name, parent_category_name, label_ids, label_names } = this.props.articleDetail
    let articleQueryParam = {}
    let type = 1
    let id = category_id
    if (label === null) {
      articleQueryParam = {
        type: 'category',
        name: category_name,
        parentName: parent_category_name,
        id: category_id,
        parentId: parent_category_id,
      }
    } else {
      const index = label_names.split(',').indexOf(label)
      articleQueryParam = {
        type: 'label',
        name: label,
        parentName: '',
        id: label_ids[index],
        parentId: '',
      }
      id = label_ids[index]
      type = 2
    }
    localStorage.setItem('articleQueryParam', JSON.stringify(articleQueryParam))

    // 跳转到文章查询页面
    window.location.href = `/articleQuery?type=${type}&id=${id}`
  }

  setSvgColor(type, index) {
    const e = window.document.getElementsByClassName('path')
    if (e.length === 1) index = 0
    e[index].style.fill = type === 'over' ? '#1890ff' : '#4a4a4a'
  }

  jumptoDetail(id) {
    window.location.href = `/articleDetail?id=${id}`
  }

  render() {
    const { content_md, title, parent_category_name, category_name, label_names, pre, next } = this.props.articleDetail

    return (
      <div className="article-detial">
        <div className="article">
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
          <div className="label">
            { label_names ? '# ' : null }
            { label_names
              ? (label_names.split(',').map((item, key)=> (
                <span
                  key={key}
                  className="item"
                  style={{ marginRight: 2 }}
                  onClick={() =>this.query(item)}
                >
                  {item}
                  {label_names.split(',').length !== (key +1) ? ',' : null}
                </span>
              )))
              : null
            }
          </div>
        </div>
        <div className="pre-next  ">
          { pre
            ? <div
              style={{ float: 'left' }}
              onMouseOver={() => this.setSvgColor('over', 0)}
              onMouseOut={() => this.setSvgColor('out', 0)}
            >
              <svg viewBox="0 0 1024 1024" width="20" height="20">
                <path d={arrowLeftSmall} className="path" />
              </svg>
              <span
                className="left-title"
                onClick={() => this.jumptoDetail(pre.id)}
              >
                {pre.title}
              </span>
            </div>
            : null
          }
          { next
            ? <div
              style={{ float: 'right' }}
              onMouseOver={() => this.setSvgColor('over', 1)}
              onMouseOut={() => this.setSvgColor('out', 1)}
            >
              <span
                className="right-title"
                onClick={() => this.jumptoDetail(next.id)}
              >
                {next.title}
              </span>
              <svg viewBox="0 0 1024 1024" width="20" height="20">
                <path d={arrowRightSmall} className="path"/>
              </svg>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

ArticleDetail.loadData = (store, param={}) => {
  console.log('getArticleDetail----11111111-------', param.id)
  return store.dispatch(getArticleDetail(param))
}

export default ArticleDetail