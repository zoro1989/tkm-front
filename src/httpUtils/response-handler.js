import errorMessage from './error-message'
export default {
  success: function (success, fail, makeData) {
    return function (response) {
      console.log('request network success')
      console.log(response)
      try {
        let data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        if (data.resultCode === 100) {
          console.log('success')
          success && success(makeData ? makeData(data) : data)
        } else if (data.resultCode === 101) {
          this.$router.replace('login')
        } else if (data.resultCode === 102) {
          this.$router.replace('first')
        } else if (data.resultCode === 103) {
          this.$router.replace('first')
        } else {
          console.log('fail')
          fail && fail(data.errorMessage || errorMessage[data.resultCode] || '未定义错误消息' + data.resultCode, data.resultCode)
        }
      } catch (e) {
        console.log('JSON解析异常')
        console.log(response)
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
