import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  submitRegister (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.user.subRegister, formData, success, fail, makeData)
  },
  changeVCode (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    httpHandler.get.bind(this)(uris.common.getVCode, {}, success, fail, makeData)
  }
}
