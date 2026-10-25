const { getDB } = require("../../common/db");

async function createBooksCollection() {
  const db = getDB();
  const existing = await db.listCollections({ name: "books" }).hasNext();
  if (existing) {
    return { message: "The books collection already exists" };
  }

  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "title must be a non-empty string"
          }
        }
      }
    },
    validationLevel: "strict",
    validationAction: "error"
  });

  return { message: "Books collection created with title validation" };
}

async function createAuthorsCollectionByInsert(author) {
  const result = await getDB().collection("authors").insertOne(author);
  return { message: "Author inserted and collection created if it did not exist", insertedId: result.insertedId };
}

async function createCappedLogsCollection() {
  const db = getDB();
  const existing = await db.listCollections({ name: "logs" }).hasNext();
  if (existing) {
    const info = await db.listCollections({ name: "logs" }).next();
    if (info && info.options && info.options.capped) {
      return { message: "Capped logs collection already exists" };
    }
    throw new Error("A non-capped logs collection already exists. Drop it first, then retry.");
  }

  await db.createCollection("logs", { capped: true, size: 1048576 });
  return { message: "Capped logs collection created with a 1MB size limit" };
}

async function createBooksTitleIndex() {
  const name = await getDB().collection("books").createIndex({ title: 1 });
  return { message: "Index created", indexName: name };
}

module.exports = {
  createBooksCollection,
  createAuthorsCollectionByInsert,
  createCappedLogsCollection,
  createBooksTitleIndex
};
