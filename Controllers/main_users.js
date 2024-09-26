import {logout, userstate, verificationcod,getCurrentUser}from "../Controllers/conection.js";

userstate()

const cerrar = document.getElementById('btnlogout')
const recuperar = document.getElementById('btnrecuperar')
const verProducto = document.getElementById('btnVerProd')

async function recuperarContra() {
    window.location.href = "../Templates/recuperar_contra_user.html";
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

window.addEventListener('DOMContentLoaded', async()=>{
    cerrar.addEventListener('click',sesion)
    recuperar.addEventListener('click',recuperarContra)
    verProducto.addEventListener('click',productos)
})