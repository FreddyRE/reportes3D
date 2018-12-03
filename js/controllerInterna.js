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

				departamentosCompradosEnMesesArray.push(arrayToVerifyMonths[i]+"-"+counterRepetitiveMonths+"-"+compras[i].date.getFullYear())
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
		

		switch (arrayWithFormat[i]) {

			case 1 : 
				arrayWithFormat[i] = "ENE"
				break;
			case 2 :
				arrayWithFormat[i] = "FEB"
				break;
			case 3 : 
				arrayWithFormat[i] = "MAR"
				break;
			case 4 : 
				arrayWithFormat[i] = "ABR";
				break;
			case 5 : 
				arrayWithFormat[i] = "MAY";
				break;
			case 6 :
				arrayWithFormat[i] = "JUN";
				break;
			case 7 : 
				arrayWithFormat[i] = "JUL";
				break;
			case 8 : 
				arrayWithFormat[i] = "AGO";
				break;
			case 9 : 
				arrayWithFormat[i] = "SEP"
				break;
			case 10 :
				arrayWithFormat[i] = "OCT"
				break;
			case 11 : 
				arrayWithFormat[i] = "NOV"
				break;
			case 12 : 
				arrayWithFormat[i] = "DIC";
				break;
			
		}

	}

	return arrayWithFormat
}

function timeLineInyears(){

}

function timelineInMonths(meses){



	let numeroParaDividir = 1;
	let mesesToPaint = [];
	let yearsForMeses = [];
	let counterOfMonths = 0;
	let firstIterator;

	var strFormat = 'parseInt(mesesToPaint[i].substring(0, mesesToPaint[i].indexOf("-")))+1'
	var strFormatNext = 'parseInt(mesesToPaint[i+1].substring(0, mesesToPaint[i+1].indexOf("-")))+1'

	for (var i = 2; i < meses.length; i++) {
		
		if (i < 24 && meses.length%i === 0) {
			numeroParaDividir = meses.length/i
		}
	}

	for (var i = 0; i < meses.length; i+=numeroParaDividir) {

		var yearData = meses[i].substring(meses[i].indexOf("-")+1)
		mesesToPaint.push(meses[i])
		yearsForMeses.push(yearData.substring(yearData.indexOf("-")+1))
	}

	if (meses[meses.length-1] !== mesesToPaint[mesesToPaint.length-1]) {
		mesesToPaint.push(meses[meses.length-1])
		yearsForMeses.push(yearData.substring(yearData.indexOf("-")+1))
	}
	

	var htmlDivImg = "";
	var htmlDivMeses = "";
	var htmlDivYears = "";

	for (var i = 0; i < mesesToPaint.length; i++) {

		htmlDivImg += '<img src="img/divLineaTiempo.jpg" alt="">'
		htmlDivMeses += '<div></div>'
	
	}


	$(".division_linea_tiempo").html(htmlDivImg)
	$(".etiqueta_meses").html(htmlDivMeses)
	$(".etiqueta_years").html(htmlDivMeses)
	
	
	var j = 0;
	var sequenceTimeLineArray = [];


	for (var i = 0; i < mesesToPaint.length-1; i++) {

	
		if (eval(strFormat) > eval(strFormatNext)) {
			for (var k = eval(strFormat); k < 13; k++) {
				if (k === 11) {
					k++
				}
				sequenceTimeLineArray.push(k)
			}

			for (var l = 1; l <= eval(strFormatNext); l++) {
				sequenceTimeLineArray.push(l)
			}
		} else  {
			
			for (  j = eval(strFormat)+1 ; j <= eval(strFormatNext); j++) {

				sequenceTimeLineArray.push(j)
		
			}
		}

	}


	var fistElementSelected = true;
	var iterator= 0;
	var arraysteps =[];

	for (var i = 0; i < mesesToPaint.length; i++) {

		fistElementSelected = true;
		for (var j = iterator; j < sequenceTimeLineArray.length; j++) {
			if (eval(strFormat) === sequenceTimeLineArray[j] && fistElementSelected) {
				fistElementSelected = false;
				iterator = j;
				arraysteps.push(j)
			}
		}
	}	

	var pendienteSteps = (92-7)/(arraysteps[arraysteps.length-1]-arraysteps[arraysteps[0]])

	for (var i = 0; i < arraysteps.length; i++) {

		document.querySelector(".division_linea_tiempo img:nth-child("+parseInt(i+1)+")").style.left = pendienteSteps*arraysteps[i]+7+"%" 

	}

	pintarDivisioMesesYears(mesesToPaint, yearsForMeses, arraysteps, pendienteSteps)
	
}


function pintarDivisioMesesYears(arrayM, arrayY, steps, m){

	var formattedArrayMesesToPaint = []
	var strFormat = 'parseInt(arrayM[i].substring(0, arrayM[i].indexOf("-")))+1'

	for(var i in arrayM) {
		formattedArrayMesesToPaint.push(eval(strFormat))
	}

	arrayWithMonthsLabel = convertFromNumbrerToMonthString(formattedArrayMesesToPaint)



	for (var i = 0; i < arrayWithMonthsLabel.length; i++) {

		document.querySelector(".etiqueta_meses div:nth-child("+parseInt(i+1)+")").innerHTML = arrayWithMonthsLabel[i];
		document.querySelector(".etiqueta_years div:nth-child("+parseInt(i+1)+")").innerHTML = arrayY[i]
	}

	
	for (var i = 0; i < steps.length; i++) {


		document.querySelector(".etiqueta_meses div:nth-child("+parseInt(i+1)+")").style.left = m*steps[i]+5.5+"%" 
		document.querySelector(".etiqueta_years div:nth-child("+parseInt(i+1)+")").style.left = m*steps[i]+6.5+"%" 

	}

	

}
 

function timeLineInDays() {


}
	


