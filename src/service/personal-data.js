/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.welcome.userinfo, {}, success, fail, makeData)
  },
  getRoleAndPermissions (params, success, fail) {
    function makeData (originalData) {
      let permissions = []
      let roles = []
      originalData.data.map((role) => {
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
    httpHandler.post.bind(this)(uris.role.getPermissionTree, {}, success, fail, makeData)
  }
}
