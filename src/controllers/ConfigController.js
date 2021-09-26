const ConfigCollection = require("../services/firebase/collection/config");
const { isTrue, isFalse } = require("../services/util");

async function index(req, res) {
  const data = await ConfigCollection.get(req.query);
  return res.status(200).send({
    data,
  });
}

async function store(req, res) {
  const { automatic, temperature, state } = req.body;

  if (automatic === undefined || !temperature || state === undefined) {
    return res.status(400).send({ msg: "Dados não informados" });
  }

  if (typeof automatic !== "boolean") {
    return res.status(400).send({ msg: "Automatic deve ser boleano" });
  }

  if (typeof state !== "boolean") {
    return res.status(400).send({ msg: "state deve ser boleano" });
  }

  if (typeof temperature !== "number") {
    return res.status(400).send({ msg: "Temperature deve ser um número" });
  }

  await ConfigCollection.push({
    automatic,
    temperature,
    state,
  });

  return res.status(201).send();
}

module.exports = {
  index,
  store,
};
