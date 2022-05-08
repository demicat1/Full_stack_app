export const checkSecondPass =(textContent,firstPass, PassErr)=>{
    PassErr.style.color="red";
    if(textContent !== firstPass){
        PassErr.innerHTML ="Passords are not the same";
        return false;
    }
    else{
        PassErr.style.color ="green"
        PassErr.innerHTML = "passwords match";
        return true;
    }
}