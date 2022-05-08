export const CheckPass =(textContent, PassErr)=>{

    let condition1 = /(?=.*\d)/; //should contain atleast 1 digit
    let condition2 = /(?=.*[a-z])/; //should contain atleast 1 lowercase
    let condition3 = /(?=.*[A-Z])/; //should contain atleast 1 uppercase
    let condition4 = /[a-zA-Z0-9]{8,}/; //should contain atleast 8 characters
    PassErr.style.color ="red";
    // if(!textContent.match(condition1)){
    //     PassErr.innerHTML='should contain atleast 1 digit';
    //     return false;
    // }
    // else if(!textContent.match(condition2)){
    //     PassErr.innerHTML='should contain atleast 1 lowercase';
    //     return false;
    // }
    // else if(!textContent.match(condition3)){
    //     PassErr.innerHTML='should contain atleast 1 uppercase';
    //     return false;
    // }
     if(!textContent.match(condition4)){
        PassErr.innerHTML='should contain atleast 8 characters';
        return false
        }
    else{ PassErr.style.color="green";
        PassErr.innerHTML="password is good";
        return true}
}
