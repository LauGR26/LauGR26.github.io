import { registerauth,verification,userstate} from "../conection.js";
userstate()

const crear = document.getElementById('btncrear')
const atras = document.getElementById('btnatras')

function validarContraseña(pw){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pw);
}
async function atrasSesion() {
    window.location.href = "/Templates/Admin/main_admin.html";
}

async function register() {
    try {
        const email = document.getElementById('edtuser').value;
        const confirmEmail = document.getElementById('edtconfiuser').value;
        const psw = document.getElementById('edtpsw').value;
        const confirmPsw = document.getElementById('edtconfipsw').value;

        // Verificar si el correo y la contraseña coinciden
        if (email !== confirmEmail) {
            alert('Los correos electrónicos no coinciden.');
            return;
        }if (psw !== confirmPsw) {
            alert('Las contraseñas no coinciden.');
            return;
        }if(!validarContraseña(psw)){
            alert('La contraseña debe tener al menos 8 caracteres,incluyendo mayúsculas, minúsculas, números y caracteres especiales.');
            return;
        }

        const userCredential = await registerauth(email, psw);
        const user = userCredential.user;

        // Enviar correo de verificación
        await verification();
        alert('El usuario se registró exitosamente. Verifique su correo para continuar.');
        window.location.href = "/Templates/Admin/registro.html";
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error(`Código de error: ${error.code}`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('edtpsw');
    const confirmPasswordInput = document.getElementById('edtconfipsw');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('change', () => {
        if (togglePassword.checked) {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password'; 
        }
    });
});

    window.addEventListener('DOMContentLoaded',async()=>{
        crear.addEventListener('click',register)
        atras.addEventListener('click',atrasSesion)
    })