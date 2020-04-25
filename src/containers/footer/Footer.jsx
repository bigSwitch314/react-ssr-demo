import React from 'react'
// import { Icon, Avatar } from 'antd'
import withStyle from '../../withStyle'
import style from './Footer.less'


@withStyle(style)
class Footer extends React.Component {
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

  render() {
    return (
      <div className="footer">
        <div>
          <span>Copyright © 2018 — 2019 luoqiang</span>
          <span>当前呈现版本 19.02.27</span>
        </div>
        <div>
          <span>渝ICP备 14062481号-1</span>
          <span>本站内容采用 CC 4.0  许可协议</span>
          <span>由博客之家强力驱动</span>
        </div>
      </div>
    )
  }
}

export default Footer
