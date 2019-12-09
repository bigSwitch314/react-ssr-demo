
import React from 'react'
import { connect } from 'react-redux'
// import { Input } from 'antd'
import { getHomeList } from '../modules/home'
import getRoutesData from '../router/getRoutes'
import { getMenus, getRoutes, getParentKey, getCurrentRoute } from '../router/utils'

const menuCodes = {
  首页: '001',
  登录: '002',
}

@connect(
  state => ({
    homeList: state.home.homeList,
  }), 
  {
    getHomeList,
  }
)

class Home extends React.Component {

  componentDidMount() {
    this.props.getHomeList() 
  }

  render() {
    const { homeList } = this.props
    const { list=[] } = homeList

    console.log('list----------------------', list)
    return (
     <div>
        {list&& list.map(item => <div key={item.id}>{item.username}</div>)}
        hello world!9999
        {/* <Input/> */}
      </div> 
    )
      
  }
}

Home.loadData = (store) => {
  // return store.dispatch(getHomeList())
}

export default Home