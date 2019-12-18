/**
 * 函数返回组件
 * 第一个参数是需要装饰的组件
 * 第二个参数是styles对象
 */

import React, { Component } from 'react';

/** 样式装饰器 */
export default (...styles) => {
  return (DecoratedComponent) => {
    return class NewComponent extends Component {
      UNSAFE_componentWillMount () {
        if (this.props.staticContext) {
          styles && styles.forEach(style => {
            this.props.staticContext.css.unshift(style._getCss())
          })
        }
      }
      render() {
        return <DecoratedComponent {...this.props} />
      }
    }
  }
}

/** 导入antd组件样式 */
export function antdStyle(...antd) {
  const styles = []
  antd && antd.forEach(item => {
    const style = require(`antd/lib/${item}/style/index.css`)
    styles.push(style)
  })
  return styles
}
