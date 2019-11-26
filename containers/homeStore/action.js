import axios from 'axios'

//普通action
const changeList = list => ({
  type: 'change_list',
  list
})

//异步操作的action(采用thunk中间件)
export const getHomeList = () => {
  return (dispatch) => {
    axios.get('http://39.108.60.163:443/blog/admin/get?page_no=1&page_size=5')
    .then((res) => {
      const result = res.data.data
      dispatch(changeList(result.list))
    }).catch(error => {
      console.log(error)
    })
  }
}