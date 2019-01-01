// 1) Recuperar el parametro id de la url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// 2) Recuperar los nodos con jQuery de mi HTML
const $nombre = $('input[name="nombre"]');
const $apellido = $('input[name="apellido"]');
const $telefono = $('input[name="telefono"]');
const $email = $('input[name="email"]');
// 3) Le pido al servidor la info del usuario con ese id
$.ajax(`/api/users/${id}`).done(function(user) {
  $nombre.val(user.nombre);
  $apellido.val(user.apellido);
  $telefono.val(user.telefono);
  $email.val(user.email);
});

// agregar la funcion para el button de guardar(metodoput)

$('#btn-guardar').click(function () {
    // 
    const editUser={
        nombre: $nombre.val(),
        apellido:  $apellido.val(),
        telefono: $telefono.val(),
        mail: $email.val()
    }
    // 
    // 
    $.ajax(`http://localhost:3002/api/users/${id}`, {
    // $.ajax(`/api/users/${id}`, {
      method: "PUT",
      data: editUser,
      success: function() {
        $("#success p").html("Cambios guardados!");
        $("#success").modal();
      },
      
    })
    // .done(function(){
    //     // alert('usuario modificado!');
    //     alert('usuario guardado');
    //     location.href = '/users';
    //   })
      // .fail(function (err) {
        
      //   alert('salio mal');
      //   console.log('salio todo mal: ', err);
      // })
  });