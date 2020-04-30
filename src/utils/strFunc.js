export function getStrLength(str){
  let realLength = 0
  const len = str.length
  let charCode = -1
  for(let i = 0; i < len; i++){
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    }else{
      // 如果是中文则长度加2
      realLength += 2
    }
  }
  return realLength
}

export function countTextReadTime(text) {
  // 计算文章内容字符数
  const content_num = text.replace(/\s/g, '').length
  // 阅读速度平均为（300～500）字／分钟, 一般取400
  const content_min=Math.ceil(content_num/400)
  return content_min
}