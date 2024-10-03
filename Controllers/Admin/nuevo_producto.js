import { Addregister } from "../../Controllers/conection.js";

const guardar = document.getElementById('btnregister');

async function registrar() {
    const cod = document.getElementById('edtcodigo').value;
    const name = document.getElementById('edtname').value;
    const desc = document.getElementById('edtdesc').value;
    const cant = document.getElementById('edtcantidad').value;

    // Validaciones de campos vacíos
    if (!cod || !name || !desc || !cant) {
        alert("Todos los campos son obligatorios.");
        return; 
    }

    try {
        await Addregister(cod, name, desc, cant);
        alert('El producto se registró exitosamente.');
        window.location.href = "/Templates/nuevo_producto.html";
    } catch (error) {
        alert('Registro fallido. Inténtalo nuevamente.');
        console.error("Error al registrar el producto: ", error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    guardar.addEventListener('click', registrar);
});
