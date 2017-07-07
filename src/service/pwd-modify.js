/**
 * Created by zhulin on 2017/6/18.
 */
import responseHandler from 'httpUtils/response-handler'
export default {
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
    this.$http.post('/tkm/welcome/updatePswd.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
