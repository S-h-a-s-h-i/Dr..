const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function createDoctor() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    // Hash the password
    const password = 'doctor123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing admin user and insert new one
    await connection.execute('DELETE FROM doctors WHERE username = ?', ['admin']);
    await connection.execute(
        'INSERT INTO doctors (username, password, full_name) VALUES (?, ?, ?)',
        ['admin', hashedPassword, 'Dr. Kiran']
    );

    console.log('Doctor account created successfully!');
    console.log('Username: admin');
    console.log('Password: doctor123');

    await connection.end();
}

createDoctor().catch(console.error);
