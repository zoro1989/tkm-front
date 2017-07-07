var isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

isObject.validate = function (value) {
  if (!isObject(value)) throw new TypeError('@param value must be a function')
}

module.exports = isObject
