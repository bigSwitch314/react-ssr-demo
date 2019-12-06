
import React from 'react'
import { connect } from 'react-redux'
import { getHomeList } from '../modules/home'

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
        hello world!556699
      </div> 
    )
      
  }
}

Home.loadData = (store) => {
  // return store.dispatch(getHomeList())
}

export default Home