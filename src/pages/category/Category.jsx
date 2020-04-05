import React from 'react'
import { Empty } from 'antd'
import { connect } from 'react-redux'
import { getCategoryStat } from '@modules/category'
import withStyle, { antdStyle } from '../../withStyle'
import style from './Category.less'


@withStyle(style, ...antdStyle('empty'))
@connect(
  state => ({
    categoryStat: state.category.categoryStat,
  }), {
    getCategoryStat,
  }
)

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userList !== state.userList) {
      return { userList: props.userList }
    }

    return null
  }

  componentDidMount() {
  }

  /** 查询父级 */
  query(item) {
    let articleQueryParam = {}
    const type = 1
    const id = item.id
    articleQueryParam = {
      type: 'category',
      name: item.name,
      parentName: item.pname,
      id: item.id,
      parentId: item.pid,
    }
    localStorage.setItem('articleQueryParam', JSON.stringify(articleQueryParam))

    // 跳转到文章查询页面
    window.location.href = `/articleQuery?type=${type}&id=${id}`
  }

  render() {
    const { categoryStat } = this.props

    return (
      <div className="category card">
        {categoryStat.length === 0
          ? (<div className="no-category"> <Empty /> </div>)
          : (<>
            <div className="title">分类</div>
            <ul className="have-category">
              {categoryStat.map((item) => {
                return (
                  <li key={item.name}>
                    <a className="category-item" onClick={() => this.query(item)}>
                      <span className="category-name">{item.name}</span>
                      <span className="category-num">{item.article_number}</span>
                    </a>
                    {item.children.length === 0
                      ? (null)
                      : (<ul className="sub-category">
                        {item.children.map((bitem) => {
                          return (
                            <li key={bitem.name}>
                              <a className="category-item" onClick={() => this.query(bitem)}>
                                <span className="category-name">{bitem.name}</span>
                                <span className="category-num">{bitem.article_number}</span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>)}
                  </li>
                )
              })}
            </ul>
          </>
          )}
      </div>
    )
  }
}

Category.loadData = (store, param={}) => {
  return [
    store.dispatch(getCategoryStat(param)),
  ]
}

export default Category
