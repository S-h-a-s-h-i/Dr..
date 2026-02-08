const http = require('http');

const data = JSON.stringify({
    username: "admin",
    password: "doctor123"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Testing login API endpoint...');
console.log('Request:', JSON.parse(data));

const req = http.request(options, (res) => {
    console.log(`\nStatus Code: ${res.statusCode}`);
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response:', responseBody);
        try {
            const parsed = JSON.parse(responseBody);
            console.log('Parsed:', JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Could not parse response as JSON');
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
