const token = localStorage.getItem('token');
const doctorName = localStorage.getItem('doctorName');

if (!token) {
    window.location.href = 'login.html';
}

document.getElementById('doctorGreeting').innerText = `Welcome, ${doctorName || 'Doctor'}`;

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctorName');
    window.location.href = 'login.html';
});

async function loadAppointments() {
    try {
        const response = await fetch('http://localhost:5000/api/appointments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        const appointments = await response.json();
        displayAppointments(appointments);
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

function displayAppointments(appointments) {
    const list = document.getElementById('appointmentList');
    list.innerHTML = '';

    if (appointments.length === 0) {
        list.innerHTML = '<tr><td colspan="6" style="text-align:center;">No appointments found.</td></tr>';
        return;
    }

    appointments.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Patient Name">${app.patient_name} <br><small>${app.email} | ${app.phone}</small></td>
            <td data-label="Service">${app.service}</td>
            <td data-label="Type">${app.appointment_type}</td>
            <td data-label="Date & Time">${app.appointment_date.split('T')[0]} at ${app.appointment_time}</td>
            <td data-label="Status"><span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span></td>
            <td data-label="Actions">
                ${app.status === 'pending' ? `
                    <button class="btn" style="background:var(--success-color); color:white; padding: 0.4rem 0.8rem; font-size:0.8rem;" onclick="updateStatus(${app.id}, 'confirmed')">Confirm</button>
                    <button class="btn" style="background:var(--danger-color); color:white; padding: 0.4rem 0.8rem; font-size:0.8rem;" onclick="updateStatus(${app.id}, 'cancelled')">Cancel</button>
                ` : '<span style="color:grey; font-size:0.8rem;">No actions available</span>'}
            </td>
        `;
        list.appendChild(tr);
    });
}

async function updateStatus(id, status) {
    try {
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            loadAppointments();
        } else {
            alert('Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

// Initial load
loadAppointments();
