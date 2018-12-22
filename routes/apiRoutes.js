const express = require('express')
const router = express.Router();
const path = require('path');
const users = [
    {
      id: 1,
      nombre: "Ada",
      apellido: "Lovelace",
      telefono: "1234567890",
      email: "contacto@gmail.com"
    },
    {
      id: 2,
      nombre: "Grace",
      apellido: "Hopper",
      telefono: "087654321",
      email: "contacto@hotmail.com"
    },
    {
        id: 3,
        nombre: "lala",
        apellido: "fer",
        telefono: "34442233",
        email: "ff@hotmail.com"
      }
  ];
  let contador = 4;

router.get("/users", function(req, res){
    res.json(users);
});
router.get("/users/:id", (req, res) => {
    // 0) Recupero el parametro id
    const userId = parseInt(req.params.id);
    // 1) findIndex
    // const userIndex = users.findIndex(user => user.id === userId)
    // 2) Devuelvo la posicion del array
    // res.json(users[userIndex])
  
    // 2) find (!!)
    const user = users.find(user => user.id === userId);
    res.json(user);
});

router.get('/users', function(req, res){
    let search = req.query.search;
    search = search.toLowerCase();
  
    // chequea si search esta definido y su longitud
    if (search && search.length > 0){
    // otra forma posible
    // if (typeof search !== 'undefined' && search.length > 0)
    // creo la lista filtrada
        let usersFiltrados =[];
        for (let i = 0; i < users.length; i++) {
           const nombre = users[i].nombre.toLowerCase();
           const apellido = users[i].apellido.toLowerCase();
           const telefono = users[i].telefono.toLowerCase();
           const mail = users[i].mail.toLowerCase();
       if (nombre.indexOf(search)>=0 || apellido.indexOf(search)>=0 || telefono.indexOf(search)>=0 || mail.indexOf(search)>=0){
           usersFiltrados.push(users[i]);
       }
            
        };
        return res.json(usersFiltrados)

}
    

});
router.delete("/users/:id", function(req, res){
    // agarro el ID que recibo por parametro
    // req.params.id   que lo recibo como strign, y lo paso a enterp con parseInt
    const userId = parseInt(req.params.id);


    // Necesito saber en que posicion esta el objeto asiq ue uso findIndex
    // array.findIndex(criterio de busqueda)
    // una vez que tengo el user le pido que splice
    userId.splice(users.findIndex(user => user.id == userId), 1);
    // devuelvo el array modificado
    res.json(users);

});

router.put("/users/:id", (req, res) =>{
    //necesito que la url que ingrese vaya a buscar cada usuario
    //(mis objetos), los encuentre y modifique ese atributo
    //imago que tendré que hacer algo con req.body
    const idUser = parseInt(req.params.id)
    const miUser = users.find(u => u.id === idUser)
    miUser.nombre = req.body.nombre || miUser.nombre;
    miUser.apellido = req.body.apellido || miUser.apellido;
    miUser.email = req.body.email || miUser.email;
    miUser.telefono = req.body.telfono || miUser.telefono;
   
   
   
    res.json(miUser)
   })





router.post('/users', function(req, res){
    //   la info que me llega desde la web es esta:
//    { nombre: "",
//     apellido: "",
//     telefono: "",
//     email: ""}

const newUser = req.body;
newUser.id = contador++
// agrego el usuario al arrya de users
users.push(newUser);
res.json(users);
});



module.exports=router
