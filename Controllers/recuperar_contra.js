import { userstate, verificationcod}from "../Controllers/conection.js";

userstate()

const enviarCorreo = document.getElementById('btnRecuperar')
const atrasSesion = document.getElementById('btnatras')

async function recuperarContraseña() {
    const email = document.getElementById('edtemail').value;

    try {
        const validation = await verificationcod(email);
        alert("Reset verification successful: " + email);
        // Redirecciona al administrador
        window.location.href = "../Templates/main_admin.html";
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ${errorCode}: ${errorMessage}`);
    }
}

async function atras() {
    window.location.href = "../Templates/main_admin.html"
    
}

window.addEventListener('DOMContentLoaded',async()=>{
    enviarCorreo.addEventListener('click',recuperarContraseña)
    atrasSesion.addEventListener('click',atras)
})