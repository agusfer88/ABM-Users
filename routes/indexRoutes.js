const express = require('express')
const router = express.Router();
const path = require('path');

router.get('/ping', function(req, res){
    res.send('pong');
});

router.get("/users/new", function(req, res){
    res.sendFile(path.join(__dirname, "..", "", "new.html"));
});

router.get("/api/users/test", function(req, res){
    res.sendFile(path.join(__dirname, "..", "", "test.html"));
});

router.get("/users", function(req, res){
    res.sendFile(path.join(__dirname, "..", "", "users.html"));
});

router.get("/users/edit", function(req, res){
    res.sendFile(path.join(__dirname, "..", "", "edit.html"));
});


// tengo que armar la ruta para guardar en users el user modificado 
// igual a esto:
// RUTA para editar un todo
router.put('/users/:id', function(req, res, next) {
    // leo el archivo todos.json y lo parseo para obtener el array
    const users = JSON.parse( fs.readFileSync('users.json') );
    // voy a buscar el todo especifico que quiero editar
    const user = users.find(t => t.id === req.params.id)
    // si el todo no existe, respondo con un 404
    if (!user) {
      return res.status(404).end('el todo que queres editar, no existe!');
    }
    // si los datos que me llegaron no estan bien, respondo con un 400 y un mensaje avisando que esta mal el objeto
    if (!esValido(req.body)) {
      return res.status(400).end('el todo que queres agregar, es incorrecto');
    }
    // solo modifico las propiedades que quiero y puedo modificar (en este caso, solo .text)
    user.nombre = req.body.nombre;
    user.apellido = req.body.apellido;
    user.telefono = req.body.telefono;
    user.mail = req.body.mail
    // como modifique el objeto, vuelvo a grabarlo en el archivo
    fs.writeFileSync('users.json', JSON.stringify(users));
    // finalmente respondo con el array de todos modificado
    res.json(users);
  });

module.exports = router;
