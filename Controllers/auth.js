import {ctrlaccessuser}from "../Controllers/conection.js";

const login = document.getElementById('btnlogin')

async function logear() {
    const email=document.getElementById('edtuser').value
    const password=document.getElementById('edtpsw').value

    try {
        const validar= await ctrlaccessuser(email,password)
        const user=validar.user

        if(user.email==='galanlaura36@gmail.com'){
            alert('Wellcome Administrator: '+email)
            console.log('Authentication successfull: '+email)
            window.location.href = "/Templates/Admin/main_admin.html";
        }else{
            alert('Wellcome Usuario: '+email)
            console.log('Authentication successfull: '+email)
            window.location.href="/Templates/Users/main_user.html";
        }
     
    } catch (error) {
        alert('Error of Authentication: '+error.message)
        console.log('Error of Authentication: '+error)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('edtpsw');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('change', () => {
        if (togglePassword.checked) {
            passwordInput.type = 'text'; // Mostrar la contraseña
        } else {
            passwordInput.type = 'password'; // Ocultar la contraseña
        }
    });
});


window.addEventListener('DOMContentLoaded',()=>{
    login.addEventListener('click',logear)
});