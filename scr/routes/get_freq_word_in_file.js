const express = require('express');
const ruta = express.Router();

const logica_frecuencia_in_file = (req,res)=>{
    
    const datos = req.query;
    const nombre_doc = datos['doc_name'];
    const termino = datos['term']; 
    
    const params_Controller = require('../../controllers/params_Controller.js');
    const params_correctos = params_Controller.params_freq_word(true,nombre_doc,termino);
    
    //console.log('La variable params_correctos contiene:');
    //console.log(params_correctos);
    
    if(params_correctos['error']){
        res.json({'error':params_correctos['mensaje']});
    }else{
        //Defino la variable db_sqlite que hace la tiene el objecto con las funciones a la db (instale sqlite3)
        const db_sqlite= require('../../controllers/querys_Controller.js');       
        
        //voy a crear la tabla si es que no existe;
        db_sqlite.crear_tabla().then(()=>{
            /*
            Primero voy hacer una consulta a la base, porque si es una palabra que ya se busco, va a estar registrada en la base
            */
            db_sqlite.existe_registro(termino,'freq_word_in_file',true,nombre_doc).then( (result)=>{
                //console.log('existe el registro en la base???',result);
                const existe_db = result;    
                if(existe_db==0){
                    
                    //incluyo fs_Controller, que es donde tengo funciones custom utilizando el modulo fs
                    const fs_Controller = require('../../controllers/fs_Controller.js');
                    var existe_archivo = fs_Controller.exist_file(nombre_doc);

                    //ANTES DE ITERAR SOBRE CADA ARCHIVO. VOY A PREGUNTAR SI EXISTE EL ARCHIVO 
                    if (existe_archivo){
        
                        //obtengo el contenido del archivo y le hago un split y voy contando la frecuencia
                        const contenido = fs_Controller.get_content_file(nombre_doc);
                        const frecuencia= fs_Controller.get_freq_termino(contenido,termino);
                        
                        //registro el dato en la base
                        const values = "('"+nombre_doc+"','"+termino+"',"+frecuencia[termino]+",'freq_word_in_file')";
                        db_sqlite.insert_registro('freq_word',values).then((result)=>{
                            //console.log('se hizo el insert?:',result);
                            if(result)
                                res.json({'frecuencia':frecuencia[termino]});
                            else
                                res.json({error:"Hubo un error al hacer el insert en la base de datos."});   
                        }); 
                        
                    }else{
                        res.json({error:"No existe el doc_name '"+nombre_doc+"' en el directorio"});
                    }
                }else{
                    db_sqlite.get_frecuencia_in_file(nombre_doc,termino,'freq_word_in_file').then((result)=>{
                        res.json({'frecuencia':result['frequency']});
                    });
                }
            });
        });
    }
};

ruta.get('/',logica_frecuencia_in_file); 

module.exports = ruta;
