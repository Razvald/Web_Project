// server/db.js
const sql = require("msnodesqlv8");

//const connectionString = ("server=localhost;Database=Web_Pizza;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}");

const connectionString =
   "server=Pdepar\\SQLEXPRESS;Database=Web-PizzeriaDB;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";

const queryDatabase = (query, params = []) => {
   return new Promise((resolve, reject) => {
      sql.query(connectionString, query, params, (err, rows) => {
         if (err) {
            console.error("Ошибка при запросе к базе данных:", err);
            reject(err);
         } else {
            resolve(rows);
         }
      });
   });
};

module.exports = { queryDatabase };
