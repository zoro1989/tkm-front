var isString = (value) => {
  return Object.prototype.toString.call(value) === '[object String]'
}

isString.validate = function (value) {
  if (!isString(value)) throw new TypeError('@param value must be a string')
}

module.exports = isString
