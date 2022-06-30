const handler = {};

handler.notFoundHandler = (requestProperties,callBack) => {
  callBack(404, {
    message : 'Your Request was Not Found',
  })
};

module.exports = handler;
