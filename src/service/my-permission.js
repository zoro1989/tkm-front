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
    this.$http.post('/role/getPermissionTree.tkm')
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
