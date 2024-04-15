const sqlite = require("sqlite3");
require('dotenv').config()

const db = new sqlite.Database(process.env.SLQLITE_DB);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email EMAIL, password TEXT, role TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
});

module.exports = db;