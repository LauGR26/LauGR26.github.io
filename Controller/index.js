document.getElementById('loginbtn').addEventListener('click', function(event) {
    event.preventDefault();

    const email = document.getElementById('edtemail').value.trim();
    const password = document.getElementById('edtpassword').value.trim();

    const usuarioEmail = "usuario@gmail.com";
    const adminEmail = "admin@gmail.com";
    const validPassword = "clave123*";

    if (email === usuarioEmail && password === validPassword) {
        alert("Bienvenido Usuario");
        window.location.href = "/Templates/Home.html";
    } else if (email === adminEmail && password === validPassword) {
        alert("Bienvenido Administrador");
        window.location.href = "/Templates/Admin.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
});
