export function getQueryStringArgs(search) {
  const pairs = search.slice(1).split('&')
  const result = {}
  pairs.forEach(pair => {
    if (pair && pair.indexOf('=') !== -1) {
      pair = pair.split('=')
      // 兼容写法
      result[pair[0]] = result[
        pair[0].toLocaleLowerCase()
      ] = decodeURIComponent(pair[1] || '')
    }
  })

  return JSON.parse(JSON.stringify(result))
}