$(document).ready(function() {

	$('#envio_datos').click(function(){

		var url = 'http://localhost:8080/';
		
		var nombre = $('#coger_nombre').val();
		var apellido = $('#coger_apellido').val();	
		var telefono = $('#coger_telefono').val();
		
		$.ajax({
		   url: '/contactos/' + nombre + '/' + apellido + '/' + telefono,
		   type: 'PUT',
		   success: function(data) {
				alert(data);
		   }
		});

		$('#envio_datos').css('display', 'none');
		$('#confirmo_datos').css('display', 'block');
	});
	
	$('#confirmo_datos').click(function(){
		
		var url = 'http://localhost:8080/';
		
		var nombre = $('#coger_nombre').val();
		var apellido = $('#coger_apellido').val();	
		var telefono = $('#coger_telefono').val();
		
		$.post(url + 'contactos/' + nombre + '/' + apellido + '/' + telefono, function( data) {
			alert(data);
		});
		
		$('#coger_nombre').val('');
		$('#coger_apellido').val('');	
		$('#coger_telefono').val('');
		$('#confirmo_datos').css('display', 'none');
		$('#envio_datos').css('display', 'block');
		
	});
	
	
	$('#mostrar_agenda').click(function(){

		var url = 'http://localhost:8080/';
		window.location = url + 'agenda/contactos';
		
	});
	
	$('#buscar_datos').click(function(){

		var url = 'http://localhost:8080/';

		$.get(url + 'agenda/' + $('#buscar_nombre').val(), function(data){
		
			if ( data == $('#buscar_nombre').val() + " no encontrado"){
				$('#buscar_nombre').val('');
				$('#muestra_nombre').val('');
				$('#datos_nom').text('');
				$('#muestra_apellido').val('');
				$('#datos_ap').text('');
				$('#muestra_telefono').val('');
				$('#datos_tel').text('');
				$('#no_contacto_buscar').val('ESTE CONTACTO NO EXISTE EN NUESTRA AGENDA');
			}else{
				$('#buscar_nombre').val('');
				$('#no_contacto_buscar').val('');
				$('#datos_nom').text('Nombre => ');
				$('#muestra_nombre').val(data.nombre);
				$('#datos_ap').text('Apellido => ');
				$('#muestra_apellido').val(data.apellido);
				$('#datos_tel').text('Telefono => ');
				$('#muestra_telefono').val(data.telefono);
			}
			
		});
	});
	
	$('#eliminar_contacto').click(function(){

		var url = 'http://localhost:8080/';
		
		$.ajax({
		   url: url + 'agenda/' +  $('#eliminar_nombre').val(),
		   type: 'DELETE',
		   success: function(data) {
				
			if ( data == $('#eliminar_nombre').val() + " no encontrado"){
				$('#eliminar_nombre').val('');
				$('#no_contacto_eliminar').val('ESTE CONTACTO NO EXISTE EN NUESTRA AGENDA');
			}else{
				$('#eliminar_nombre').val('');
				$('#no_contacto_eliminar').val('CONTACTO ELIMINADO');
			}
		   }
		});

	});
	
});



