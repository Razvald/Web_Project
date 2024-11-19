const sql = require("msnodesqlv8");

const connectString = "server=.;Database=Web_Pizza;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "drop database demo";
sql.query(connectString, query, (err, rows) => { console.log(rows); });
