class UsuarioNuevo {
    constructor(nombre, correo, nombreUsuario, contrasenna) {
        this.nombre = nombre;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contrasenna = contrasenna
    }
}


//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__nuevoUsuario").addEventListener("click", guardarUsuario);
document.getElementById("btn__registrarse").addEventListener("click", register);
document.getElementById("btn__ingresar").addEventListener("click", ingresar);
window.addEventListener("resize", anchoPage);

//Declarando variables
let formulario_login = document.querySelector(".formulario__login");
let formulario_register = document.querySelector(".formulario__register");
let contenedor_login_register = document.querySelector(".contenedor__login-register");
let caja_trasera_login = document.querySelector(".caja__trasera-login");
let caja_trasera_register = document.querySelector(".caja__trasera-register");

//FUNCIONES
function ingresar(e) {
    e.preventDefault();
    let email = $("#correoUsuarioR").val()
    let pass = $("#passwordUsuarioR").val()
    let users = JSON.parse(localStorage.getItem("usuarios"))
    let estaRegistrado = users.some(u => u.correo == email && u.contrasenna == pass)
    if (estaRegistrado) {
        location.href = "./home.html"
    } else {
        alert("Datos invalidos")
    }

}


function guardarUsuario(e) {
    e.preventDefault();
    let listadoUsuarios = JSON.parse(localStorage.getItem('usuarios'))
    // si no encuentra el elemento en cache te inicializa el array vacio
    if (listadoUsuarios == null) listadoUsuarios = []
    let listado = new UsuarioNuevo($("#nombreUsuarioN").val(), $("#correoUsuarioN").val(), $("#UsuarioN").val(), $("#contrasennaUsuarioN").val());
    listadoUsuarios.push(listado);
    localStorage.setItem('usuarios', JSON.stringify(listadoUsuarios));
}

function anchoPage() {

    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();
function iniciarSesion() {

    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {

    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

//Guardar y validar al hacer click 
$("#btn__nuevoUsuario").click((e) => {
    if ($("#nombreUsuarioN").val() != "" && $("#correoUsuarioN").val() != "" && $("#UsuarioN").val() != "" && $("#contrasennaUsuarioN").val() != "") {
        swal("Excelente!", "Te registraste correctamente!", "success");
        guardarUsuario(e)
    }
});