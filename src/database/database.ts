import sqlite3 from "sqlite3";

export class Database {
  db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(
      process.env.SLQLITE_DB || "myspace.db",
      (err) => {
        if (err) {
          console.error("Error opening database", err);
        } else {
          console.log("The database has been opened successfully! 🛩️");
          this.createTables();
        }
      }
    );
  }

  private createTables() {
    // Utilisation de la fonction createTable pour créer les tables Users et Products
    this.createTable(
      "users",
      `(id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        password TEXT,
        role TEXT,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    );

    this.createTable(
      "products",
      `(id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price NUMBER,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    );
  }

  private createTable(tableName: string, tableSchema: string) {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} ${tableSchema}`,
      (err) => {
        if (err) {
          console.error(`Error creating table ${tableName}`, err);
        } else {
          console.log(
            `Table ${tableName} created successfully or already exists 😑`
          );
        }
      }
    );
  }

  public query(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
