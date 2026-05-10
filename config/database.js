const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./BDsql_TP1_CelesteB_KelyanA_NicolasP.db', (err) => {
 if (err) {
        console.error('Erreur SQLite :', err.message);
    } else {
        console.log('Connecté à SQLite');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Eleve (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Projets (
                id_projet INTEGER PRIMARY KEY AUTOINCREMENT,
                titre TEXT NOT NULL,
                description TEXT,
                date_creation DATE,
                id_eleve INTEGER NOT NULL,
                id_type INTEGER NOT NULL,
        )
    `);

    db.run(`
        CREATE TABLE TypeProjet (
        id_type INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_type TEXT NOT NULL UNIQUE
        )
    `);

    db.run(`
       CREATE TABLE ImageProjet (
        id_image INTEGER PRIMARY KEY AUTOINCREMENT,
        chemin_image TEXT NOT NULL,
        id_projet INTEGER NOT NULL,
    
    FOREIGN KEY (id_projet) REFERENCES Projet(id_projet)
)
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
        ['admin', 'admin123']
    );
});

module.exports = db;
