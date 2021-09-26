const MeasureCollection = require("../services/firebase/collection/measure");

async function index(req, res) {
  console.log(new Date(req.query.created_at_begin).getTime());
  const data = await MeasureCollection.get(req.query);
  return res.status(200).send({
    data,
  });
}

async function store(req, res) {
  const { humidity, temperature } = req.body;
  if (!humidity || !temperature) {
    return res.status(400).send({ msg: "Dados não informados" });
  }

  if (typeof humidity !== "number" || typeof temperature !== "number") {
    return res.status(400).send({ msg: "Os dados devem ser númericos" });
  }

  await MeasureCollection.push({
    humidity,
    temperature,
  });

  return res.status(201).send();
}

module.exports = {
  index,
  store,
};
