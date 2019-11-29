
import React from 'react'
import { connect } from 'react-redux'
import { getHomeList, getData } from './homeStore/action'


class Home extends React.Component {

  componentDidMount() {
    // this.props.getHomeList()
  }

  render() {
    const { list } = this.props
    return list.map(item => <div key={item.id}>{item.username}</div>)
  }
}

const mapStateToProps = state => ({
  list: state.home.list,
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

//连接store
const newHome = connect(mapStateToProps, mapDispatchToProps)(Home)

newHome.loadData = (store) => {
  return store.dispatch(getHomeList())
}

export default newHome