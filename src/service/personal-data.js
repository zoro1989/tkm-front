/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
export default {
  get (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    httpHandler.get('/welcome/userinfo.tkm', {}, success, fail, makeData)
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
    httpHandler.post('/role/getPermissionTree.tkm', {}, success, fail, makeData)
  }
}
