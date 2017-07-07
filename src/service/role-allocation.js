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
    this.$http.post('/tkm/role/allocation.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  getRoles (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.resultData
    }
    this.$http.get('/tkm/role/selectRoleByUserId.tkm', {
      params: {id: params.id}
    }).then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
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
    this.$http.post('/tkm/role/addRole2User.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
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
    this.$http.post('/tkm/role/clearRoleByUserIds.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
