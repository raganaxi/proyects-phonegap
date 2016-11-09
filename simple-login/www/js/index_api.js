$(document).bind("mobileinit", function(){
	
	$.mobile.defaultPageTransition = "slidedown";
	$.mobile.loadingMessage = "Cargando app.";
	
	
	
});
$('document').ready(function()
{ 
	document.addEventListener("deviceready", main, false);
	function main(){
		validate_function();
		is_login();
		$("#logout").click(function(event) {
			event.preventDefault();
			logout();
		}); 
	}
	function validate_function(){
		/* validation */
		$("#login-form").validate({
			rules:
			{
				password: {
					required: true,
				},
				user_email: {
					required: true,
					email: true
				},
			},
			messages:
			{
				password:{
					required: "please enter your password"
				},
				user_email: "please enter your email address",
			},
			submitHandler: submitForm 
		});  
		/* validation */
	}
	/* login submit */
	function submitForm()
	{  
		var data = $("#login-form").serialize();

		$.ajax({

			type : 'POST',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			url  : 'http://pruebasapi.esy.es/admin/login2/api/login.php',
			dataType: "json",
			data : data,
			cache: false,
			beforeSend: function()
			{ 
				$("#error").fadeOut();
				$("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
			},
		})
		.done(function( data, textStatus, jqXHR ) {
			if(data.continuar==="ok"){

				$("#btn-login").html('<img src="btn-ajax-loader.gif" /> &nbsp; Signing In ...');      
				$.mobile.changePage("#home");
				is_login();
			}
			else{

				$("#error").fadeIn(1000, function(){      
					$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data+' !</div>');
					$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
				});
			}
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente." );
			}
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
			}
		});

	}
	/* login submit */
	function is_login(){
		
		var data = {'action': 'sesion'};
		$.ajax({
			type : 'POST',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			url  : 'http://pruebasapi.esy.es/admin/login2/api/login.php',
			dataType: "json",
			data : data,
			cache: false,
		})
		.done(function( data, textStatus, jqXHR ) {
			if(data.continuar==="ok"){
				$("#saludo").html('<h2> Bienvenido a la aplicacion </h2>'+
					'<h3> Su usuario y password son válidos</h3>'+'<p>hola '+data.datos.nombre+'</p>'+
					'Device Model: '    + device.model    + '<br />' +
					'Device Cordova: '  + device.cordova  + '<br />' +
					'Device Platform: ' + device.platform + '<br />' +
					'Device UUID: '     + device.uuid     + '<br />' +
					'Device Version: '  + device.version  + '<br />'
					);
				var element = document.getElementById('deviceProperties');
				
			}
			else{
				if(data.error!="error")
				{
					$("#error").fadeIn(1000, function(){      
						$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data.mensaje+' !</div>');
						$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
					});
					$.mobile.changePage("#login");
				}				
			}
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente." );
			}
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
			}
		});
	}
	function logout(){
		var data = {'action': 'logout'};
		$.ajax({
			type : 'POST',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			url  : 'http://pruebasapi.esy.es/admin/login2/api/login.php',
			dataType: "json",
			data : data,
			cache: false,
		})
		.done(function( data, textStatus, jqXHR ) {
			if(data.continuar==="ok"){
				$("#saludo").html('<div class="alert alert-success"> <span class="glyphicon glyphicon-info-sign"></span>'+data.datos.nombre+' su session a terminado correctamente </div>');
			}
			else{
				if(data.error!="error")
				{
					$("#saludo").html("");
					$("#error").fadeIn(1000, function(){      
						$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data.mensaje+' !</div>');
						$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
					});
					$.mobile.changePage("#login");
				}				
			}
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente." );
			}
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
			}
		});
	}
});