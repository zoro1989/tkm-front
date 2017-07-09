import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  submitLogin (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.user.submitLogin, formData, success, fail, makeData)
  }
}
