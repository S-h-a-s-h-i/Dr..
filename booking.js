const bookingForm = document.getElementById('bookingForm');
const steps = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');

let currentStep = 0;

// Step Navigation
nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        steps[currentStep].classList.remove('active');
        currentStep--;
        steps[currentStep].classList.add('active');
    });
});

// Enhanced Validation
function validateStep(stepIndex) {
    const activeStep = steps[stepIndex];
    const inputs = activeStep.querySelectorAll('input[required], select[required]');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            input.style.borderColor = 'red';
            valid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    // Additional validation for email and phone on step 3
    if (stepIndex === 2) {
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            email.style.borderColor = 'red';
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            valid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Phone validation (at least 10 digits)
        const phoneDigits = phone.value.replace(/\D/g, '');
        if (phone.value && phoneDigits.length < 10) {
            phone.style.borderColor = 'red';
            phoneError.textContent = 'Phone number must be at least 10 digits';
            phoneError.style.display = 'block';
            valid = false;
        } else {
            phoneError.style.display = 'none';
        }
    }

    if (!valid) {
        alert('Please fill in all required fields correctly.');
    }
    return valid;
}

// Form Submission
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
        return;
    }

    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData.entries());

    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnSpinner = document.getElementById('submitBtnSpinner');

    // Show loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Processing...';
    submitBtnSpinner.style.display = 'inline-block';

    try {
        const response = await fetch('http://localhost:5000/api/appointments/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (response.ok) {
            // Store appointment details in sessionStorage for success page
            sessionStorage.setItem('appointmentDetails', JSON.stringify({
                appointmentNumber: result.appointmentNumber,
                patientName: bookingData.patient_name,
                doctorName: bookingData.doctor_name,
                service: bookingData.service,
                appointmentType: bookingData.appointment_type,
                appointmentDate: bookingData.appointment_date,
                appointmentTime: bookingData.appointment_time,
                email: bookingData.email
            }));

            // Redirect to success page
            window.location.href = 'success.html';
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to connect to the server. Please ensure the backend is running and try again.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Confirm Booking';
        submitBtnSpinner.style.display = 'none';
    }
});
