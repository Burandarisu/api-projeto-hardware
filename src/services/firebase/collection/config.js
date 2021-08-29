const db = require('../config')

const Config = db.collection('config')

async function push (body) {
  return await Config.add({
    ...body,
    created_at: new Date().getTime()
  })
}

async function get (query) {
  let promise
  if (query?.last === 'true' || query?.last === true) {
    promise = Config.orderBy('created_at', 'desc').limit(1).get()
  } else {
    promise = Config.orderBy('created_at', 'desc').limit(45).get()
  }
  const res = await promise
  const ret = []
  res.forEach((doc) => {
    ret.push(doc.data())
  })

  return ret
}

module.exports = {
  Config,
  push,
  get
}
