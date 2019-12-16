import React from 'react'
import { List, Avatar, Icon } from 'antd'
import withStyle from '../../withStyle'

const testData = []
import style0 from './Label.less'
import style1 from 'antd/lib/list/style/index.css'
import style2 from 'antd/lib/avatar/style/index.css'
import style3 from 'antd/lib/icon/style/index.css'

@withStyle(style0, style1, style2, style3)
class Label extends React.Component {
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
  }

  render() {
    const { articleList } = this.state
    return (
      <div className="home">
        {articleList.length === 0
          ? (<div className="no-article">还未添加标签哦～</div>)
          : (articleList)}
      </div>
    )
  }
}

export default Label
