const formatISO = require("date-fns/formatISO");

const db = require("../config");
const { isTrue } = require("../../util");

const Measure = db.collection("measures");

async function get(query) {
  let promise = Measure.orderBy("created_at", "desc");

  if (query?.created_at_begin) {
    promise = promise.where(
      "created_at",
      ">=",
      new Date(query.created_at_begin).getTime()
    );
  }
  if (query?.created_at_end) {
    promise = promise.where(
      "created_at",
      "<=",
      new Date(query.created_at_end).getTime()
    );
  }

  if (query?.per_page) {
    query.per_page = parseInt(query.per_page, 10);
  }
  const res = await promise.limit(query?.per_page || 15).get();
  const ret = [];
  res.forEach((doc) => {
    ret.push(doc.data());
  });

  return ret;
}

async function push(body) {
  return await Measure.add({
    ...body,
    created_at: new Date().getTime(),
  });
}

module.exports = { Measure, get, push };
