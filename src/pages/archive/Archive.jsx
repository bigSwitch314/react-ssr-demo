import React from 'react'
// import { List, Avatar, Icon } from 'antd'
import withStyle from '../../withStyle'

const testData = [
  {
    year: '2019',
    list: [
      {
        id: 54,
        title: '个人简介-罗强',
        category: 'BACKEND/JAVA',
        date: '01-01',
        year: '2019',
        isDisplayYear: 1,
      },
    ],
  },
  {
    year: '2018',
    list: [
      {
        id: 51,
        title: 'test8',
        category: 'BACKEND/JAVA',
        date: '12-30',
        year: '2018',
        isDisplayYear: 1,
      },
      {
        id: 50,
        title: 'test7',
        category: 'FRONTEND/JAVASCRIPT',
        date: '12-30',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 47,
        title: 'test4',
        category: 'FRONTEND/JAVASCRIPT',
        date: '12-30',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 46,
        title: 'test3',
        category: 'FRONTEND/JAVASCRIPT',
        date: '12-30',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 45,
        title: 'test2',
        category: 'FRONTEND/JAVASCRIPT',
        date: '12-30',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 44,
        title: 'test1',
        category: 'FRONTEND/JAVASCRIPT',
        date: '12-30',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 15,
        title: 'PHP7编译sphinx扩展',
        category: 'FRONTEND/JAVASCRIPT',
        date: '09-23',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 4,
        title: 'PHP实现“异步”',
        category: 'FRONTEND/JAVASCRIPT',
        date: '09-01',
        year: '2018',
        isDisplayYear: 0,
      },
      {
        id: 3,
        title: 'JS提取字符串中文英文数字',
        category: 'FRONTEND/JAVASCRIPT',
        date: '08-31',
        year: '2018',
        isDisplayYear: 0,
      },
    ],
  },
]
import style0 from './Archive.less'
import style1 from 'antd/lib/list/style/index.css'
import style2 from 'antd/lib/avatar/style/index.css'
import style3 from 'antd/lib/icon/style/index.css'

@withStyle(style0, style1, style2, style3)
class Archive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      archiveList: [],
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
      archiveList: testData,
    })
  }

  render() {
    const { archiveList } = this.state
    return (
      <div className="archive">
        {archiveList.length === 0
          ? (<div className="no-archive card">暂无归档数据哦～</div>)
          : (<div className="have-archive">
            {archiveList.map((item)=>{
              return(
                <div className="card" key={item.year}>
                  <div className="year">{item.year}</div>
                  <div className="timeline">
                    {item.list.map((bitem)=>{
                      return(
                        <div className="article" key={bitem.id}>
                          <div className="article-time">{bitem.year+'-'+bitem.date}</div>
                          <div className="article-title">{bitem.title}</div>
                          <div className="article-meta">{bitem.category}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>)}
      </div>
    )
  }
}

export default Archive
