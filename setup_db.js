const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true // Enable multiple statements
});

const schemaPath = path.join(__dirname, '../database/schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL server.');

    connection.query(schemaSql, (err, results) => {
        if (err) {
            console.error('Error executing schema:', err);
            process.exit(1);
        }
        console.log('Database and tables created successfully.');
        connection.end();
    });
});
