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
    httpHandler.post('/member/list.tkm', formData, success, fail, makeData)
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
    httpHandler.post('/member/deleteUserById.tkm', formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post('/member/deleteUserById.tkm', formData, success, fail, makeData)
  },
  forbidden (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('id', params.row.id)
    formData.append('status', params.row.status)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post('/member/forbidUserById.tkm', formData, success, fail, makeData)
  }
}
