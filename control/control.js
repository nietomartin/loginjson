var acceso_validado=0;
var usuario_logeado;

$(function(){
	//Se ocultan las áreas de login, el area de trabajo del administrador y el area de trabajo del usuario
	console.log("Estoy en function()");
	$("#form_datos").hide();
	//$("#principal").hide();
});
/*
function func()
{
	console.log("Estoy en func()");
	$("#form_datos").hide();
}
*/
function logearse()
{
    event.preventDefault();
    //alert("llegué a la funcion logearse()");
	console.log("llegué a la funcion logearse()");
	var n_usuario = $('#usuario_login').val();
	var p_clave = $('#palabra_clave').val();
	//alert("usuario : "+n_usuario+", clave : "+p_clave);
	console.log("usuario : "+n_usuario+", clave : "+p_clave);
	acceso_validado=0;
	/*************************************************************************************************************
	* Pese a que se lee un json, utilizo Ajax para poder hacer el proceso sincronicamente, sino tenemos un error *
	* puesto que por defecto la lectura del json a traves de getjson es asincronica, es decir enenvia la peticion*
	* al server pero el script continua la ejecucion y las variables no se alcanzan a procesar                   *
	**************************************************************************************************************/
	$.ajax({
	  url: "data/usersdb.json",
	  dataType: 'json',
	  async: false,
	  success: function(data) 
	  {
		$.each( data, function( key, val ) 
		{
			if (key==n_usuario ) 
				if (val==p_clave) 
				{
					acceso_validado=1;
					usuario_logeado=n_usuario;
				}
		});
		}
	});
	if(acceso_validado==1)
	{
		alert("Bienvenido " + n_usuario);
		console.log("Bienvenido " + n_usuario);
		$("#form_ingreso").hide();
		//document.getElementById("centro").innerHTML="Bienvenido "+n_usuario;
		$("#form_datos").show();
	}
	else
	{
		alert ("Disculpe, pero debe corregir el nombre de usuario o la clave para poder ingresar");
	}
}

function registrar()
{
	var bandera=false;
	console.log("\nEstoy en registrar()");
	alert("\nEstoy en registrar()");
	var cedula= $("#cedula").val();
	var nombre= $("#nombre").val();
	var apellido= $("#apellido").val();
	var ciudad= $("#ciudad").val();
	var fecha_registro= $("#fecha_registro").val();
	console.log("cedula : "+cedula+", nombre: "+nombre+", apellido : "+apellido+", ciudad : "+ciudad+", fecha_registro : "+fecha_registro);
	alert("cedula : "+cedula+", nombre: "+nombre+", apellido : "+apellido+", ciudad : "+ciudad+", fecha_registro : "+fecha_registro);
	
	var datos = []; //arreglo
	datos.push({ 
		"cedula"    : cedula,
		"nombre"    : nombre,
		"apellido"  : apellido,
		"ciudad"    : ciudad,
		"fecha_registro": fecha_registro
	});
	alert("hice el push, veamos el nombre : "+datos[0].nombre);
	var objeto = {}; //objeto
	objeto.clientes = datos;
	//Esta es una visualizacion en pantalla, temporal para pruebas
	//$("#res").text(JSON.stringify(objeto.clientes));
	console.log(JSON.stringify(objeto.clientes));
	alert(JSON.stringify(objeto.clientes));
	console.log("llamo a ajax para que registre en la BD....");
	//alert("llamo a ajax para que registre en la BD....");
	var cad=JSON.stringify(objeto);
	$.ajax({
		type:"POST",
		url:"control/proc.php",
		data:{
			v_cad:cad
		},
		dataType: 'text', 
		beforeSend: function(x)	{},
		success: function(data)
		{
			console.log("\nla respuesta : "+data);
			if(data=="OK")
			{
			    alert("El cliente ha sido registrado en la base de datos Json !!!");
				$("#form_datos").hide();
				//$("#res").hide(); 
				//$("#principal").show();
				window.location.href = "http://localhost/loginjson/pagina.html";
			}
			else
			{
				alert("Su base de datos de clientes NO ha podido ser actualizada");
			}
		},
		error: function(error) 	
		{ 
			console.log("Se presento un error : " + error) 
		},
		error: function( jqXHR, textStatus, errorThrown ) 
		{
			if (jqXHR.status === 0) { console.log('Not connect: Verify Network.');  } 
			else if (jqXHR.status == 404) { console.log('Requested page not found [404]'); } 
					else if (jqXHR.status == 500) { console.log('Internal Server Error [500].');  } 
							else if (textStatus === 'parsererror') {	console.log('Requested JSON parse failed.');  } 
									else if (textStatus === 'timeout') {console.log('Time out error.');  } 
											else if (textStatus === 'abort') { console.log('Ajax request aborted.');  } 
													else { console.log('Uncaught Error: ' + jqXHR.responseText); 	}
        },
		complete: function() {}
	});
}