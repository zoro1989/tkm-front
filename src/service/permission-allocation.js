/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
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
    httpHandler.post('/permission/allocation.tkm', formData, success, fail, makeData)
  },
  getPermissions (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    httpHandler.get('/permission/selectPermissionById.tkm', {
      params: {id: params.id}
    }, success, fail, makeData)
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
    httpHandler.post('/permission/addPermission2Role.tkm', formData, success, fail, makeData)
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
    httpHandler.post('/role/clearRoleByUserIds.tkm', formData, success, fail, makeData)
  }
}
