export const emailcheck= (textContent , emailError)=> {
    const condition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.style.color = 'red';
    if (!textContent.match(condition)) {
        emailError.style.display = "block";
        emailError.innerHTML = '';
        emailError.innerHTML = 'invalid email';
        return false;
    }
    // else if(textContent=='') {
    //     emailError.innerHTML = "We'll never share your email with anyone else";
    // }else
    //  {
    //     emailError.style.color = "gray";
    //     emailError.innerHTML = "We'll never share your email with anyone else";
    //     return true;
    // }
}