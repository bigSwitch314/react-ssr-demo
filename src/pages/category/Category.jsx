import React from 'react'
// import { List, Avatar, Icon } from 'antd'
import { connect } from 'react-redux'
import { getCategoryStat } from '@modules/category'
import withStyle from '../../withStyle'
import style from './Category.less'


@withStyle(style)
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

  render() {
    const { categoryStat } = this.props
    return (
      <div className="category card">
        <div className="title">分类</div>
        {categoryStat.length === 0
          ? (<div className="no-category">还未添加分类哦～</div>)
          : (<ul className="have-category">
            {categoryStat.map((item)=>{
              return(
                <li key={item.name}>
                  <a className="category-item">
                    <span className="category-name">{item.name}</span>
                    <span className="category-num">{item.article_number}</span>
                  </a>
                  {item.children.length===0
                    ? (null)
                    : (<ul className="sub-category">
                      {item.children.map((bitem)=>{
                        return(
                          <li key={bitem.name}>
                            <a className="category-item">
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
          </ul>)}
      </div>
    )
  }
}

Category.loadData = (store, param={}) => {
  return store.dispatch(getCategoryStat(param))
}

export default Category
