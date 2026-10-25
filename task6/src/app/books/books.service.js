const { getDB } = require("../../common/db");

function booksCollection() {
  return getDB().collection("books");
}

async function addBook(book) {
  const result = await booksCollection().insertOne(book);
  return { message: "Book added", insertedId: result.insertedId };
}

async function addManyBooks(books) {
  if (!Array.isArray(books) || books.length < 3) {
    throw new Error("Send an array containing at least three books");
  }
  const result = await booksCollection().insertMany(books);
  return { message: "Books added", insertedCount: result.insertedCount, insertedIds: result.insertedIds };
}

async function updateFutureBook(year) {
  const result = await booksCollection().updateOne(
    { title: "Future" },
    { $set: { year: Number(year) } }
  );
  return { matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
}

async function findByTitle(title) {
  return booksCollection().find({ title }).toArray();
}

async function findByYearRange(from, to) {
  return booksCollection().find({
    year: { $gte: Number(from), $lte: Number(to) }
  }).toArray();
}

async function findByGenre(genre) {
  return booksCollection().find({ genres: genre }).toArray();
}

async function skipLimitBooks() {
  return booksCollection().find({})
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
}

async function findIntegerYears() {
  return booksCollection().find({ year: { $type: "int" } }).toArray();
}

async function excludeGenres() {
  return booksCollection().find({
    genres: { $nin: ["Horror", "Science Fiction"] }
  }).toArray();
}

async function deleteBeforeYear(year) {
  const result = await booksCollection().deleteMany({ year: { $lt: Number(year) } });
  return { deletedCount: result.deletedCount };
}

async function aggregate1() {
  return booksCollection().aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray();
}

async function aggregate2() {
  return booksCollection().aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { _id: 0, title: 1, author: 1, year: 1 } }
  ]).toArray();
}

async function aggregate3() {
  return booksCollection().aggregate([
    { $unwind: "$genres" }
  ]).toArray();
}

async function aggregate4() {
  return booksCollection().aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "title",
        foreignField: "bookTitle",
        as: "relatedLogs"
      }
    }
  ]).toArray();
}

module.exports = {
  addBook, addManyBooks, updateFutureBook, findByTitle, findByYearRange,
  findByGenre, skipLimitBooks, findIntegerYears, excludeGenres,
  deleteBeforeYear, aggregate1, aggregate2, aggregate3, aggregate4
};
