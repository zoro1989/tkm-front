import responseHandler from 'httpUtils/response-handler'
export default {
  get (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    this.$http.get('/welcome/userinfo.tkm')
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  logout (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    this.$http.get('/user/logout.tkm')
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
