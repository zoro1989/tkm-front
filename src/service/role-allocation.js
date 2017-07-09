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
    httpHandler.post('/role/allocation.tkm', formData, success, fail, makeData)
  },
  getRoles (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    httpHandler.get('/role/selectRoleByUserId.tkm', {
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
    httpHandler.post('/role/addRole2User.tkm', formData, success, fail, makeData)
  },
  clearRole (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.tableData.map((row) => {
      if (row.selected) {
        formData.append('userIds', row.id)
      }
    })
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post('/role/clearRoleByUserIds.tkm', formData, success, fail, makeData)
  }
}
