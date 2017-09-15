import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.welcome.userinfo, {}, success, fail, makeData)
  },
  logout (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    httpHandler.get.bind(this)(uris.user.logout, {}, success, fail, makeData)
  }
}
