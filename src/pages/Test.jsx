import React from 'react'
// import { Button } from 'antd'
import { chunk, compact } from 'lodash'
import { format, getTime } from 'date-fns'
import './Home.less'
import './Test.css'

const rcViewerOptions={
  title: 0,
  toolbar: {
    zoomIn: 1,
    zoomOut: 1,
    oneToOne: 0,
    reset: 0,
    prev: 0,
    play: 0,
    next: 0,
    rotateLeft: 1,
    rotateRight: 1,
    flipHorizontal: 1,
    flipVertical: 1},
}


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.test !== state.test) {
      return { test: props.test }
    }

    return null
  }

  componentDidMount() {
    const arr = [0, 1, 2, 4, 6, 8]
    console.log('chunk---------', chunk(arr, 2))
    console.log('compact---------', compact(arr))

    const a = format(new Date(2014, 1, 11), 'YYYY-MM-DD')
    console.log('format---------', a)
    const b = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
    console.log('getTime----------------------', b)
    // function3822()
    // const aa3q = 0
  }

  render() {
    return (
      <div>
        <h3>图片缩放测试</h3>
      </div>
    )
  }
}

export default Home