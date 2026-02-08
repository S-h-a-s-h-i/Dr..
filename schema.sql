-- Create Database
CREATE DATABASE IF NOT EXISTS physiotherapy_db;
USE physiotherapy_db;

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_no VARCHAR(50) NOT NULL UNIQUE,
    patient_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    appointment_type VARCHAR(50) NOT NULL, -- e.g., Consultation, Follow-up, Therapy
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors Table (for admin login)
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL
);

-- Insert a default doctor (password: doctor123 - hashed version should be used in production)
-- This is just for demonstration; the password here is a placeholder.
INSERT INTO doctors (username, password, full_name) 
VALUES ('admin', '$2a$10$X8O9LqS5H6.Jk6M3Z6B7e.eS9t8R9eS9t8R9eS9t8R9eS9t8R9e', 'Dr. Kiran');
