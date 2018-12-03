/*Public 

getAllObjs()
getAlleKeysOfModel3D()
getAllKeysOfDeptosOrNot(true_False)
getObjsDeptosOrNot(true_false)
getAllMeshesToPaint()

*/
class getDataModel3D {
	constructor(modelo3d){
		this._modelo3d = modelo3d;
	}


	_replaceUnderScoreWithScoreOrNot(true_false, array){


		var nameUnderScore = [];
		for(var i in array) {
			if (true_false === true) {
				nameUnderScore.push(array[i].replace(/_/g, "-"))
			} else if (true_false === false) {
				nameUnderScore.push(array[i].replace(/-/g, "_"))
			}
			
		}
		

		return nameUnderScore

	}


	getAllObjs() {
		return this._modelo3d.children[0].children
	}

	getAlleKeysOfModel3D() {
		let allObjs = this.getAllObjs();


		let keys = [];

		for (var i in allObjs) {
			keys.push(allObjs[i].name)
		}

		var underScored = this._replaceUnderScoreWithScoreOrNot(true, keys)

		return underScored
	}

	getAllKeysOfDeptosOrNot(true_false){
		let keys = this.getAlleKeysOfModel3D()
		let res = [];

		for (var i in keys) {
			if (keys[i].length === 18 && true_false) {
				res.push(keys[i])
			} else if(keys[i].length !== 18){
				res.push(keys[i])
			}
		}

		var underScored = this._replaceUnderScoreWithScoreOrNot(true, res)

		return underScored;
	}

	getObjsDeptosOrNot(true_false) {
		var allObjs = this.getAllObjs();
		var res = [];

		for (var i in allObjs) {
			if(allObjs[i].name.length === 18 && true_false) {
				res.push(allObjs[i])
			} else if(allObjs[i].name.length !== 18 && true_false === false) {
				res.push(allObjs[i])
			}
		}

		return res

	}

	getAllMeshesToPaint(){
		var objDeptos = this.getObjsDeptosOrNot(true)
		var res = [];

		for (var i in objDeptos) {
			res.push(objDeptos[i].children[0])
		}

		return res;

	}

	




}
