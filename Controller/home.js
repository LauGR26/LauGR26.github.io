const btnLogout = document.getElementById('btnlogout');


btnLogout.addEventListener('click', () => {
    
    alert('Sesión usuario cerrada');
    
    window.location.href = '/index.html';
});
