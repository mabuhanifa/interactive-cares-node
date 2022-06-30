/*
Raw node project
*/

const http = require("http");

const app = {};

app.config = {
  port: 3000,
};

const { handleReqRes } = require("./helpers/handleReqRes");

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening on ${app.config.port}`);
  });
};

app.handleReqRes = handleReqRes;

app.createServer();
