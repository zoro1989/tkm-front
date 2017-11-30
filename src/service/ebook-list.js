/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
import timeFilter from 'filters/timestamp-to-date-time'
export default {
  getList (params, success, fail) {
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      return {
        totalCount: originalData.data.total,
        rows: originalData.data.list.map((row) => {
          return {
            id: row.id,
            selected: false,
            columns: [
              {
                name: 'tipsNo',
                value: row.tipsNo || '--'
              },
              {
                name: 'tipsTitle',
                value: row.tipsTitle || '--'
              },
              {
                name: 'updateTime',
                value: timeFilter(row.updateTime) || '--'
              },
              {
                name: 'createTime',
                value: timeFilter(row.createTime) || '--'
              }
            ],
            operations: [
              {
                name: '删除',
                action: 'deleteTip',
                type: 'delete'
              },
              {
                name: '编辑',
                action: 'editTip'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.ebook.list, formData, success, fail, makeData)
  },
  delete (params, success, fail) {
    let formData = new FormData()
    params.tableData.rows.map((row) => {
      if (row.selected) {
        formData.append('ids', row.id)
      }
    })
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.permission.deletePermissionById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.permission.deletePermissionById, formData, success, fail, makeData)
  }
}
