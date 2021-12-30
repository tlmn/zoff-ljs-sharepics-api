var express = require("express");
var bodyParser = require("body-parser");
var lib = require("./lib/lib");

const serverPort = 4000;
const app = express();

app.use(
  bodyParser.text({
    type: "*/*",
    limit: "10mb",
  })
);

app.post("/convert", async (req, res) => {
  try {
    const png = await lib.renderSVG(req.body);
    res.set("Content-Type", "image/png");
    res.send(png);
  } catch (e) {
    res.status(500).send(e.message);
    console.log("error", e);
  }
});

const server = app.listen(serverPort);

server.on("connection", function (socket) {
  socket.setTimeout(10 * 1000);
});

const shutdown = async () => {
  console.log("graceful shutdown puppeteer");
  console.log("graceful shutdown express");
  server.close(function () {
    console.log("closed express");
    process.exit();
  });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
