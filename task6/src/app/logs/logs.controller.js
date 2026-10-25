const service = require("./logs.service");

async function addLog(req, res, next) {
  try {
    res.status(201).json(await service.addLog(req.body || {}));
  } catch (error) {
    next(error);
  }
}

module.exports = { addLog };
