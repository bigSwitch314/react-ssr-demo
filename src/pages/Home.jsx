
import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { getHomeList } from '../modules/home'
import withStyle from '../withStyle'

import style from './home.less'
// import  'antd/lib/input/style/css';

const menuCodes = {
  首页: '001',
  登录: '002',
}

@withStyle(style)
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

    return (
     <div className={style.bk}>
        {list&& list.map(item => <div key={item.id}>{item.username}</div>)}
        hello world!
        <Input/>
      </div> 
    )
      
  }
}

Home.loadData = (store) => {
  // return store.dispatch(getHomeList())
}

export default Home