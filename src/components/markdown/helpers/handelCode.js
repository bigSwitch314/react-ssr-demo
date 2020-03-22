/* eslint-disable */
function handleCode(str) {
  if (!str) return ''

  str = str.replace(/\n/g, '!@#')
  let newStr = ''
  newStr = str.replace(/<code(.*?)>(.+?)<\/code>/g, (v, $1, $2) => {
    const code = [];
    const gutter = [];
    const arr = ($2).split('!@#')
    arr.forEach((item, index)=> {
      code.push('<div class="line">' + '&nbsp;' + item + '</div>');
      gutter.push('<div class="line">' + ++index + '</div>');
    });

    return '<code>' +
              '<table style="background:#f7f7f7;width:100%">' +
                  '<tr style="border: none">'+
                    '<td style="border:none; background-color: #eff2f3; text-align: center; width: 24px">' +
                      gutter.join('') +
                    '</td>'+
                    '<td style="border: none; background-color: #f8f8f8;">' +
                      code.join('') +
                    '</td>'+
                  '</tr>'+
              '</table>'+
            '</code>'
  })
  const pattern = /<h([1-4]) id=[^<]*>(.*?)<\/h([1-4])>/g
  const place = "<h$1 id=\"$2\">$2<\/h$3>"
  str = str.replace(pattern, place)
  newStr = newStr.replace(/!@#/g, '\n')
  // 标题插入id，用于描点
  const pattern2 = /<h([1-4]) id=[^<]*>(.*?)<\/h([1-4])>/g
  const place2 = "<h$1 id=\"$2\">$2<\/h$3>"
  return newStr.replace(pattern2, place2)
}

export default handleCode