/**
 * Created by zhulin on 2017/6/18.
 */
import responseHandler from 'httpUtils/response-handler'
export default {
  get (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    this.$http.get('/tkm/welcome/userinfo.tkm', {
      params: {}
    }).then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  save (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    this.$http.post('/tkm/welcome/updateSelf.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
