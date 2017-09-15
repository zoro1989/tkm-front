/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
function _normarlizePoints (list) {
  let ret = []
  list.map((row) => {
    ret.push({
      id: row.id,
      selected: false,
      section: row.title
    })
    row.items.map((item) => {
      ret.push({
        id: item.id,
        selected: false,
        columns: [
          {
            name: 'title',
            value: item.title || '--'
          }
        ],
        operations: [
          {
            name: '删除',
            action: 'deletePoint',
            type: 'delete'
          },
          {
            name: '编辑',
            action: 'editPoint',
            type: 'normal'
          }
        ]
      })
    })
  })
  return ret
}
export default {
  getList (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      console.log(originalData)
      let rows = _normarlizePoints(originalData.data.list)
      console.log(rows)
      return {
        totalCount: originalData.data.totalCount,
        rows: rows
      }
    }
    httpHandler.post.bind(this)(uris.points.list, formData, success, fail, makeData)
  },
  delete (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    params.tableData.rows.map((row) => {
      if (row.selected) {
        formData.append('ids', row.id)
      }
    })
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post.bind(this)(uris.points.deletePointByIds, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post.bind(this)(uris.points.deletePointByIds, formData, success, fail, makeData)
  },
  editPoint (params, success, fail) {
    console.log(params)
    function makeData (originalData) {
      console.log(originalData)
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.points.selectPointById, {
      params: {id: params.row.id}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    console.log(params)
    let formData = new FormData()
    formData.append('id', params.row.id)
    formData.append('title', params.row.columns[0].value)
    formData.append('detail', params.row.detail)
    function makeData (originalData) {
      console.log(originalData)
      return originalData
    }
    httpHandler.post.bind(this)(uris.points.addPoint, formData, success, fail, makeData)
  }
}
