var productos = JSON.parse(localStorage.getItem("productos")) || [];
var seleccionado = null;


function registrarProducto() {
    var producto1 = document.getElementById("producto1").value;
    var precio = document.getElementById("precio").value;
    var costo = document.getElementById("costo").value;
    var stock = document.getElementById("stock").value;

    if (producto1 == "" || costo == "" || precio == "" || stock == "") {
        Swal.fire({   
            title: "Faltan datos!",   
            text: "Por favor rellene todos los campos del formulario!",   
            icon: "warning"
        });
        return;
    }

    var producto = {
        producto1:producto1,
        costo:costo,
        precio:precio,
        stock:stock
    }
    if (seleccionado != null) {
        productos[seleccionado] = producto;
    }else{
        productos.push(producto);
    }
    
    localStorage.setItem("productos", JSON.stringify(productos));

    window.location.href = "productos.html";
}

function cargarDatos() {

    var cadena = '';
    for (let i = 0; i < productos.length; i++) {
        cadena += `
            <tr>
                <td>${i + 1}</td>
                <td>${productos[i].producto1}</td>
                <td>${productos[i].costo}</td>
                <td>${productos[i].precio}</td>
                <td>${productos[i].stock}</td>
                <td>
                    <div class="acciones">
                        <button onclick="editarProducto(${i})"  class="btn btn-edit m5">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button onclick="eliminarProducto(${i})" class="btn btn-delete m5">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    if (productos.length == 0) {
        cadena += `<tr>
                        <td colspan="7" align="center">
                            <br>
                            <br>
                                No hay productos registrados!
                                <br>
                                <br>
                                <br>
                                <a href="productosForm.html" class="btn btn-nuevo">
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

    document.getElementById("listaProductos").innerHTML = cadena;
}

function eliminarProducto(posicion) {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "El producto se eliminara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarDatos();

            Swal.fire({
                title: 'Eliminado!',
                text: 'El producto ha sido eliminado.',
                icon: 'success'
            });
        }
    });
}

function editarProducto(posicion) {
    localStorage.setItem('producto_seleccionado', posicion);

    window.location.href = 'productosForm.html';
}

function setearDatos(){
    seleccionado = localStorage.getItem('producto_seleccionado');
    if(seleccionado != null && seleccionado >=0 && seleccionado != undefined){
        var elProd = productos[seleccionado];
        document.getElementById("producto1").value = elProd.producto1;
        document.getElementById("costo").value = elProd.costo;
        document.getElementById("precio").value = elProd.precio;
        document.getElementById("stock").value = elProd.stock;
    }
}

function buscarProducto() {
    var buscador = document.getElementById("buscar").value;

    var nuevoArray = [];

    if(buscador.trim() == "" || buscador.trim() == null){
        nuevoArray = JSON.parse(localStorage.getItem("productos")) || [];
    }else{
        for (let i = 0; i < productos.length; i++) {
            var texto = productos[i].producto1.toLowerCase();
            if(texto.search(buscador.toLowerCase()) >= 0){
                nuevoArray.push(productos[i]);
            }
        }
    }
    productos = nuevoArray;
    cargarDatos();
}