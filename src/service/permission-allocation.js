/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  getList (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      console.log(originalData)
      return {
        totalCount: originalData.resultData.totalCount,
        rows: originalData.resultData.list.map((row) => {
          return {
            id: row.id,
            selected: false,
            columns: [
              {
                name: 'name',
                value: row.name || '--'
              },
              {
                name: 'type',
                value: row.type || '--'
              },
              {
                name: 'permissionNames',
                value: row.permissionNames || '--'
              }
            ],
            operations: [
              {
                name: '选择权限',
                action: 'selectPermission',
                type: 'normal'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.permission.allocation, formData, success, fail, makeData)
  },
  getPermissions (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    httpHandler.get.bind(this)(uris.permission.selectPermissionById, {
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
    httpHandler.post.bind(this)(uris.permission.addPermission2Role, formData, success, fail, makeData)
  },
  clearPermission (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.tableData.rows.map((row) => {
      if (row.selected) {
        formData.append('roleIds', row.id)
      }
    })
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post.bind(this)(uris.permission.clearPermissionByRoleIds, formData, success, fail, makeData)
  }
}
