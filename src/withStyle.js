/**
 * 函数返回组件
 * 第一个参数是需要装饰的组件
 * 第二个参数是styles对象
 */

import React, { Component } from 'react';

export default (...styles) => {
  return (DecoratedComponent) => {
    return class NewComponent extends Component {
        componentWillMount() {
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
