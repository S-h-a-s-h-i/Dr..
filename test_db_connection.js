const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

console.log('Testing MySQL Connection...');
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`User: ${process.env.DB_USER}`);
console.log(`Database: ${process.env.DB_NAME}`);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Connection Failed!', err.code, err.message);
    process.exit(1);
  }
  console.log('Connection Successful!');
  connection.end();
});
