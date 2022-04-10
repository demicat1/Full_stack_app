let username;
let email;
let pass1;
let pass2;


import {emailcheck} from "./emailValidator.js";
import {CheckPass} from "./passwordValidator.js";
import {checkSecondPass} from "./CopyPassword.js";

const email_inp = document.querySelector('.e-mail');
let emailErr = document.querySelector('.form-text-email');
email_inp.addEventListener('keypress' ,()=>{
    email = email_inp.value + `${event.key}`;
    console.log(email_inp.value);
    emailcheck(email_inp.value,emailErr);
});






const password1 = document.querySelector('.password');
const passErr = document.querySelector('.form-text-pass');
password1.addEventListener('keypress',()=>{
    pass1 = password1.value + `${event.key}`;
    console.log(pass1)
    CheckPass(pass1,passErr)
})


const password2 = document.querySelector('.password2');
const passErr2 = document.querySelector('.form-text-pass-dubl');
password2.addEventListener('keypress', ()=>{
    pass2 = password2.value +`${event.key}`;
    checkSecondPass(pass2,pass1,passErr2)
})

const btn = document.querySelector('.btn');
const regForm = document.getElementById('registrationForm');
regForm.addEventListener('submit',function(e){

    if(CheckPass(password1.value,passErr) && checkSecondPass(password2.value,password1.value, passErr2) && emailcheck(email_inp.value, emailErr)) {
        let registerEmail = email_inp.value;
        let registerPassword = password1.value;
        let user = JSON.stringify({email: registerEmail, password: registerPassword});
        let request = new XMLHttpRequest();
        request.open('POST', '/registration', true);
        request.addEventListener('load', () => {
            let receivedUser = JSON.parse(request.response);
            console.log(user)
            console.log(receivedUser);
        })
        request.send(user);
    }

})


