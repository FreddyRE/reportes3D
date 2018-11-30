$(  ).ready( () => adecuarInterface());



var adecuarInterface = () => {



	let newModel = new DesarrolloDataFromJSON(eval(desarrollo_ID));
	let arrayComprasModel = newModel.ordenarDeptosDeMasAntiguo(newModel._getFechasCompra_DevolucionDeptos("compra"));

	dataTimeLineDispatch(arrayComprasModel)


}

function getUniqueDataInArray(array){

	var unique = array.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

	return unique
}


var dataTimeLineDispatch = (compras) => {

	
	let dimension = compras.length
	let arrayToVerifyYears = [];
	let arrayToVerifyMonths = [];
	let uniqueYears = [];

	for (var i = 0; i < dimension; i++) {
		arrayToVerifyYears.push(compras[i].date.getFullYear());
		arrayToVerifyMonths.push(compras[i].date.getMonth());
	}

	uniqueYears = getUniqueDataInArray(arrayToVerifyYears);
	
	let counterRepetitiveMonths = 1;
	let departamentosCompradosEnMesesArray = [];

	for (var i = 0; i < arrayToVerifyMonths.length; i++) {
		if (i <= arrayToVerifyMonths.length -1 ) {
			if (arrayToVerifyMonths[i] === arrayToVerifyMonths[i+1]){
				counterRepetitiveMonths++;
			} else {
				
				departamentosCompradosEnMesesArray.push(arrayToVerifyMonths[i]+"-"+counterRepetitiveMonths)
				counterRepetitiveMonths = 1;				
			}
		}

	}	
	
	if (uniqueYears.length >= 24) {
		timeLineInyears();
	} else if (departamentosCompradosEnMesesArray.length >= 24) {
		timelineInMonths(departamentosCompradosEnMesesArray);
	} else {
		timeLineInDays();
	}

}

function convertFromNumbrerToMonthString(arrayWithFormat) {

	for (var i = 0; i < arrayWithFormat.length; i++) {
		switch (arrayWithFormat[i].substring(0, arrayWithFormat[i].indexOf("-"))) {

			case "0" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Enero"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "1" :
				arrayWithFormat.push(arrayWithFormat[i] = "Febrero"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "2" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Marzo"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "3" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Abril"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "4" :
				arrayWithFormat.push(arrayWithFormat[i] = "Mayo"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "5" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Junio"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "6" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Julio"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "7" :
				arrayWithFormat.push(arrayWithFormat[i] = "Agosto"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "8" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Septiembre"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "9" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Octubre"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "10" :
				arrayWithFormat.push(arrayWithFormat[i] = "Noviembre"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
			case "11" : 
				arrayWithFormat.push(arrayWithFormat[i] = "Diciembre"+"-"+arrayWithFormat[i].substring(arrayWithFormat[i].indexOf("-")+1));
				break;
		}
	}

	return arrayWithFormat
}

function timeLineInyears(){

}

function timelineInMonths(meses){
	var mesesFormat = convertFromNumbrerToMonthString(meses)
	let numeroParaDividir = 1;


	console.log(mesesFormat)

	for (var i = 2; i < mesesFormat.length; i++) {
		
		if (i < 24 && mesesFormat.length%i === 0) {
			numeroParaDividir = mesesFormat.length/i
		}
	}


	for (var i = 0; i < mesesFormat.length; i+=numeroParaDividir) {
		console.log(mesesFormat[i])
	}
	
	
	

}
 

function timeLineInDays() {

}
	


