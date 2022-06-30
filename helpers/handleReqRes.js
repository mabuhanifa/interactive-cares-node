const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");

const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");
const { request } = require("https");

const handler = {};
handler.handleReqRes = (req, res) => {
  //request
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;
  const requestedProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  chosenHandler(requestedProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    const payloadString = JSON.stringify(payload);
    res.writeHead(statusCode);
    res.end(payloadString);
  });

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    //response
    res.end("hello world!");
  });
};

module.exports = handler;
