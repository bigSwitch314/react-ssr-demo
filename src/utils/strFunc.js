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