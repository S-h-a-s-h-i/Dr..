const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function testLogin() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    // Check if doctor exists
    const [rows] = await connection.execute('SELECT * FROM doctors WHERE username = ?', ['admin']);

    if (rows.length === 0) {
        console.log('ERROR: No doctor found with username "admin"');
        await connection.end();
        return;
    }

    const doctor = rows[0];
    console.log('Doctor found:', {
        id: doctor.id,
        username: doctor.username,
        full_name: doctor.full_name,
        password_hash: doctor.password.substring(0, 20) + '...'
    });

    // Test password comparison
    const testPassword = 'doctor123';
    const isMatch = await bcrypt.compare(testPassword, doctor.password);

    console.log('\nPassword test:');
    console.log('Testing password:', testPassword);
    console.log('Match result:', isMatch);

    await connection.end();
}

testLogin().catch(console.error);
