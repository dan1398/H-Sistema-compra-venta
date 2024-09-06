var clientes = JSON.parse(localStorage.getItem("clientes")) || [];
var seleccionado = null;
setearDatos();

function registrarCliente() {
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var documento = document.getElementById("documento").value;
    var tipo = document.getElementById("tipo").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;


    if (nombre == "" || apellidos == "" || documento == "" || tipo == "" || telefono == "" || correo == "") {
        Swal.fire({   
            title: "Faltan datos!",   
            text: "Por favor rellene todos los campos del formulario!",   
            icon: "warning"
        });
        return;
    }

    var cliente = {
        nombre: nombre,
        apellidos: apellidos,
        documento: documento,
        tipo: tipo,
        telefono: telefono,
        correo: correo,
        
    }
    if (seleccionado != null) {
        clientes[seleccionado] = cliente;
    }else{
        clientes.push(cliente);
    }
    
    localStorage.setItem("clientes", JSON.stringify(clientes));

    window.location.href = "clientes.html";
}

function cargarDatosCliente() {

    var cadena = '';
    for (let i = 0; i < clientes.length; i++) {
        cadena += `
            <tr>
                <td>${i + 1}</td>
                <td>${clientes[i].nombre}</td>
                <td>${clientes[i].apellidos}</td>
                <td>${clientes[i].documento}</td>
                <td>${clientes[i].tipo}</td>
                <td>${clientes[i].telefono}</td>
                <td>${clientes[i].correo}</td>
                <td>
                    <div class="acciones">
                        <button onclick="editarcliente(${i})"  class="btn btn-edit m5">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button onclick="eliminarcliente(${i})" class="btn btn-delete m5">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    if (clientes.length == 0) {
        cadena += `<tr>
                        <td colspan="7" align="center">
                            <br>
                            <br>
                                No hay clientes registrados!
                                <br>
                                <br>
                                <br>
                                <a href="clientesForm.html" class="btn btn-nuevo">
                                    <i class="fa fa-plus"></i>
                                    Nuevo
                                </a>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                    </tr>
        `
    }

    document.getElementById("listaClientes").innerHTML = cadena;
}

function eliminarcliente(posicion) {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "El cliente se eliminara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            clientes.splice(posicion, 1);
            localStorage.setItem("clientes", JSON.stringify(clientes));
            cargarDatosCliente();

            Swal.fire({
                title: 'Eliminado!',
                text: 'El cliente ha sido eliminado.',
                icon: 'success'
            });
        }
    });
}

function editarcliente(posicion) {
    localStorage.setItem('cliente_seleccionado', posicion);

    window.location.href = 'clientesForm.html';
}

function setearDatos(){
    seleccionado = localStorage.getItem('cliente_seleccionado');
    if(seleccionado != null && seleccionado >=0 && seleccionado != undefined){
        var elClien = clientes[seleccionado];

        document.getElementById("nombre").value = elClien.nombre;
        document.getElementById("apellidos").value = elClien.apellidos;
        document.getElementById("documento").value = elClien.documento;
        document.getElementById("tipo").value = elClien.tipo;
        document.getElementById("telefono").value = elClien.telefono;
        document.getElementById("correo").value = elClien.correo;
    }
}

function buscarCliente() {
    var buscador = document.getElementById("buscar").value;
    var nuevoArray = [];

    if(buscador.trim() == "" || buscador.trim() == null){
        nuevoArray = JSON.parse(localStorage.getItem("clientes")) || [];
    }else{
        for (let i = 0; i < clientes.length; i++) {
            var texto = clientes[i].nombre.toLowerCase();
            if(texto.search(buscador.toLowerCase()) >= 0){
                nuevoArray.push(clientes[i]);
            }
        }
    }
    clientes = nuevoArray;
    cargarDatosCliente();
}