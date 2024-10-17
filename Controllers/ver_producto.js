import { obtenerProductos, Getregister } from '../Controllers/conection.js'; 



const buscar = document.getElementById('btnbuscar');
const imprimir = document.getElementById('cont');

// Función para llenar la tabla con productos
async function cargarProductos(){
    const tableBody = document.getElementById('productos-table-body'); // Obtener el elemento de la tabla
    const cargando = document.getElementById('cargando'); // Obtener el elemento de carga
    
    cargando.style.display = 'table-row';

    try {
        const productos = await obtenerProductos(); // Llamar a la función para obtener productos

        tableBody.innerHTML = '';

        // Verificar si hay productos
        if (productos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos registrados</td></tr>';
            return;
        }

        // Llenar la tabla con los productos
        productos.forEach(producto => {
            const row = document.createElement('tr'); // Crear una nueva fila
            row.innerHTML = `
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td><img src="${producto.urlimagen}" alt="Imagen del producto" style="width: 100px; height: auto;"></td>
            `;
            tableBody.appendChild(row); 
        });
    } catch (error) {
        console.error("Error al cargar productos: ", error);
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Error al cargar productos</td></tr>';
    } finally {
        cargando.style.display = 'none';
    }
};


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
        console.error('Error:', error);
    }  
}

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    // Enlazar evento al botón de búsqueda
    const buscar = document.getElementById('btnbuscar');
    buscar.addEventListener('click', Ver);
});