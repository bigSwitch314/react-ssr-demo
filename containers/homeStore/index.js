import  reducer  from "./reducer"

//这么做是为了导出reducer让全局的store来进行合并
//那么在全局的store下的index.js中只需引入Home/store而不需要Home/store/reducer.js
//因为脚手架会自动识别文件夹下的index文件

export { reducer }