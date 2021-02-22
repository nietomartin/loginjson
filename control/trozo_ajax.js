$.ajax({
		type: "POST",
		url: "datacontrol/procesos.php",
		data:	{
					accion: v_accion,
					//identificacion:$('#modlgn-username').val(),
					usuario:n_usuario,
					clave:p_clave
				},
		dataType: 'json', 
		beforeSend: function(x)		{},
		success: function(data)
		{
			//////console.log("el nombre de usuario retornado desde php es : " + data[0].fullname);		
			n_usuario =  data[0].fullname;
			if(data != null)
			{
			    $("#area_login").addClass('hidden');    // se oculta el area de login
			}
			else
			{
				mensaje_usuario_nologeado();
			}
		},
		error: function( jqXHR, textStatus, errorThrown ) 
		{
			if (jqXHR.status === 0) { alert('Not connect: Verify Network.');  } 
			else if (jqXHR.status == 404) { alert('Requested page not found [404]'); } 
					else if (jqXHR.status == 500) { alert('Internal Server Error [500].');  } 
							else if (textStatus === 'parsererror') {	alert('Requested JSON parse failed.');  } 
									else if (textStatus === 'timeout') {alert('Time out error.');  } 
											else if (textStatus === 'abort') { alert('Ajax request aborted.');  } 
													else { alert('Uncaught Error: ' + jqXHR.responseText); 	}
        },
		complete: function() {}
	});
