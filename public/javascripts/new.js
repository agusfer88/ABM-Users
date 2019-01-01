
$('#btn-guarda').click(function(){
const nombre = $('input[name="nombre"]').val();
const apellido = $('input[name="apellido"]').val();
const telefono = $('input[name="telefono"]').val();
const email = $('input[name="email"]').val();

const validarNombre = /^[a-z0-9]+$/i;
const validarNumero = /^\d+$/;
const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// si el tecto cumple con la validacion retorna true
if(validarNombre.test(nombre)=== false){
    $("#error p").html('ingresa un nombre');
    $("#error").modal();

    return;
};
if(validarNombre.test(apellido)=== false){
    $("#error p").html('ingresa un apellido');
    $("#error").modal();

    return;
};
if(validarNumero.test(telefono)=== false){
    $("#error p").html('el fono tiene que ser un numero');
    $("#error").modal();
    // alert('el fono tiene que ser un numero')
    return;
}
if(validarEmail.test(email)=== false){
    $("#error p").html('El mail no es valido');
    $("#error").modal();
    // alert('el mail no es valido')
    return;
}
let elNuevoUsuario = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    email: email
};
$.ajax('http://localhost:3002/api/users', {
    method: 'POST',
    data:elNuevoUsuario
})

.done(function(){

    location.href = '/users';
  })
  .fail(function (err) {
    // $("#error p").html("Something went bad");
    // $("#error").modal();
    alert('salio mal');
    console.log('salio todo mal: ', err);
  })
});