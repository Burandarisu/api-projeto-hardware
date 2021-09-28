const app = require("./src/app");
const aedes = require("aedes")();
const mqtt = require("mqtt");

const broker = require("net").createServer(aedes.handle);
const port = 9090;

process.env.TZ = "GMT";

app.listen(8080, () => {
  console.log("app listening on port 8080");
});

broker.listen(port, function () {
  console.log("server started and listening on port ", port);
  const client = mqtt.connect("mqtt://localhost:9090");
  client.on("connect", () => {
    client.subscribe("motor");
  });
  client.on("message", (topic, message) => {
    if (topic === "motor") {
      console.log({ message: message.toString() });
    }
  });
  client.on("error", (error) => {
    console.log(error);
  });
});
