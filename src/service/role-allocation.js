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
        totalCount: originalData.data.total,
        rows: originalData.data.list.map((row) => {
          return {
            id: row.id,
            selected: false,
            columns: [
              {
                name: 'nickname',
                value: row.nickname || '--'
              },
              {
                name: 'email',
                value: row.email || '--'
              },
              {
                name: 'status',
                value: row.status === 1 ? '有效' : '禁止'
              },
              {
                name: 'roleNames',
                value: row.roleNames || '--'
              }
            ],
            operations: [
              {
                name: '选择角色',
                action: 'selectRole',
                type: 'normal'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.role.allocation, formData, success, fail, makeData)
  },
  getRoles (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.role.selectRoleByUserId, {
      params: {id: params.id}
    }, success, fail, makeData)
  },
  addRoles (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.roleIds.map((id) => {
      formData.append('ids', id)
    })
    formData.append('userId', params.userId)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post.bind(this)(uris.role.addRole2User, formData, success, fail, makeData)
  },
  clearRole (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.tableData.rows.map((row) => {
      if (row.selected) {
        formData.append('userIds', row.id)
      }
    })
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post.bind(this)(uris.role.clearRoleByUserIds, formData, success, fail, makeData)
  }
}
