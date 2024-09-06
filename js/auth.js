function login (){
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    if (usuario == "admin" && contrasena == "admin.1"){
        localStorage.setItem("sesion", "true");
        Swal.fire({
            title: "Bienvenido!",
            text: "Has iniciado sesion!!!",
            icon: "success"
        }).then(() => {
            window.location.href = "index.html";
        });
    }else{
        Swal.fire({
            title: "Error!",
            text: "Las credenciales no son validas!",
            icon: "error"
        }).then(() => {
            window.location.href = "login.html";
        })
        return;
    }
}

function verificar(){
    if (localStorage.getItem("sesion") == "true"){
        //window.location.href = "index.html";
    }else{
        window.location.href = "login.html";
    }
}

function logout(){
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Estas seguro de cerrar la sesion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("sesion");
            window.location.href = "login.html";
        }
    });
}