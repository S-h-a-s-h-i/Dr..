const http = require('http');

const data = JSON.stringify({
    patient_name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    service: "General Checkup",
    appointment_type: "Clinic Visit",
    appointment_date: "10-02-2026",
    appointment_time: "10:00"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/appointments',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
