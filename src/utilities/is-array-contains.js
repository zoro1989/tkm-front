import isNotEmpty from 'utilities/is-not-empty'
export default function (arr, obj) {
  if (isNotEmpty(arr) && isNotEmpty(obj)) {
    for (var i = 0; i < arr.length; i++) {
      if (obj === arr[i]) {
        return true
      }
    }
  }
  return false
}
