import responseHandler from 'httpUtils/response-handler'
export default {
  submitLogin (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    this.$http.post('/user/submitLogin.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
