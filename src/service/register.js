import responseHandler from 'httpUtils/response-handler'
export default {
  submitRegister (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    this.$http.post('/user/subRegister.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  changeVCode (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    this.$http.get('/common/getVCode.tkm')
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
