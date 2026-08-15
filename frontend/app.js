// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const errors = document.createElement('div');
    form.appendChild(errors);

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    function addError(errorText) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = errorText;
        errors.appendChild(errorDiv);
        errors.style.display = 'block';
    }

    function removeError() {
        errors.style.display = 'none';
    }

    emailInput.addEventListener('input', (e) => {
        const email = e.target.value;
        removeError();
        if (!validateEmail(email)) {
            addError("Please enter a valid email.");
        }
    });

    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        removeError();
        if (!validatePassword(password)) {
            addError("Password must be at least 8 characters, include a letter and a number.");
        }
    });
}

// Event Handling
function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    const isValid = validateForm(formId);
    if (isValid) {
        console.log('Form submitted successfully');
    } else {
        console.error('Form validation failed');
    }
}

// Button Actions
function handleButtonAction(buttonId, action) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => {
        action();
    });
}

// Dynamic Content Updates
function updateContent() {
    const dashboardContent = document.getElementById('dashboard');
    dashboardContent.innerHTML = `
    <h2>Dashboard</h2>
    <p>Welcome to the Dashboard!</p>
    `;
}

// Error Handling
function handleError(error) {
    console.error('An error occurred:', error);
}

// Dashboard Interactions
function handleDashboardInteraction() {
    updateContent();
}

// Example Usage
validateForm('login-form');
handleFormSubmit(document.getElementById('login-form'), 'login-form');
handleButtonAction('submit-btn', () => {
    handleFormSubmit(document.getElementById('login-form'), 'login-form');
});
handleButtonAction('update-btn', handleDashboardInteraction);


This code snippet demonstrates a simple implementation of a hospital management system with forms validation, event handling, button actions, dynamic content updates, error handling, and dashboard interactions. The system includes a login form with basic email and password validation, and a dashboard that can be updated through a button click. Error handling is also included to notify users when form fields are invalid.