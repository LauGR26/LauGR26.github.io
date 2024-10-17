import { userstate, Addregister,Getregister, archivoimg } from "../conection.js";

userstate()
const guardar = document.getElementById('btnregister');
const buscar = document.getElementById('btnbuscar');
const imprimir = document.getElementById('cont');

async function registrar() {
    const cod = document.getElementById('edtcodigo').value;
    const name = document.getElementById('edtname').value;
    const desc = document.getElementById('edtdesc').value;
    const cant = document.getElementById('edtcantidad').value;
    const avatar = document.getElementById('fileimg').files[0];

    // Validaciones de campos vacíos
    if (!cod || !cod|| !name || !desc || !cant) {
        alert("Todos los campos son obligatorios.");
        return; 
    }

    try {
        let urlarchivo=''
        if(avatar){
        urlarchivo= await archivoimg(avatar,name)
        }

        const verificar = await Addregister(cod,name,desc,cant,urlarchivo)
        alert('Registro exitoso')
        window.location.href='nuevo_producto.html'

    } catch (error) {
        // Manejo de errores en el registro
        console.error('Error al registrar:', error);

        // Mensajes de error personalizados según el tipo de error (si está disponible)
        if (error.message.includes('already exists')) {
            alert('El código ya está registrado.');
        } else {
            alert('Error al registrar. Inténtalo de nuevo.');
        }
    }
}

//Para buscar un producto
async function Ver(){
    const cod=document.getElementById('edtcodigo').value

    try {
        const esperar = Getregister(cod)
        const docSnap = await esperar
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            let Html=""
            Html=`
                <div class="card" style="width: 18rem;">
                <img src="${docSnap.data().urlimagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title" style="color: white;">${docSnap.data().nombre}</h5>
                    <p class="card-text" style="color: white;">Código: ${docSnap.data().codigo}</p>
                    <p class="card-text" style="color: white;">Descripción: ${docSnap.data().descripcion}</p>
                    <p class="card-text" style="color: white;">Cantidad: ${docSnap.data().cantidad}</p>
                    <a href="#" class="btn btn-primary">Delete</a>
                    <a href="#" class="btn btn-primary">Update</a>
                </div>
                </div>
            `
            imprimir.innerHTML=Html
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    } catch (error) {
        console('error',error)
    }  
}


window.addEventListener('DOMContentLoaded', async () => {
    guardar.addEventListener('click', registrar);
    buscar.addEventListener('click', Ver)
});
