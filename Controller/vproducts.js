import { viewproducts, eliminarUsuarios, actualizarUsuario } from "../Controller/firebase.js";

const ver = document.getElementById('vdata');
const searchCedula = document.getElementById('searchCedula');

async function cargar(cedula = '') {
    ver.innerHTML = '';
    const docref = await viewproducts(); 
    docref.forEach((doc) => {
        const data = doc.data(); 
        if (cedula === '' || data.cedula.includes(cedula)) {
            ver.innerHTML += `
                <tr>
                    <td>${data.nombres}</td>
                    <td>${data.apellidos}</td>
                    <td>${data.fecha}</td>
                    <td>${data.telefono}</td>
                    <td>${data.direccion}</td>
                    <td>${data.email}</td>
                    <td>${doc.id}</td> <!-- Agrega el User ID aquí -->
                    <td>${data.tipoCuenta}</td>
                    <td>
                        <button type="button" class="btn btn-danger deleteUserBtn" data-bs-toggle="modal" data-bs-target="#deleteUserModal" data-cedula="${data.cedula}">Eliminar</button>
                        <button type="button" class="btn btn-primary editUserBtn" data-bs-toggle="modal" data-bs-target="#editUserModal" data-id="${doc.id}" data-nombres="${data.nombres}" data-apellidos="${data.apellidos}" data-fecha="${data.fecha}" data-estado="${data.estado}" data-rh="${data.rh}" data-genero="${data.genero}" data-telefono="${data.telefono}" data-direccion="${data.direccion}">Editar</button>
                    </td>
                </tr>
            `;
        }
    });

    document.querySelectorAll('.deleteUserBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const cedula = event.currentTarget.getAttribute('data-cedula');
            document.getElementById('cedulaToDelete').value = cedula;
        });
    });

    document.querySelectorAll('.editUserBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const button = event.currentTarget;
            document.getElementById('userIdToUpdate').value = button.getAttribute('data-id'); // Asegúrate de tener un input oculto con este ID
            document.getElementById('updNombres').value = button.getAttribute('data-nombres');
            document.getElementById('updApellidos').value = button.getAttribute('data-apellidos');
            document.getElementById('updTelefono').value = button.getAttribute('data-telefono');
            document.getElementById('updDireccion').value = button.getAttribute('data-direccion');
        });
    });
}

searchCedula.addEventListener('input', () => {
    cargar(searchCedula.value);
});

window.addEventListener('DOMContentLoaded', async () => {
    await cargar(); 
});

document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const cedula = document.getElementById('cedulaToDelete').value;

    try {
        await eliminarUsuarios(cedula);
        alert('Usuario eliminado correctamente');
        location.reload();
    } catch (error) {
        alert('Error al eliminar el usuario:', error);
    }
});

document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const cedula = document.getElementById('userIdToUpdate').value; // Use hidden input to get the user ID
    const nombres = document.getElementById('updNombres').value;
    const apellidos = document.getElementById('updApellidos').value;
    const fecha = document.getElementById('updFecha').value;
    const telefono = document.getElementById('updTelefono').value;
    const direccion = document.getElementById('updDireccion').value;

    try {
        await actualizarUsuario(cedula, { nombres, apellidos, fecha, telefono, direccion });
        alert('Usuario actualizado correctamente');
        location.reload();
    } catch (error) {
        alert('Error al actualizar el usuario:', error);
    }
});
