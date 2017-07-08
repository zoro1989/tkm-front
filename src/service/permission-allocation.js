/**
 * Created by zhulin on 2017/6/18.
 */
import responseHandler from 'httpUtils/response-handler'
export default {
  getList (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    this.$http.post('/permission/allocation.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  getPermissions (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    this.$http.get('/permission/selectPermissionById.tkm', {
      params: {id: params.id}
    }).then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  addPermissions (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.permissionIds.map((id) => {
      formData.append('ids', id)
    })
    formData.append('roleId', params.roleId)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    this.$http.post('/permission/addPermission2Role.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  clearPermission (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.tableData.map((row) => {
      if (row.selected) {
        formData.append('roleIds', row.id)
      }
    })
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    this.$http.post('/role/clearRoleByUserIds.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
