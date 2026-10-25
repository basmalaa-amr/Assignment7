const service = require("./collection.service");

async function createBooks(req, res, next) {
  try {
    res.status(201).json(await service.createBooksCollection());
  } catch (error) {
    next(error);
  }
}

async function createAuthors(req, res, next) {
  try {
    const author = req.body && Object.keys(req.body).length
      ? req.body
      : { name: "George Orwell", country: "England" };
    res.status(201).json(await service.createAuthorsCollectionByInsert(author));
  } catch (error) {
    next(error);
  }
}

async function createCappedLogs(req, res, next) {
  try {
    res.status(201).json(await service.createCappedLogsCollection());
  } catch (error) {
    next(error);
  }
}

async function createBooksIndex(req, res, next) {
  try {
    res.json(await service.createBooksTitleIndex());
  } catch (error) {
    next(error);
  }
}

module.exports = { createBooks, createAuthors, createCappedLogs, createBooksIndex };
