/* PUBLIC

	getDesarrolloName()
	getNumberOfTotalDeptos()
	getTorresName()
	getPisosEnTorre(twr)
	getObjectTorreNivelDeptos()
	getDeptosFromTorreAndNivel(twr, lvl)
	getDeptosFromTorreDefOrUndefNivel(twr, lvl)
	getAllkeysJSONModel()
	getCompradosInYear(year)
	ordenarDeptosDeMasAntiguo(_getfechaCompra_Dev_Deptos)
	getComprados_Devueltos_In(compra_O_devolucion, date_month_year, data)
	
*/

class DesarrolloDataFromJSON {
	constructor(model){
		this.model = model;
		this.JSONOk = false;
		this._isJSONModelOk()
	}

	_getUniqueElementsInArray(array){

		
		let unique = array.filter( (value, index, self) => {

				return self.indexOf(value) === index;
		} ); 

		return unique
	}

	_countingRepeatedElementsInArray(array) {
		let counts = {};
		array.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
		return counts;
	}


	_removingNombreDesarrollo() {

		let keys = this._getKeys()
		let keysWithoutDesarrolloName = [];

		for (let i = 0; i < keys.length ; i++) {
			keysWithoutDesarrolloName.push(keys[i].substring(keys[i].indexOf("-")+1));
		}

		return keysWithoutDesarrolloName;

	}


	_isJSONModelOk() {


		let arrayAllEqual = [];

		for(let i in this.model){

			if (i.indexOf("-") === -1) {

				this.JSONOk = false;
					
			} 

			arrayAllEqual.push(i.substring(0,i.indexOf("-")));
		}

		if (this._getUniqueElementsInArray(arrayAllEqual).length === 1) {
			this.JSONOk = true;
		}


	}



	_getKeys(){

		let keyArray = [];

		if(this.JSONOk) {

			for (let i in this.model) {
				keyArray.push(i)
			}
			return keyArray;
		}
		
	}


	getDesarrolloName() {

		let getAKey = this._getKeys()[0];

		if (this.JSONOk) {

			return (getAKey.substring(0,getAKey.indexOf("-")))
		}

	}



	getNumberOfTotalDeptos() {

		let numberDeptos = 0;

		for(let i in this.model){
			numberDeptos ++
		
		}
		return numberDeptos;
	}

	getTorresName(){


		let keys = this._removingNombreDesarrollo()
	
		if(this.JSONOk){

			let arrayOfTorres = [];

			for (let i = 0; i < keys.length; i++) {

				arrayOfTorres.push(keys[i].substring(0,keys[i].indexOf("-")))
				
			}
			
			return(this._getUniqueElementsInArray(arrayOfTorres))

		}

	}

	_getArrayTorre_Piso(){

		let torreLevel = this._removingNombreDesarrollo();
		let indexes = this._getIndexNumberOfElementInString(torreLevel[0], "-")
		

		let levels = torreLevel[0].substring(torreLevel[0].indexOf("-")+1).indexOf("-")

		
		
		let arrayTorrePiso = [];
		let obj = {}; 

		for (let i = 0; i < torreLevel.length; i++) {
			
			arrayTorrePiso.push(torreLevel[i].substring(0,indexes[1]));
		}

		return arrayTorrePiso;

	}

	_matchTorresNameConRestoCadena(torre_piso_depto_method) {
		let dataTorre = torre_piso_depto_method;
		let objectsArray = []
		let obj1 = {}
		let responseArray = [];


		let indexes = this._getIndexNumberOfElementInString(dataTorre[0], "-")
		let uniqueKeysTwr = this.getTorresName();


		for (let i = 0; i < uniqueKeysTwr.length; i++) {
			objectsArray[i] = [];
		}

		for (let i = 0; i < dataTorre.length; i++) {
			for (let j = 0; j < uniqueKeysTwr.length; j++) {
				if (dataTorre[i].substring(0, indexes[0]) === uniqueKeysTwr[j]) {

					objectsArray[j].push('"'+dataTorre[i].substring(indexes[0]+1)+'"')

					obj1[j] = uniqueKeysTwr[j]
					
				}
			}
		}

		responseArray.push(obj1);
		responseArray.push(objectsArray);
	

		return(responseArray)

	}


	_getNivelesEnTorres() {


		let objmatch = this._matchTorresNameConRestoCadena(this._getArrayTorre_Piso());
		
		let dataTorre = this._getArrayTorre_Piso();
		let objectsArray = objmatch[1];
		let obj1 = objmatch[0];
		let objformato = "";


		for (let i = 0; i < objectsArray.length; i++) {

			if (i === objectsArray.length -1) {
				objformato += '"' + obj1[i] + '": ['+ objectsArray[i] +']'
			} else {
				objformato += '"' + obj1[i] + '": ['+ objectsArray[i] +'],'
			}
			
			
		}

	
		return (JSON.parse("{"+ objformato + "}"))
	}

	getPisosEnTorre(twr) {
		let nivelesYTorres = this._getNivelesEnTorres()

		
		let niveles = this._countingRepeatedElementsInArray(nivelesYTorres[twr])
	
		return niveles;

	
	}


	_getIndexNumberOfElementInString(str, element){

		let indices = [];
		for(let i=0; i<str.length;i++) {
    		if (str[i] === element) indices.push(i); 
    
		}


		return indices;
	}

	_getArrayTorre_Piso_Depto(){


		let desarrolloData = this._removingNombreDesarrollo()
		let arrayTorrePisoDepto = [];

		let indices = this._getIndexNumberOfElementInString(desarrolloData[0], "-")

		for (let i = 0; i < desarrolloData.length; i++) {
			let string1 = desarrolloData[i].substring(0, indices[1])
			let string2 = desarrolloData[i].substring(indices[2])
			arrayTorrePisoDepto.push(string1+string2)
		}
		
		
		return(arrayTorrePisoDepto)
	}

	_getTorresNivelesDeptosArraysMatch(){

		let desarrollo = this._matchTorresNameConRestoCadena(this._getArrayTorre_Piso_Depto());
		let index = this._getIndexNumberOfElementInString(desarrollo[1][0][0], "-");

		let nivelTorre = [],  nivelNivel = [], nivelDepto = [];
	
		let str1Format = "", str2Format = "";


		for (var i = 0; i < desarrollo[1].length; i++) {
			for (var j = 0; j < desarrollo[1][i].length; j++) {
				
				let str1Index = this._getIndexNumberOfElementInString(desarrollo[1][i][j].substring(0, index[0]), '"');
				let str2Index = this._getIndexNumberOfElementInString(desarrollo[1][i][j].substring(index[0]+1), '"');

				if (str1Index[0] === 0 || str1Index.length === 0 ) {
					str1Format = desarrollo[1][i][j].substring(1, index[0]);
				} else {
					str1Format = desarrollo[1][i][j].substring(0, index[0])
				}

				if (str2Index[0] === 0 || str2Index.length === 0 ) {
					str2Format = desarrollo[1][i][j].substring(index[0]+1);
				} else {
					str2Format = desarrollo[1][i][j].substring(index[0]+1, index[0]+str2Index[0]+1)
				}

				nivelTorre.push(desarrollo[0][i]);
				nivelNivel.push(str1Format);
				nivelDepto.push(str2Format);
			}	
		}

		return({"torre" : nivelTorre,  "nivel" : nivelNivel, "deptos" :nivelDepto})

	}


	getObjectTorreNivelDeptos() {

		let arrays = this._getTorresNivelesDeptosArraysMatch()
		
		let uniqueTorres = this._getUniqueElementsInArray(arrays.torre)
		let uniqueLevels = this._getUniqueElementsInArray(arrays.nivel)

		let response = [];

		for (var i = 0; i < arrays.torre.length; i++) {
			for (var j = 0; j < uniqueTorres.length; j++) {

				for (var k = 0; k < uniqueLevels.length; k++) {
					if(arrays.torre[i] === uniqueTorres[j]){
						if (arrays.nivel[i] === uniqueLevels[k]) {

							response.push({"dpto" : arrays.deptos[i], "torre" : uniqueTorres[j], "nivel" : uniqueLevels[k]})
						}
					}
				}
				
			}
		}

		return response

	}

	getDeptosFromTorreDefOrUndefNivel(twr, lvl){

		let obj = this.getObjectTorreNivelDeptos();
		let responseDeptos = [];

		for (let i = 0; i < obj.length; i++) {

			if (lvl === undefined) {
				if (obj[i].torre === twr) {
					responseDeptos.push(obj[i].dpto)
				}

			} else if(obj[i].torre === twr && obj[i].nivel === lvl) {
				responseDeptos.push(obj[i].dpto)
			}
		}

		return responseDeptos;
	}

	createKeyFromTwrLvlAndDepto(tw, lvl, dpto) {

		let desarrolloName = this.getDesarrolloName();

		return(desarrolloName+"-"+tw+"-"+lvl+"-P-"+dpto)
	}


	getAllkeysJSONModel(){

		return (Object.keys(this.model))
	}
	
	_getFechasCompra_DevolucionDeptos(compra_o_devolucion) {

		let keys = this.getAllkeysJSONModel();
		let response = [];
		
		for (var i = 0; i < keys.length; i++) {

			if (compra_o_devolucion === "compra") {
				for (var j = 0; j < this.model[keys[i]].fecha_compra.length; j++) {
					response.push({"fecha" : this.model[keys[i]].fecha_compra[j], "key" : keys[i]});
				}

			} else if (compra_o_devolucion === "devolucion"){
				for (var j = 0; j < this.model[keys[i]].fecha_devolucion.length; j++) {
					response.push({"fecha" : this.model[keys[i]].fecha_devolucion[j], "key" : keys[i]});
				}
			}
			
			
		}

		return response;
	}


	ordenarDeptosDeMasAntiguo(_getfechaCompra_Dev_Deptos) {
		let fechas = _getfechaCompra_Dev_Deptos;
		let fechasKeys = [];
		let newDateFormmat = [];

		for (var i = 0; i < fechas.length; i++) {
			fechasKeys.push(Object.keys(fechas[i].fecha)[0])
		}

		let uniqueLevelsKeys = (this._getUniqueElementsInArray(fechasKeys));

		
		for (var i = 0; i < fechas.length; i++) {


			for (var j = 0; j < uniqueLevelsKeys.length; j++) {
				if((fechas[i].fecha)[uniqueLevelsKeys[j]] != undefined) {
					if (fechas[i].fecha[uniqueLevelsKeys[j]] != "") {
						let x = (fechas[i].fecha)[uniqueLevelsKeys[j]];
						let newDate = new Date(x.split("/").reverse().join("-"));

						newDate.setDate(newDate.getDate()+1)
						newDateFormmat.push({"date": newDate, "key" : fechas[i].key});
					}				
				}
			}
			
		}

		newDateFormmat.sort(function(a,b){
  			
  			return a.date - b.date;
		});


		return (newDateFormmat)
	}


	getComprados_Devueltos_In (compra_O_devolucion, month_year, data) {

		let deptosEnOrden;


		if (compra_O_devolucion === "compra") {
			deptosEnOrden = this.ordenarDeptosDeMasAntiguo(this._getFechasCompra_DevolucionDeptos("compra"));
		} else if (compra_O_devolucion === "devolucion") {
			deptosEnOrden = this.ordenarDeptosDeMasAntiguo(this._getFechasCompra_DevolucionDeptos("devolucion"));
		}

		
		let response = [];
		let datesInJSON;

		for (var i = 0; i < deptosEnOrden.length; i++) {

			if (month_year === "year") {
				datesInJSON = String(deptosEnOrden[i].date.getFullYear());
			} else if(month_year === "month") {

				datesInJSON = String(deptosEnOrden[i].date.getMonth());
			} 
			
			
			if (datesInJSON === data) {
				response.push(deptosEnOrden[i])
			}
		}

		return response;
	}


	





}

