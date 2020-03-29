import React from 'react'
import { Tooltip } from 'antd'
import { connect } from 'react-redux'
import { getLabelStat } from '@modules/label'
import withStyle, { antdStyle } from '../../withStyle'

import style from './Label.less'


@withStyle(style, ...antdStyle('tooltip'))
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
      const divArr = haveLabel.getElementsByClassName('label-name')
      for (let i=0; i<divArr.length; i++) {
        tipsVisible[i] = false
        if (divArr[i].scrollWidth > divArr[i].clientWidth) {
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

  render() {
    const { labelStat } = this.props
    const { tipsVisible } = this.state

    return (
      <div className="label card">
        <div className="title">标签</div>
        {labelStat.length === 0
          ? (<div className="no-label">还未添加标签哦～</div>)
          : (<div className="have-label" id="have-label">
            {labelStat.map((item, index)=>{
              return (
                <div key={item.name} className="label-item">
                  <a>
                    <Tooltip
                      placement="bottom"
                      title={tipsVisible[index] ? item.name: null}
                      overlayClassName="link-tip"
                    >
                      <span className="label-name">{item.name}</span>
                    </Tooltip>
                    <span className="label-num">{item.article_number}</span>
                  </a>
                </div>
              )
            })}
          </div>)}
      </div>
    )
  }
}

Label.loadData = (store, param={}) => {
  return store.dispatch(getLabelStat(param))
}

export default Label
