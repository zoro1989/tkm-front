import errorMessage from './error-message'
export default {
  success: function (success, fail, makeData) {
    console.log('success handler maked')
    return function (response) {
      console.log(response)
      console.log('request network success')
      let data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
      if (data.resultCode === 100) {
        console.log('success')
        success && success(makeData ? makeData(data) : data)
      } else {
        console.log('fail')
        fail && fail(data.errorMessage || errorMessage[data.resultCode] || '未定义错误消息' + data.resultCode, data.resultCode)
      }
    }
  },
  error: function (error) {
    return function () {
      console.log('net error')
      error && error('网络错误')
    }
  }
}
