var express = require('express');
var router = express.Router();

var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");

/* GET home page. */
router.get('/', function(req, res, next) {
    Zombie.find().exec(function(error,zombies){
        if(!error){
        console.log(zombies);
        res.render('index', { title: 'Colección de Zombies', coleccion: zombies});
        }
    });  
});

router.get('/zombies/add', function(req, res){
    res.render('add', {mensajeError: '', mensajeExito: ''});
});

router.post('/zombies/new', function(req, res){
    var data = req.body;

    var nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });
    nuevoZombie.save(function(error){
        if(error){
            var mensaje = error.message;
            res.render('add', {mensajeError: mensaje, mensajeExito: ''});
        }
        else {
            res.render('add', {mensajeError:'', mensajeExito: 'Se agregó un nuevo zombie!'});
        }
    });
});

router.get("/prueba",function(req, res){
    res.send("<h1>Esto es una prueba.</h1>");
});

router.get("/cerebros",function(req, res){
    Cerebro.find().exec(function(error,cerebros){
        if(!error){
        console.log(cerebros);
        res.render('cerebros/index.ejs', { title: 'Colección de Cerebros', coleccion: cerebros});
        }
    });
});

router.get('/cerebros/add', function(req, res){
    res.render('cerebros/add.ejs', {mensajeErrorC: '', mensajeExitoC: ''});
});

router.post('/cerebros/new', function(req, res){
    var dataC = req.body;

    var nuevoCerebro = new Cerebro({
        flavor: dataC.flavor,
        description: dataC.description,
        iq: dataC.iq,
        picture: dataC.picture
    });
    nuevoCerebro.save(function(error){
        if(error){
            var mensajeC = error.message;
            res.render('cerebros/add.ejs', {mensajeErrorC: mensajeC, mensajeExitoC: ''});
        }
        else {
            res.render('cerebros/add.ejs', {mensajeErrorC:'', mensajeExitoC: 'Se agregó un nuevo cerebro!'});
        }
    });
});

module.exports = router;
