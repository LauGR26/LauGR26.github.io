import { obtenerProductos } from '../Controllers/conection.js'; // Ajusta la ruta según la ubicación de tu archivo

// Función para llenar la tabla con productos
const cargarProductos = async () => {
    const tableBody = document.getElementById('productos-table-body'); // Obtener el elemento de la tabla
    const cargando = document.getElementById('cargando'); // Obtener el elemento de carga

    // Mostrar el mensaje de carga
    cargando.style.display = 'table-row';

    try {
        const productos = await obtenerProductos(); // Llamar a la función para obtener productos

        // Limpiar la tabla antes de llenar
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
            `;
            tableBody.appendChild(row); // Agregar la fila a la tabla
        });
    } catch (error) {
        console.error("Error al cargar productos: ", error);
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Error al cargar productos</td></tr>';
    } finally {
        // Ocultar el mensaje de carga
        cargando.style.display = 'none';
    }
};

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', cargarProductos);
