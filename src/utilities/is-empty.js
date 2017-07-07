export default function (value) {
  if (value) {
    if (String(value).trim().length) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}
