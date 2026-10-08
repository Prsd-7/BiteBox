const usernameEL = document.querySelector("#Full-Name");
const emailEL = document.querySelector("#Email");
const passwordEL = document.querySelector("#Password");
const confirm_passwordEL = document.querySelector("#Confirm-Password");
const form = document.querySelector("#SignUp");


//Required input from user
const isRequired = value=>value ===''?false:true;
//Check length of username
const isBetween=(length,min,max)=>length<min||length>max?false:true;
//show error 
const showError=(input, message)=>{
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error=formField.querySelector('small');
    error.textContent=message;
}
//show success if between input
const showSuccess=(input)=>{
    const formField=input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error=formField.querySelector('small');
    error.textContent='';
}

//check Username

const checkUsername=()=>{
    let valid=false;
    const min=3,max=25;
    const fullname=usernameEL.value.trim();
    if(!isRequired(fullname)){
        showError(usernameEL,'Username cannot be empty');
    } else if (!isBetween(fullname.length,min,max)){
        showError(usernameEL,`Username must be between ${min} and ${max} characters`);
    } else{
        showSuccess(usernameEL);
        valid=true;
    }
    return valid;
}

//check for Valid Email

const isEmailValid=(email)=>{
    const re=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

//Check Email

const checkEmail=()=>{
    let valid=false;
    const email=emailEL.value.trim();
    if(!isRequired(email)){
        showError(emailEL,'Email cannot be empty');
    } else if(!isEmailValid(email)){
        showError(emailEL,`Email is not a valid format`);
    } else{
        showSuccess(emailEL);
        valid=true;
    }
    return valid;
}

//check if password is secure
const isPasswordSecure=(password)=>{
    const re=new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
    return re.test(password);
}

//check password
const checkPassword=()=>{
    let valid=false;
    const password=passwordEL.value.trim();
    if(!isRequired(password)){
        showError(passwordEL,`Password cannot be empty`);
    } else if(!isPasswordSecure(password)){
        showError(passwordEL,'Password must be atleast 8 characters that include 1 lower case character, 1 uppercase character, 1 number, and 1 special character.');
    } else{
        showSuccess(passwordEL);
        valid=true;
    }
    return valid;
}


const checkConfirmPassword=()=>{
    let valid=false;
    const ConfirmPassword = confirm_passwordEL.value.trim();
    const password = passwordEL.value.trim();
    if(!isRequired(ConfirmPassword)){
        showError(confirm_passwordEL,'Password cannot be empty');
    } else if(password!=ConfirmPassword){
        showError(confirm_passwordEL,'The password does not match!');
    } else{
        showSuccess(confirm_passwordEL);
        valid=true;
    }
    return valid;
}



form.addEventListener('submit',function(e){
    e.preventDefault();
    let isUserNameValid=checkUsername(),isEmailValid=checkEmail(),isPasswordValid=checkPassword(),isConfirmPasswordValid=checkConfirmPassword();

    let isFormValid=isUserNameValid && isEmailValid  && isPasswordValid && isConfirmPasswordValid;
    if(isFormValid){
        
    }
});


form.addEventListener('input',function(e){
    switch(e.target.id){
        case 'Full-Name':
            checkUsername();
            break;
        case 'Email':
            checkEmail();
            break;
        case 'Password':
            checkPassword();
            break;
        case 'Confirm-Password':
            checkConfirmPassword();
            break;
    }
});

