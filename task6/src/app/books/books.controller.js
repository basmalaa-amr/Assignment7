const service = require("./books.service");

async function addBook(req, res, next) {
  try {
    res.status(201).json(await service.addBook(req.body));
  } catch (error) {
    next(error);
  }
}

async function addManyBooks(req, res, next) {
  try {
    res.status(201).json(await service.addManyBooks(req.body));
  } catch (error) {
    next(error);
  }
}

async function updateFutureBook(req, res, next) {
  try {
    const year = req.body.year === undefined ? 2022 : req.body.year;
    res.json(await service.updateFutureBook(year));
  } catch (error) {
    next(error);
  }
}

async function findByTitle(req, res, next) {
  try {
    res.json(await service.findByTitle(req.query.title));
  } catch (error) {
    next(error);
  }
}

async function findByYearRange(req, res, next) {
  try {
    res.json(await service.findByYearRange(req.query.from, req.query.to));
  } catch (error) {
    next(error);
  }
}

async function findByGenre(req, res, next) {
  try {
    res.json(await service.findByGenre(req.query.genre));
  } catch (error) {
    next(error);
  }
}

async function skipLimitBooks(req, res, next) {
  try {
    res.json(await service.skipLimitBooks());
  } catch (error) {
    next(error);
  }
}

async function findIntegerYears(req, res, next) {
  try {
    res.json(await service.findIntegerYears());
  } catch (error) {
    next(error);
  }
}

async function excludeGenres(req, res, next) {
  try {
    res.json(await service.excludeGenres());
  } catch (error) {
    next(error);
  }
}

async function deleteBeforeYear(req, res, next) {
  try {
    const year = req.query.year || 2000;
    res.json(await service.deleteBeforeYear(year));
  } catch (error) {
    next(error);
  }
}

async function aggregate1(req, res, next) {
  try { res.json(await service.aggregate1()); } catch (error) { next(error); }
}
async function aggregate2(req, res, next) {
  try { res.json(await service.aggregate2()); } catch (error) { next(error); }
}
async function aggregate3(req, res, next) {
  try { res.json(await service.aggregate3()); } catch (error) { next(error); }
}
async function aggregate4(req, res, next) {
  try { res.json(await service.aggregate4()); } catch (error) { next(error); }
}

module.exports = {
  addBook, addManyBooks, updateFutureBook, findByTitle, findByYearRange,
  findByGenre, skipLimitBooks, findIntegerYears, excludeGenres,
  deleteBeforeYear, aggregate1, aggregate2, aggregate3, aggregate4
};
