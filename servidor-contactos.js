var express=require('express');
var fs = require('fs');

var persona = new Array();
var contactos = new Object(persona);

var app = express();
var puerto = process.argv[2]?process.argv[2]:8080;
var portada = fs.readFileSync('index.html','utf8');

app.get('/', function (req, res) { 
    res.send(portada);
});

app.get('/:page', function (req, res) { 
    var js = fs.readFileSync(req.params.page);
    res.contentType('text/javascript');
    res.send(js);
});

app.put('/contactos/:nombre/:apellido/:telefono', function( req, res ) {
	
	persona[0] = "nombre";
	persona[1] = "apellido";
	persona[2] = "telefono";
	
	contactos.nombre = req.params.nombre;
	contactos.apellido = req.params.apellido;
	contactos.telefono = req.params.telefono;
	
	res.send('Se ha creado la persona ' + req.params.nombre + ' con apellido ' + req.params.apellido + ' y telefono ' + req.params.telefono);

});

app.get('/agenda/contactos', function (req, res) {
	
	//VAMOS A MOSTRAR LOS CONTACTOS DE MANERA ORDENADA
	var resultados = '';
	contactos.forEach(function(datos){
		
		if(datos.nombre !== undefined){
			resultados += ("<p>El nombre del contacto: " + datos.nombre + ' ' + datos.apellido + " con teléfono: " + datos.telefono + "</p>");
		}
		
	});
	
	res.send(resultados);
	
});

app.get('/agenda/:nombre', function (req, res){

	var existe = false;

	contactos.forEach(function(datos){
		if(datos.nombre == req.params.nombre){
			existe = true;
			res.send(datos); 
		}
	});
	//CONTROLAMOS SI EL CONTACTO ESTA METIDO
	if(!existe){
		res.send(req.params.nombre + " no encontrado");
	}

});

app.delete('/agenda/:nombre', function (req, res){

	var existe = false;

	contactos.forEach(function(datos){
		if(datos.nombre == req.params.nombre){
			existe = true;
			delete datos.nombre;
			delete datos.apellido;
			delete datos.telefono;
			res.send(datos); 
		}
	});
	//CONTROLAMOS SI EL CONTACTO ESTA METIDO
	if(!existe){
		res.send(req.params.nombre + " no encontrado");
	}

});


app.post('/contactos/:nombre/:apellido/:telefono', function (req, res) { 		
	
	datos = {nombre : req.params.nombre, apellido : req.params.apellido, telefono : req.params.telefono};
	contactos.push(datos);
	res.send('Se ha añadido la persona a la agenda');
    console.log( { 'Post':  contactos} );
});

app.listen(puerto);

console.log('Server running at http://127.0.0.1:'+puerto+'/');