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
    this.$http.post('/tkm/permission/index.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  delete (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.tableData.map((row) => {
      if (row.selected) {
        formData.append('ids', row.id)
      }
    })
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    this.$http.post('/tkm/permission/deletePermissionById.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  deleteOne (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    this.$http.post('/tkm/permission/deletePermissionById.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  },
  addPermission (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    this.$http.post('/tkm/permission/addPermission.tkm', formData)
      .then(responseHandler.success(success, fail, makeData), responseHandler.error(fail))
  }
}
