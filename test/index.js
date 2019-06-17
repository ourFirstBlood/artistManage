console.log(new Date())
console.log(formatTime(new Date(), 'YYYY-MM-DD HH:mm:ss'))

function formatTime(dateObj, fmt) {
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': dateObj.getMonth() + 1 + '',
    'D+': dateObj.getDate() + '',
    'H+': dateObj.getHours() + '',
    'm+': dateObj.getMinutes() + '',
    's+': dateObj.getSeconds() + ''
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : addZero(o[k])
      )
    }
  }
  function addZero(str) {
    return ('00' + str).substr(str.length)
  }
  return fmt
}
