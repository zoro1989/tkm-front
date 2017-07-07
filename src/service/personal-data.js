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
    this.$http.get('/tkm/welcome/userinfo.tkm')
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  getRoleAndPermissions (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      let permissions = []
      let roles = []
      originalData.resultData.map((role) => {
        roles.push(role.type)
        role.permissions.map((permission) => {
          permissions.push(permission.url)
        })
      })
      return {
        permissions: permissions,
        roles: roles
      }
    }
    this.$http.post('/tkm/role/getPermissionTree.tkm')
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
