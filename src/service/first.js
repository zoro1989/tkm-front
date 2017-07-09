import httpHandler from 'httpUtils/http-handler'
export default {
  get (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    httpHandler.get('/welcome/userinfo.tkm', {}, success, fail, makeData)
  },
  logout (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    httpHandler.get('/user/logout.tkm', {}, success, fail, makeData)
  }
}
