/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
import isNotEmpty from 'utilities/is-not-empty'
function _normarlizePoints (list) {
  let ret = []
  list.map((row) => {
    ret.push({
      id: row.id,
      selected: false,
      sections: [
        {
          name: 'title',
          value: row.title || '--'
        },
        {
          name: 'pOrder',
          value: row.pOrder || '0'
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
    row.items.map((item) => {
      ret.push({
        id: item.id,
        selected: false,
        columns: [
          {
            name: 'title',
            value: item.title || '--'
          },
          {
            name: 'pOrder',
            value: item.pOrder || '--'
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
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    formData.append('type', params.type)
    function makeData (originalData) {
      let rows = _normarlizePoints(originalData.data.list)
      return {
        totalCount: originalData.data.totalCount,
        rows: rows
      }
    }
    httpHandler.post.bind(this)(uris.points.list, formData, success, fail, makeData)
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
    httpHandler.post.bind(this)(uris.points.deletePointByIds, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.points.deletePointByIds, formData, success, fail, makeData)
  },
  editPoint (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.points.selectPointById, {
      params: {id: params.row.id, type: params.type}
    }, success, fail, makeData)
  },
  getParentPoints (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.points.selectParentPoints, {
      params: {type: params.type}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    if (!params.validate.checkValid(params.validate.$children)) {
      fail && fail()
      return
    }
    let formData = new FormData()
    formData.append('id', isNotEmpty(params.row.id) ? params.row.id : '')
    formData.append('title', isNotEmpty(params.row.title) ? params.row.title : '')
    formData.append('detail', isNotEmpty(params.row.detail) ? params.row.detail : '')
    formData.append('parentId', isNotEmpty(params.row.parentId) ? params.row.parentId : '')
    formData.append('pOrder', isNotEmpty(params.row.pOrder) ? params.row.pOrder : 0)
    formData.append('type', params.type)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.points.addPoint, formData, success, fail, makeData)
  },
  uploadImage (params, success, fail) {
    let formData = new FormData()
    formData.append('image', params.image)
    formData.append('pointId', params.pointId)
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.post.bind(this)(uris.points.uploadImage, formData, success, fail, makeData)
  },
  deleteImage (params, success, fail) {
    let formData = new FormData()
    formData.append('id', params.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.points.deleteImageById, formData, success, fail, makeData)
  }
}
