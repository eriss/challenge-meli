/*
En este archivo voy a definir los controles de que se pasen correctamente los paramatros en la peticion.
*/
exports.params_freq_word = (in_file=false,nombre_doc='',termino='')=>{
    
    //console.log('el nombre del documento es ',nombre_doc);
    //console.log('lo que va a buscar es: ',termino);
    
    var mensaje='';
    var error = false;
    if(!termino) mensaje = "No se especifico el parámetro term";
    
    if(in_file){
        if(!nombre_doc) mensaje = "No se especifico el parámetro doc_name";
        if(!nombre_doc && !termino) mensaje='No se espeficico los parámetros doc_name y term';
    }
    

    if(mensaje.length>0)
        error=true;

    const retorno=[];
    retorno.error=error;
    retorno.mensaje=mensaje;    

    return retorno;
};