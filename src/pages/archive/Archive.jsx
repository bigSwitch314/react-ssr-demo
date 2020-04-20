import React from 'react'
import { Pagination, Empty, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { getArchive } from '@modules/archive'
import { getAclStat } from '@modules/article'
import { getQueryStringArgs } from '@utils/urlParse'
import withStyle, { antdStyle } from '../../withStyle'

import style from './Archive.less'

@withStyle(style, ...antdStyle('pagination', 'empty', 'skeleton'))
@connect(
  state => ({
    archive: state.archive.archive,
    loading: state.loading['archive/getArchive'],
  })
)

class Archive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      pageSize: 5,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userList !== state.userList) {
      return { userList: props.userList }
    }

    return null
  }

  componentDidMount() {
    const search = window.location.search
    const { page_no=1 } = getQueryStringArgs(search) || {}
    this.setState({ currentPage: Number(page_no)})
  }

  changePage = (currentPage) => {
    if (currentPage ===1 ) {
      window.location.href = '/archive'
    } else {
      window.location.href = `/archive?page_no=${currentPage}`
    }
  }

  render() {
    const { currentPage, pageSize } = this.state
    const { archive: { list=[], count=0 }, loading } = this.props
    return (
      <div className="archive">
        {list.length === 0
          ? (<div className="no-archive card">
            { loading === undefined ? <Skeleton active /> : <Empty /> }
          </div>)
          : (<div className="have-archive">
            {list.map((item)=>{
              return(
                <div className="card" key={item.year}>
                  <div className="year">{item.year}</div>
                  <div className="timeline">
                    {item.list.map((bitem)=>{
                      return(
                        <div className="article" key={bitem.id}>
                          <div className="article-time">{bitem.year+'-'+bitem.date}</div>
                          <div className="article-title"><a href={`/articleDetail?id=${bitem.id}`}>{bitem.title}</a></div>
                          <div className="article-meta">{bitem.category}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <Pagination
              className="pagination"
              current={currentPage}
              pageSize={pageSize}
              total={count}
              onChange={this.changePage}
            />
          </div>)}
      </div>
    )
  }
}

Archive.loadData = (store, param={}) => {
  const newParam = {
    page_no: param.page_no || 1,
    page_size: 5,
  }

  return [
    store.dispatch(getArchive(newParam)),
    store.dispatch(getAclStat({})),
  ]
}

export default Archive
