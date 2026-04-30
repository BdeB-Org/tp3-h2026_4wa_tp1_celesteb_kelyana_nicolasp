const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./BDsql_TP1_CelesteB_KelyanA_NicolasP.db');
module.exports = db;
