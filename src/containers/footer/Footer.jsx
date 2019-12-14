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
          <span>© 2018 — 2019</span>
          <span style={{ margin: 3 }}>
            <i className="iconfont icon-user logo"/>
          </span>
          <span>luoqiang</span>
        </div>
        <div>
          <span>由PHP+Mysql强力驱动</span>
          <span style={{ margin: 3 }}>|</span>
          <span>主题 — NexT.Mist v5.1.3</span>
        </div>
        <div>
          <span>渝ICP备14062481号-1</span>
        </div>
        <div>
          <span style={{ marginRight: 6 }}>
            <i className="iconfont icon-user logo" />
          </span>
          <span>1234</span>
          <span style={{ margin: 14 }}>|</span>
          <span style={{ marginRight: 6 }}>
            <i className="iconfont icon-eye logo" />
          </span>
          <span>2234</span>
        </div>
      </div>
    )
  }
}

export default Footer
