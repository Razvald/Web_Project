// server/db.js
const sql = require("msnodesqlv8");

const connectionString =
   "server=localhost;Database=Web_Pizza;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const queryDatabase = (query, params = []) => {
   return new Promise((resolve, reject) => {
      sql.query(connectionString, query, params, (err, rows) => {
         if (err) reject(err);
         else resolve(rows);
      });
   });
};

module.exports = { queryDatabase };
