const { getDB } = require("../../common/db");

async function addLog(log) {
  const result = await getDB().collection("logs").insertOne({
    message: log.message || "A log was added",
    bookTitle: log.bookTitle || "",
    level: log.level || "info",
    createdAt: new Date()
  });
  return { message: "Log added", insertedId: result.insertedId };
}

module.exports = { addLog };
