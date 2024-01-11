const CustomError = require("../utils/custom-error.util");

/**react error*/
module.exports = (err, req, res, next) => {
  if (err instanceof Error) {
    res.send(err.message);
  } else if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(404).send("default");
  }
  next();
};
