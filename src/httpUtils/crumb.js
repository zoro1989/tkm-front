let crumbToken = ''
try {
  crumbToken = document.cookie.match(/token=(.{36})/)[1]
} catch (err) {
  console.error(err)
}
console.log(crumbToken)

export default crumbToken
