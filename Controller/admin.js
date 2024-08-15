const btnLogout = document.getElementById('btnlogout');


btnLogout.addEventListener('click', () => {
    
    alert('Sesión de administrador cerrada');
    
    window.location.href = '/index.html';
});
