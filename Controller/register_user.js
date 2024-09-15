import { registerauth,verification,userstate} from "../Controllers/conection.js";
userstate()

const crear = document.getElementById('btncrear')
const atras = document.getElementById('btnatras')

async function atrasSesion() {
    window.location.href = "../Templates/main_admin.html";
}

async function register() {
    try {
    const email = document.getElementById('edtuser').value;
    const psw = document.getElementById('edtpsw').value;
    const userCredential = await registerauth(email, psw);
    const user = userCredential.user;

    // Envia el correo de verificación
    await verification();
    alert('El usuario se registró exitosamente. Verifique su correo para continuar.');
    window.location.href = "../Templates/registro.html";
    } catch (error) {
    // Capturar cualquier error durante el proceso de registro o verificación
    alert(`Error: ${error.message}`);
    console.error(`Código de error: ${error.code}`, error);
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
    window.addEventListener('DOMContentLoaded',async()=>{
        crear.addEventListener('click',register)
        atras.addEventListener('click',atrasSesion)
    })