const handler = {};

handler.sampleHandler = (requestProperties, callBack) => {
  console.log(requestProperties);
  callBack(200, {
    message: "this is a sample url",
  });
};

module.exports = handler;
