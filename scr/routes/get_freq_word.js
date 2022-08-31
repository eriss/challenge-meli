const express = require('express');
const ruta = express.Router();

const logica_frecuencia_all = (req,res)=>{
    
    const datos = req.query;
    const nombre_doc = datos['doc_name'];
    const termino = datos['term']; 
    
    const params_Controller = require('../../controllers/params_Controller.js');
    const params_correctos = params_Controller.params_freq_word(false,nombre_doc,termino);
    
    //console.log('La variable params_correctos contiene:');
    //console.log(params_correctos);
    
    if(params_correctos['error']){
        res.json({'error':params_correctos['mensaje']});
    }else{
        
        //Hago la conexion a la base de datos (instale sqlite3)
        const db_sqlite = require('../../controllers/querys_Controller.js');
        //voy a crear la tabla si es que no existe;
        db_sqlite.crear_tabla().then(()=>{
            /*
            Primero voy hacer una consulta a la base, porque si es una palabra que ya se busco, va a estar registrada en la base
            */
            db_sqlite.existe_registro(termino,'freq_word',false).then( (result)=>{
                //console.log('existe el registro en la base???',result);
                const existe_db = result;    
                if(existe_db==0){
                    const fs = require('../../controllers/fs_Controller.js');
                    fs.get_inserts(termino).then( (result)=>{
                        db_sqlite.insert_registro('freq_word',result).then(()=>{
                            //luego que hace el insert con la frecuencia que aparece el termino en cada palabra=>
                            //hago un sum a la base y listo
                            db_sqlite.get_freq_in_all_file(termino,'freq_word').then((resultado)=>{
                                //console.log('la frecuencia de todos los archivos es:');
                                res.json({'frecuencia':resultado['frequency']});
                            });
                        });
                    });
                }else{
                    db_sqlite.get_freq_in_all_file(termino,'freq_word').then((result)=>{
                        
                        res.json({'frecuencia':result['frequency']});
                    });
                }
            });
        })
    }
}

ruta.get('/',logica_frecuencia_all);

module.exports = ruta;