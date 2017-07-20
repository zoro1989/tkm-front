import errorMessage from './error-message'
import EventBus from 'utilities/event-bus'
export default {
  success: function (success, fail, makeData, vm) {
    return (response) => {
      console.log('request network success')
      console.log(response)
      try {
        let data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        if (data.resultCode === 100) {
          console.log('success')
          success && success(makeData ? makeData(data) : data)
        } else if (data.resultCode === 101) {
          EventBus.backUrl = vm.$route.path
          vm.$router.replace('login')
        } else if (data.resultCode === 102) {
          vm.$router.replace('member-list')
        } else if (data.resultCode === 103) {
          vm.$router.replace('member-list')
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
    return (err) => {
      console.log(err)
      error && error(err)
    }
  }
}
