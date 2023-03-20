const logHttpRequest = (req, res, next) => {
  const logMessage = {
    [new Date().toISOString()]: { method: req.method, url: req.url },
  };
  console.log(logMessage);
  next();
};

module.exports = { logHttpRequest };
