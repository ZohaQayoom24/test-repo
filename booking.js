// Form submission handling
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');
const closeBtn = document.querySelector('.close');

// Form submit event
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
        // Get form data
        const formData = getFormData();
        
        // Simulate API call
        submitToFakeAPI(formData);
    }
});

// Validate form fields
function validateForm() {
    const route = document.getElementById('route').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const departureDate = document.getElementById('departureDate').value;
    const departureTime = document.getElementById('departureTime').value;
    const returnDate = document.getElementById('returnDate').value;
    const returnTime = document.getElementById('returnTime').value;
    const passengers = document.getElementById('passengers').value;
    const verification = document.getElementById('verification').checked;

    // Check if all required fields are filled
    if (!route || !firstName || !lastName || !email || !phone || 
        !departureDate || !departureTime || !returnDate || !returnTime || 
        !passengers || !verification) {
        alert('Please fill in all required fields!');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s-+()]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number!');
        return false;
    }

    // Validate dates
    const depDate = new Date(departureDate);
    const retDate = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (depDate < today) {
        alert('Departure date cannot be in the past!');
        return false;
    }

    if (retDate < depDate) {
        alert('Return date must be after departure date!');
        return false;
    }

    return true;
}

// Get form data
function getFormData() {
    return {
        route: document.getElementById('route').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        departureDate: document.getElementById('departureDate').value,
        departureTime: document.getElementById('departureTime').value,
        returnDate: document.getElementById('returnDate').value,
        returnTime: document.getElementById('returnTime').value,
        passengers: document.getElementById('passengers').value,
        timestamp: new Date().toISOString()
    };
}

// Simulate API call with fake API
function submitToFakeAPI(formData) {
    // Show loading state
    const submitBtn = document.querySelector('.book-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SUBMITTING...';
    submitBtn.disabled = true;

    // Simulate API call to JSONPlaceholder (fake API)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        bookingForm.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        
        // Even on error, show success (since it's a fake API demo)
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showSuccessModal();
        bookingForm.reset();
    });
}

// Show success modal
function showSuccessModal() {
    successModal.style.display = 'block';
    
    // Add animation class
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.4s ease';
}

// Close modal function
function closeModal() {
    successModal.style.display = 'none';
}

// Close modal when clicking X
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === successModal) {
        closeModal();
    }
});

// Phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = value;
        } else if (value.length <= 6) {
            formattedValue = value.slice(0, 3) + ' ' + value.slice(3);
        } else {
            formattedValue = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
        }
    }
    
    e.target.value = formattedValue;
});

// Set minimum date to today for departure date
const today = new Date().toISOString().split('T')[0];
document.getElementById('departureDate').setAttribute('min', today);

// Update return date minimum when departure date changes
document.getElementById('departureDate').addEventListener('change', function() {
    document.getElementById('returnDate').setAttribute('min', this.value);
});

// Enhance route selector
const routeSelect = document.getElementById('route');
routeSelect.addEventListener('change', function() {
    if (this.value) {
        this.style.color = '#333';
    } else {
        this.style.color = '#999';
    }
});

// Initial route color
if (!routeSelect.value) {
    routeSelect.style.color = '#999';
}

// Passengers selector color
const passengersSelect = document.getElementById('passengers');
passengersSelect.addEventListener('change', function() {
    if (this.value) {
        this.style.color = '#333';
    } else {
        this.style.color = '#999';
    }
});

// Initial passengers color
if (!passengersSelect.value) {
    passengersSelect.style.color = '#999';
}

// Console log for debugging
console.log('Booking Form JavaScript Loaded Successfully!');