/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.role.getPermissionTree, {}, success, fail, makeData)
  }
}
