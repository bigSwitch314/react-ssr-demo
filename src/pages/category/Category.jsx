import React from 'react'
// import { List, Avatar, Icon } from 'antd'
import withStyle from '../../withStyle'

const testData = [
  {name: 'algorithm', num: 4, children: [] },
  {name: 'android', num: 12, children: [] },
  {name: 'backend', num: 152, children: [
    { name: 'cpp', num: 1, children: [] },
    { name: 'docker', num: 3, children: [] },
    { name: 'go', num: 18, children: [] },
    { name: 'java', num: 7, children: [] },
    { name: 'linux', num: 8, children: [] },
  ]},
]
import style0 from './Category.less'
import style1 from 'antd/lib/list/style/index.css'
import style2 from 'antd/lib/avatar/style/index.css'
import style3 from 'antd/lib/icon/style/index.css'

@withStyle(style0, style1, style2, style3)
class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
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
      categoryList: testData,
    })
  }

  render() {
    const { categoryList } = this.state
    return (
      <div className="category">
        <div className="title">分类</div>
        {categoryList.length === 0
          ? (<div className="no-category">还未添加分类哦～</div>)
          : (<ul className="have-category">
            {categoryList.map((item)=>{
              return(
                <li key={item.name}>
                  <a className="category-item">
                    <span className="category-name">{item.name}</span>
                    <span className="category-num">{item.num}</span>
                  </a>
                  {item.children.length===0
                    ? (null)
                    : (<ul className="sub-category">
                      {item.children.map((bitem)=>{
                        return(
                          <li key={bitem.name}>
                            <a className="category-item">
                              <span className="category-name">{bitem.name}</span>
                              <span className="category-num">{bitem.num}</span>
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

export default Category
