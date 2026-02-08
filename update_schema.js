const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateSchema() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log('Connected to database...');

        // Drop the existing appointments table
        console.log('Dropping existing appointments table...');
        await connection.execute('DROP TABLE IF EXISTS appointments');

        // Recreate with new schema
        console.log('Creating appointments table with new schema...');
        await connection.execute(`
            CREATE TABLE appointments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                appointment_no VARCHAR(50) NOT NULL UNIQUE,
                patient_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                doctor_name VARCHAR(100) NOT NULL,
                service VARCHAR(100) NOT NULL,
                appointment_type VARCHAR(50) NOT NULL,
                appointment_date DATE NOT NULL,
                appointment_time TIME NOT NULL,
                status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('✓ Appointments table updated successfully!');

        await connection.end();
    } catch (error) {
        console.error('Error updating schema:', error);
        process.exit(1);
    }
}

updateSchema();
