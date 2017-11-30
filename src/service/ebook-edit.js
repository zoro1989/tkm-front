/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'httpUtils/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.ebook.selectTipById, {
      params: {tipsNo: params.tipsNo}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    delete params.tip.explainTableObj
    delete params.tip.tipsCodeObj
    delete params.tip.noticeCodeObj
    httpHandler.post.bind(this)(uris.ebook.saveTip, params.tip, success, fail, makeData)
  }
}
