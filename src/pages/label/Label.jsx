import React from 'react'
// import { List, Avatar, Icon } from 'antd'
import withStyle from '../../withStyle'

const testData = [
  {name: 'algorithm', num: 4, url: '' },
  {name: 'android', num: 12, url: '' },
  {name: 'backend', num: 152, url: ''},
  {name: 'algorithm', num: 4, url: '' },
  {name: 'android', num: 12, url: '' },
  {name: 'backend', num: 152, url: ''},
  {name: 'algorithm', num: 4, url: '' },
  {name: 'android', num: 12, url: '' },
  {name: 'backend', num: 152, url: ''},
  {name: 'algorithm', num: 4, url: '' },
  {name: 'android', num: 12, url: '' },
  {name: 'backend', num: 152, url: ''},
]
import style0 from './Label.less'
import style1 from 'antd/lib/list/style/index.css'
import style2 from 'antd/lib/avatar/style/index.css'
import style3 from 'antd/lib/icon/style/index.css'

@withStyle(style0, style1, style2, style3)
class Label extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labelList: [],
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
      labelList: testData,
    })
  }

  render() {
    const { labelList } = this.state
    return (
      <div className="label card">
        <div className="title">标签</div>
        {labelList.length === 0
          ? (<div className="no-label">还未添加标签哦～</div>)
          : (<div className="have-label">
            {labelList.map((item)=>{
              return (
                <div key={item.name} className="label-item">
                  <a>
                    <span className="label-name">{item.name}</span>
                    <span className="label-num">{item.num}</span>
                  </a>
                </div>
              )
            })}
          </div>)}
      </div>
    )
  }
}

export default Label
