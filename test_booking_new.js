const fetch = require('node-fetch');

const testData = {
    patient_name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    doctor_name: "Smith",
    service: "Sports Injury",
    appointment_type: "Clinic Visit",
    appointment_date: "2026-02-15",
    appointment_time: "10:30"
};

async function testBooking() {
    try {
        console.log('Testing appointment booking...\n');
        console.log('Sending data:', JSON.stringify(testData, null, 2));

        const response = await fetch('http://localhost:5000/api/appointments/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        console.log('\n--- Response ---');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(result, null, 2));

        if (response.ok) {
            console.log('\n✓ Appointment booked successfully!');
            console.log('Appointment Number:', result.appointmentNumber);
            console.log('Status:', result.status);
        } else {
            console.log('\n✗ Booking failed:', result.message);
        }
    } catch (error) {
        console.error('\n✗ Error:', error.message);
        console.log('\nMake sure the backend server is running on port 5000');
    }
}

testBooking();
