const URL = "https://dog.ceo/api/breeds/image"

class Turno {
    constructor(propietario, mascota, consulta, date) {
        this.propietario = propietario;
        this.mascota = mascota;
        this.consulta = consulta;
        this.date = date
    }
}

//Funcion para cargar los datos cacheados desde el inicio
function actualizarTabla() {
    //limpio tabla
    $('#tabla-datos').empty()
    //inserto elementos del local storage
    let listadoTurnos = JSON.parse(localStorage.getItem('turnos'))
    if (listadoTurnos != null && listadoTurnos.length > 0) {
        //Listar en la tabla
        listadoTurnos.forEach(turno => {
            let turnoHTML = `<tr>
                        <td>${turno.propietario}</td>
                        <td>${turno.mascota}</td>
                        <td>${turno.consulta}</td>
                        <td>${turno.date}</td>
                        <td><button id="boton_eliminar" type="button" onclick="eliminar(${listadoTurnos.indexOf(turno)})" class=" far fa-trash-alt btn btn-danger"></button></td>
                        </tr>`
            $("#tabla-datos").prepend(turnoHTML);
        });
    }
}

//Funcion para capturar los datos de los imputs
function guardar(e) {
    e.preventDefault();

    let listadoTurnos = JSON.parse(localStorage.getItem('turnos'))
    // si no encuentra el elemento en cache te inicializa el array vacio
    if (listadoTurnos == null) listadoTurnos = []
    let turno = new Turno($("#propietario").val(), $("#mascota").val(), $("#consulta").val(), moment().format("DD/MM/YY hh:mm"));
    listadoTurnos.push(turno);
    localStorage.setItem('turnos', JSON.stringify(listadoTurnos));
    actualizarTabla();
}

function eliminar(index) {
    //obtener al array cache
    let listadoTurnos = JSON.parse(localStorage.getItem('turnos'))
    //borrar del array 
    listadoTurnos.splice(index, 1);
    //pisar los datos con el array y el elemento borrado
    localStorage.setItem('turnos', JSON.stringify(listadoTurnos));
    //actualizo vista
    actualizarTabla();
}

//Guardar al hacer click 
$("#boton_agregar").click((e) => {
    if ($("#propietario").val() != "" && $("#mascota").val() != "" && $("#consulta").val() != "") {
        swal("Excelente!", "Agregaste un nuevo cliente!", "success");
        guardar(e)
    }
});
actualizarTabla();

//Mostrar y ocualtar la tabla con los datos cargados
$(document).ready(()=>{
    $("#tabla").fadeOut();
    $("#mostrar").click(()=>{
        $("#tabla").fadeIn();
    });
    $("#ocultar").click(()=>{
        $("#tabla").fadeOut();
    });
});

$("tr").on("mouseover", function(){
    $(this).css("background-color", "#A9CCE3");
})
$("tr").on("mouseleave", function(){
    $(this).css("background-color", "#EBF5FB");
})

$("#titulo").css("color", "#2E86C1")
    .slideUp(0)
    .delay(1000)  
    .slideDown(2000)
    
//////AJAX///////
$("#mostrarFotos").click(()=> {
    console.log("entro2")
    $.get(`${URL}/random/10`, function(res, state){
        if(state === "success") {
            console.log(res);
            for(const message of res.message) {
                $(".fila2").append(`
                                <div class="card col-sm-3 m-4">
                                    <img src="${message}"/>
                                </div>`)
            }
        }
    });
});

$("#ocultarFotos").click(() => { 
    $(".card").slideUp("fast");
});