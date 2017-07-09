import axios from 'axios'
import responseHandler from 'httpUtils/response-handler'
export default {
  get (url, params, success, fail, makeData) {
    axios.get(url, params).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail)
    )
  },
  post (url, params, success, fail, makeData) {
    axios.post(url, params).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail)
    )
  }
}
