/*
Archivo con la configuracion y conexion a la base de datos (sqlite3).
*/
const sqlite3 = require('sqlite3').verbose();//verbose nos permite ver mejor el error en caso de que suceda
//const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(error)=>{
const db = new sqlite3.Database('./data_base/challenge.db',sqlite3.OPEN_READWRITE,(error)=>{    
if(error) return console.log('error: ',error.message);
    //console.log('ESTOY CONECTADO A LA DB');
});

module.exports = db;