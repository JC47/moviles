var db;
var log = document.getElementById('log');
db = openDatabase("DBTest", "1.0", "BD Ejemplo", 200000);

if(dropRecords()){
	createTable();
}

function createTable() {
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS ejemplo (id INTEGER PRIMARY KEY ASC, nombre TEXT, movimiento TEXT, tiempo TEXT);", [], function(tx) {
			log.innerHTML = 'Tabla Creada'
		}, onError);
	});
}

function dropRecords() {
	db.transaction(function(tx) {
			tx.executeSql("DELETE FROM ejemplo",[],function(tx) {}, onError);
	});
	return true;
}

function onError(tx, error) {
	log.innerHTML += '<p>' +error.message + '</p>';
}

function newRecord(nombre) {
	//var num = Math.round(Math.random() * 10000); //random data
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO ejemplo (nombre, movimiento, tiempo) VALUES(?, ?, ?);", [nombre, 'valor nulo', 'valor nulo'], null, onError);
	});
}

function registrar() {
	var aux = document.getElementById("nombre").value;
	newRecord(aux);
}
