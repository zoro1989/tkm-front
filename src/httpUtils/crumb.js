let crumbToken = ''
try {
  crumbToken = document.cookie.match(/token=(.{36})/)[1]
} catch (err) {
  console.error(err)
}

export default crumbToken
