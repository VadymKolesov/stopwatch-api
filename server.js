import app from "./app.js";
import connection from "./src/db/connection.js";

const startServer = async () => {
  try {
    await connection.getConnection();
    console.log("Connected to MySQL database");

    const port = 3000;

    app.listen(port, () => console.log(`Server running at port ${port}`));
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

startServer();
