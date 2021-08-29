function isTrue (text) {
  return text === true || text === 'true'
}

function isFalse (text) {
  return text === false || text === 'false'
}

module.exports = { isTrue, isFalse }
