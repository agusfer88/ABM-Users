$('#btn-guarda').click(function(){
const nombre = $('input[name="nombre"]').val();
const apellido = $('input[name="apellido"]').val();
const telefono = $('input[name="telefono"]').val();
console.log(telefono)
const email = $('input[name="email"]').val();

const validarNumero = /^\d+$/;
const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// si el tecto cumple con la validacion retorna true
if(validarNumero.test(telefono)=== false){
    alert('el fono tiene que ser un numero')
    return;
}
if(validarEmail.test(email)=== false){
    alert('el mail no es valido')
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
    alert('usuario creado!');
    location.href = '/users';
  })
  .fail(function (err) {
    alert('salio mal');
    console.log('salio todo mal: ', err);
  })
});