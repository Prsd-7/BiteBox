
const emailEL = document.querySelector("#LoginEmail");
const passwordEL = document.querySelector("#LoginPassword");
const form = document.querySelector("#Login");

// Helper functions
const isRequired = value => value.trim() === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Email validation
const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
};

const checkEmail = () => {
    let valid = false;
    const email = emailEL.value.trim();
    if (!isRequired(email)) {
        showError(emailEL, 'Email cannot be empty');
    } else if (!isEmailValid(email)) {
        showError(emailEL, 'Email is not a valid format');
    } else {
        showSuccess(emailEL);
        valid = true;
    }
    return valid;
};

// Password validation 
const checkPassword = () => {
    let valid = false;
    const min = 6, max = 30;
    const password = passwordEL.value.trim();
    if (!isRequired(password)) {
        showError(passwordEL, 'Password cannot be empty');
    } else if (!isBetween(password.length, min, max)) {
        showError(passwordEL, `Password must be between ${min} and ${max} characters`);
    } else {
        showSuccess(passwordEL);
        valid = true;
    }
    return valid;
};

//Form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Run client‑side validation
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();

    
    if (isEmailValid && isPasswordValid) {
        
        const CORRECT_PASSWORD = 'bitebox2026'; // change to your test password

        const enteredPassword = passwordEL.value.trim();

        if (enteredPassword === CORRECT_PASSWORD) {
            alert('Login successful!');
            
        } else {
            showError(passwordEL, 'Incorrect password');
            passwordEL.parentElement.classList.remove('success');
        }
    }
});


form.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'LoginEmail':
            checkEmail();
            break;
        case 'LoginPassword':
            checkPassword(); 
            break;
    }
});