export default function transformToDirectory(str) {
  const pattern = /<h([1-4]) id="([^<]*)">(.*?)<\/h([1-4])>/g
  let result
  const arr = []
  const ids = []
  while ((result = pattern.exec(str)) !== null) {
    arr.push({level: result[1], name: result[3], id: result[2]})
    ids.push(result[2])
  }

  if (arr.length === 0) return ''
  const directory = treeToDirectory(arrToTree(arr))
  return { directory, ids }
}

function arrToTree(arr) {
  const newArr =[arr[0]]
  let currentLevel = arr[0].level
  let currentIndex = 0
  arr.forEach((item, index )=> {
    if (index === 0) return
    if (item.level > currentLevel) {
      if (!Array.isArray(newArr[currentIndex].child)) {
        newArr[currentIndex] = Object.assign(newArr[currentIndex], {child: []})
      }
      newArr[currentIndex].child.push(item)
    } else {
      currentIndex = currentIndex+1
      currentLevel = item.level
      newArr[currentIndex] = item
    }
  })

  newArr.forEach(item => {
    if (item.child && item.child.length > 1) {
      item.child = arrToTree(item.child)
    }
  })

  return newArr
}

// 树形数据转化为ul li格式
function treeToDirectory(data) {
  let menu_body = '<ul>'
  for (let i = 0; i < data.length; i++) {
    menu_body += '<li ><a href="#' + data[i].id + '">' + data[i].name + '</a>';
    if(data[i].child && data[i].child.length > 0) {
      menu_body += treeToDirectory(data[i].child)
    }
    menu_body += '</li>'
  }
  menu_body += '</ul>'

  return menu_body
}