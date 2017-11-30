import errorMessage from './error-message'
import EventBus from 'utilities/event-bus'
export default {
  success: function (success, fail, makeData, vm) {
    return (response) => {
      try {
        let data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        if (data.code === 200) {
          success && success(makeData ? makeData(data) : data)
        } else if (data.code === 101) {
          EventBus.backUrl = vm.$route.path
          vm.$router.replace('login')
        } else if (data.code === 102) {
          vm.$router.replace('member-list')
        } else if (data.code === 103) {
          vm.$router.replace('member-list')
        } else {
          console.log('fail')
          fail && fail(data.errorMessage || errorMessage[data.code] || '未定义错误消息' + data.code, data.code)
        }
      } catch (e) {
        console.log('JSON解析异常')
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
