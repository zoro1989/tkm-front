import httpHandler from 'httpUtils/http-handler'
export default {
  submitLogin (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post('/user/submitLogin.tkm', formData, success, fail, makeData)
  }
}
