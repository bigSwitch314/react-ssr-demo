import React from 'react'
import { Empty } from 'antd'
import { getAclStat } from '@modules/article'
import withStyle, { antdStyle } from '../../withStyle'

const testData = []
import style from './About.less'

@withStyle(style, ...antdStyle('empty'))
class About extends React.Component {
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
          ? (<div className="no-article card"><Empty /></div>)
          : (articleList)}
      </div>
    )
  }
}

About.loadData = (store) => {
  return [
    store.dispatch(getAclStat({})),
  ]
}

export default About
