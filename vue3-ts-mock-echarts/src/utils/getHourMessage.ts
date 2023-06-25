// 封装获取当时间判断上午还是下午还是晚上
export function getTimeMessage() {
  const hour = new Date().getHours()
  if (hour <= 10) {
    return '早上好'
  } else if (hour <= 13) {
    return '中午好'
  } else if (hour <= 17) {
    return '下午好'
  } else {
    return '晚上好'
  }
}
