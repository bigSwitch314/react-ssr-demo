import React from 'react'
// import { List, Avatar, Icon } from 'antd'
import { connect } from 'react-redux'
import { getLabelStat } from '@modules/label'
import withStyle from '../../withStyle'
import style from './Label.less'


@withStyle(style)
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
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userList !== state.userList) {
      return { userList: props.userList }
    }

    return null
  }

  componentDidMount() {
  }

  render() {
    const { labelStat } = this.props
    return (
      <div className="label card">
        <div className="title">标签</div>
        {labelStat.length === 0
          ? (<div className="no-label">还未添加标签哦～</div>)
          : (<div className="have-label">
            {labelStat.map((item)=>{
              return (
                <div key={item.name} className="label-item">
                  <a>
                    <span className="label-name">{item.name}</span>
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
