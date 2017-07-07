import isObject from './is-object'
import isString from './is-string'

let defaultJoinMark = '&'
let defaultSetValueMark = '='

function getParams (str, joinMark, setValueMark) {
  let dataObj = {}
  let splitedStrArr = str.split(joinMark)
  splitedStrArr.forEach((splitedStr) => {
    let splitedKeyAndValue = splitedStr.split(setValueMark)
    dataObj[splitedKeyAndValue[0]] = splitedKeyAndValue[1]
  })
  return dataObj
}

function setParams (str, joinMark, setValueMark, options) {
  let key = ''
  let valueStr = ''
  let searchPosition
  for (key in options) {
    valueStr = joinMark + key + setValueMark + options[key] + joinMark
    searchPosition = str.search(key)
    if (searchPosition === -1) {
      str += valueStr
    } else {
      str = str.replace(new RegExp(joinMark + (searchPosition === 0 ? '?' : '+') + '(' + key + setValueMark + '.*)' + joinMark + '?', 'g'), valueStr)
    }
  }
  let result = str = str.replace(new RegExp(joinMark + joinMark, 'g'), joinMark).replace(new RegExp(joinMark + '$'), '').replace(new RegExp('^' + joinMark), '')
  return result
}

function getCleanHash () {
  return location.hash.replace('#', '')
}

function getCleanQuery () {
  return location.search.replace('?', '').replace('/', '')
}

export default {
  getUriQuery () {
    return getParams(getCleanQuery(), defaultJoinMark, defaultSetValueMark)
  },
  getUriHash () {
    return getParams(getCleanHash(), defaultJoinMark, defaultSetValueMark)
  },
  getCustom (options) {
    isObject.validate(options)
    isString.validate(options.fullStr)
    isString.validate(options.startPoint)
    isString.validate(options.joinMark)
    isString.validate(options.setValueMark)
    return getParams(options.fullStr.split(options.startPoint)[1], options.joinMark, options.setValueMark)
  },
  addUriQuery (options) {
    isObject.validate(options)
    return setParams(getCleanQuery(), defaultJoinMark, defaultSetValueMark, options)
  },
  addUriHash (options) {
    isObject.validate(options)
    return setParams(getCleanHash(), defaultJoinMark, defaultSetValueMark, options)
  },
  addCustom (options) {
    isObject.validate(options)
    isString.validate(options.fullStr)
    isString.validate(options.startPoint)
    isString.validate(options.joinMark)
    isString.validate(options.setValueMark)
    isObject.validate(options.options)
    return setParams(options.fullStr.split(options.startPoint)[1], options.joinMark, options.setValueMark, options.options)
  }
  // ,
  // setQuery(options){
  // location.search=this.addQuery(options)
  // }
}
