import React from 'react'
import { Tooltip, Empty } from 'antd'
import { connect } from 'react-redux'
import { getLabelStat } from '@modules/label'
import withStyle, { antdStyle } from '../../withStyle'

import style from './Label.less'


@withStyle(style, ...antdStyle('tooltip', 'empty'))
@connect(
  state => ({
    labelStat: state.label.labelStat,
  }), {
    getLabelStat,
  }
)


class Label extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tipsVisible: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userList !== state.userList) {
      return { userList: props.userList }
    }

    return null
  }

  componentDidMount() {
    // tips隐显控制
    const tipsVisible = []
    const haveLabel = document.getElementById('have-label')
    if (haveLabel) {
      const spanArr = haveLabel.getElementsByClassName('label-name')
      for (let i=0; i<spanArr.length; i++) {
        tipsVisible[i] = false
        if (spanArr[i].scrollWidth > spanArr[i].clientWidth) {
          // 显示省略号，内部字符长度超过宽度
          tipsVisible[i] = true
        }
      }
    }
    this.setState({ tipsVisible })
  }

  componentDidUpdate() {
    console.log('2')
  }

  /** 查询父级 */
  query(item) {
    let articleQueryParam = {}
    const type = 2
    const id = item.id
    articleQueryParam = {
      type: 'label',
      name: item.name,
      parentName: item.pname,
      id: item.id,
      parentId: item.pid,
    }
    localStorage.setItem('articleQueryParam', JSON.stringify(articleQueryParam))

    // 跳转到文章查询页面
    window.location.href = `/articleQuery?type=${type}&id=${id}`
  }

  render() {
    const { labelStat } = this.props
    const { tipsVisible } = this.state

    return (
      <div className="label card">
        {labelStat.length === 0
          ? (<div className="no-label"> <Empty /> </div>)
          : (<>
            <div className="title">标签</div>
            <div className="have-label" id="have-label">
              {labelStat.map((item, index) => {
                return (
                  <div key={item.name} className="label-item">
                    <a onClick={() => this.query(item)}>
                      <Tooltip
                        placement="bottom"
                        title={tipsVisible[index] ? item.name : null}
                        overlayClassName="link-tip"
                      >
                        <span className="label-name">{item.name}</span>
                      </Tooltip>
                      <span className="label-num">{item.article_number}</span>
                    </a>
                  </div>
                )
              })}
            </div>
          </>
          )}
      </div>
    )
  }
}

Label.loadData = (store, param={}) => {
  return [
    store.dispatch(getLabelStat(param)),
  ]
}

export default Label
