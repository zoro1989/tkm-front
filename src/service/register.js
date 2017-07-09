import httpHandler from 'httpUtils/http-handler'
export default {
  submitRegister (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post('/user/subRegister.tkm', formData, success, fail, makeData)
  },
  changeVCode (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    httpHandler.get('/common/getVCode.tkm', {}, success, fail, makeData)
  }
}
