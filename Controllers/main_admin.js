import {logout, userstate, verificationcod}from "../Controllers/conection.js";

userstate()

const crear = document.getElementById('btnCrear')
const recuperar =document.getElementById('btnRecuperar')
const cerrar = document.getElementById('btnCerrarSesion')
const nuevoProducto = document.getElementById('btnNuevoProd')
const verProducto = document.getElementById('btnVerProd')

async function crearResgistro() {
    window.location.href = "../Templates/registro.html"
}
async function recuperarContraseña() {
    window.location.href = "../Templates/recuperar_contraseña.html"
}

async function agregarProducto() {
    window.location.href = "../Templates/nuevo_producto.html"
}

async function productos() {
    window.location.href = "../Templates/ver_producto.html"
    
}


async function sesion(){
    try {
    await logout();
    alert('Sesión cerrada');
    window.location.href = "../index.html";
    } catch (error) {
    alert('Error al cerrar sesión: ' + error.message);
    console.error('Error al cerrar sesión:', error);
    }
}

window.addEventListener('DOMContentLoaded',async()=>{
    cerrar.addEventListener('click', sesion)
    crear.addEventListener('click', crearResgistro)
    recuperar.addEventListener('click', recuperarContraseña)
    nuevoProducto.addEventListener('click', agregarProducto)
    verProducto.addEventListener('click',productos)
})


