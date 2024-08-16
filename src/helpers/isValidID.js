import db from "../db/connection.js";

const isValidID = async (obj) => {
  const keys = Object.keys(obj);

  const subQueries = keys
    .map(
      (key) =>
        `(SELECT ID FROM ${key.replace("_id", "s")} WHERE id = ?) AS ${key}`
    )
    .join(", ");

  const sqlQuery = `SELECT ${subQueries}`;
  const values = keys.map((key) => obj[key]);
  const connection = await db.getConnection();

  try {
    const [[result]] = await connection.query(sqlQuery, values);

    const nullKeys = Object.keys(result).filter((key) => result[key] === null);

    if (nullKeys.length === 0) {
      return false;
    } else {
      return `Invalid id at fields: ${nullKeys.join(", ")}`;
    }
  } catch (error) {
    return error.message;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export default isValidID;
