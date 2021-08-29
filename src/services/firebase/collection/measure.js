const db = require('../config')
const { isTrue } = require('../../util')

const Measure = db.collection('measures')

async function get (query) {
  let promise
  if (isTrue(query?.last)) {
    promise = Measure.orderBy('created_at', 'desc').limit(1).get()
  } else {
    promise = Measure.orderBy('created_at', 'desc').limit(15).get()
  }
  const res = await promise
  const ret = []
  res.forEach((doc) => {
    ret.push(doc.data())
  })

  return ret
}

async function push (body) {
  return await Measure.add({
    ...body,
    created_at: new Date().getTime()
  })
}

module.exports = { Measure, get, push }
