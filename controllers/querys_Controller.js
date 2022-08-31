/* 
En este script se definien funciones que hacen consultas a la db
*/

const db = require('../data_base/conexion_db.js');

/* 
Funcion que crea la tabla 'freq_word' si no existe
*/
const crear_tabla = ()=>{
    return new Promise((resolve,reject)=>{
        const q_create_table = 'CREATE TABLE IF NOT EXISTS "freq_word" ("file_name"	TEXT NOT NULL,"find_word"	TEXT NOT NULL, "frequency"	INTEGER NOT NULL DEFAULT 0, "accion"	TEXT NOT NULL)';
        db.run(q_create_table,(err)=>{
            if(err)return reject(err);
            resolve(true);
        });
    });
};

/*
Funcion que hace inserta registros a la base, en la tabla 'table' y con valores 'values', pasados por parametro
*/
const insert_registro =  (table,values)=>{
    const query = "INSERT INTO "+table+" VALUES "+values;
    return new Promise((resolve,reject)=>{
        db.run(query,(err)=>{
            if(err)return reject(err);
            resolve(true);
        });
    });
};

/* 
Funcion que me devuelve true o false, dependiendo si existe el registro en la tabla freq_word
*/
const existe_registro =  (termino,accion,find_file,archivo='')=>{
    return new Promise((resolve,reject)=>{
        var query = "SELECT 1 FROM freq_word WHERE find_word=? AND accion=?";
        if(find_file)
            query=query+" AND file_name='"+archivo+"' ";
        db.all(query,[termino,accion],(err,rows)=>{
            if(err)return reject(err);
            resolve(rows.length);
        });
    });
};

/* 
Devuelve la frecuencia de un termino en un archivo haciendo la consulta con los parametros que recibe
*/
const get_frecuencia_in_file = (archivo,termino,accion)=>{
    return new Promise((resolve,reject)=>{
        const query = "SELECT frequency FROM freq_word WHERE file_name=? AND find_word=? AND accion=?";
        db.all(query,[archivo,termino,accion],(err,rows)=>{
            if(err)return reject(err);
            rows.forEach(row=>{
                frecuencia=row;
            });
            resolve(frecuencia);
        });
    });
};

/*
Devuelve la suma de la frecuncia de todos los archivos
*/
const get_freq_in_all_file = (termino,accion)=>{
    return new Promise((resolve,reject)=>{
        const query = "SELECT SUM(frequency) as frequency FROM freq_word WHERE find_word=? AND accion=?";
        db.all(query,[termino,accion],(err,rows)=>{
            if(err)return reject(err);
            rows.forEach(row=>{
                frecuencia=row;
            });
            resolve(frecuencia);
        });
    });
};
const db_sqlite = {};
db_sqlite.crear_tabla = crear_tabla;
db_sqlite.insert_registro = insert_registro;
db_sqlite.existe_registro = existe_registro;
db_sqlite.get_frecuencia_in_file = get_frecuencia_in_file;
db_sqlite.get_freq_in_all_file = get_freq_in_all_file;

module.exports = db_sqlite;