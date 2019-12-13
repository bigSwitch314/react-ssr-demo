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
              this.props.staticContext.css.push(style._getCss())
            })
          }
        }

        render() {
          return <DecoratedComponent {...this.props} />
        }
      }
  }
}

// import React from 'react';

// //使用高阶组件进行组件的样式添加
// const withStyle = (OriginCom, style) => {
//     return  (props) =>{
//         if(props.staticContext) {
//             props.staticContext.style.push(style._getCss());
//         }
//         return(<OriginCom {...props}/>)
//     }
// }
// export default withStyle;