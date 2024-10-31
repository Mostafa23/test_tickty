// Login Script
const loginForm = document.getElementById('loginForm');
const loginErrorMessage = document.getElementById('login-error-message');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('logemail').value; // Updated ID
    const password = document.getElementById('logpass').value; // Updated ID

    if (!email || !password) {
        loginErrorMessage.textContent = 'Please fill in all fields.';
        return;
    } else if (password.length < 6) {
        loginErrorMessage.textContent = 'Password must be at least 6 characters.';
        return;
    }

    try {
        const response = await fetch('https://testtickty-production.up.railway.app/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            setTimeout(() => window.location.href = "index.html", 30000);
        } else {
            loginErrorMessage.textContent = data.message || 'Login failed.';
        }
    } catch (error) {
        console.error('Error:', error);
        loginErrorMessage.textContent = 'An error occurred. Please try again later.';
    }
});

// Registration Script
const registrationForm = document.getElementById('registrationForm');
const registerErrorMessage = document.getElementById('register-error-message');

registrationForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        registerErrorMessage.textContent = 'Please fill in all fields.';
        return;
    }else if (password.length < 6) {
        registerErrorMessage.textContent = 'Password must be at least 6 characters.';
        return;
    }

    try {
        const response = await fetch('https://testtickty-production.up.railway.app/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            registrationForm.reset();
            setTimeout(() => document.getElementById("reg-log").checked = false, 300);
        } else {
            registerErrorMessage.textContent = data.message || 'Registration failed.';
        }
    } catch (error) {
        console.error('Error:', error);
        registerErrorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
