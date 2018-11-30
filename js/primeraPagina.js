$(  ).ready( () => builtElements());




var builtElements = () => {
	
	var keys = Object.keys(newPage);


	for (var i = 0; i < keys.length; i++) {
		 $(".grid-container").append("<div id="+keys[i]+" class='grid-item'><div class='image-grid-container'><img src='"+newPage[keys[i]].img+"'/></div><br>"+newPage[keys[i]].nombre_desarrollo+"</div>")
		$($(".grid-container").children()[i]).bind("click", {id:keys[i]}, function(event) {
			
			var data = event.data;

			selectDesarrollo(data.id)
		});
	}
}


function selectDesarrollo(des) {

	console.log(des)
	window.location.assign("internaDesarrollos.html?sgs="+des)
	
}


