import { userstate, verificationcod,getCurrentUser}from "../Controllers/conection.js";

userstate()

const recuperar = document.getElementById('btnRecuperar')
const atras = document.getElementById('btnatras')

async function atrasSesion() {
    window.location.href = "../Templates/main_user.html";
}

async function recuperarContraseña() {
    const email = document.getElementById('edtemail').value;

    // Obtener el usuario actual autenticado
    const currentUser = getCurrentUser();

    // Verificar si el correo ingresado coincide con el del usuario actual
    if (currentUser && currentUser.email === email) {
        try {
            await verificationcod(email);
            alert("Reset verification successful for " + email);
            window.location.href = "../Templates/main_user.html";
        } catch (error) {
            alert("Error al verificar el código de recuperación: " + error.message);
            console.error('Error al verificar el código de recuperación:', error);
        }
    } else {
        alert("No tienes permiso para cambiar la contraseña de esta cuenta.");
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    recuperar.addEventListener('click',recuperarContraseña)
    atras.addEventListener('click', atrasSesion)
})