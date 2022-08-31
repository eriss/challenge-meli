const fs = require('fs');
const path = require('path'); 
const raiz  = path.join(__dirname, "../");

/* 
Esta funcion se llama desde get_freq_word.js y lo que hace es recorrer cada archivo del directorio y lo voy agregando en una varible con un formato de 'insert into' para que haga el insert en la base y luego haga la consulta directamente ahi
*/
const get_inserts = async (termino)=>{
    return new Promise((resolve,reject)=>{
        var inserts = '';
        fs.readdir('./documentos', async (error,archivos)=>{
            if(error)
                reject(error);
            
            archivos.forEach((archivo)=>{
                var path_file = raiz+'documentos/'+archivo;
                //obtengo el contenido del archivo y le hago un split y voy contando la frecuencia
                const contenido = get_content_file(archivo);//fs.readFileSync(path_file, 'utf8');
                var frecuencia = {};
                frecuencia = get_freq_termino(contenido,termino);
                if(inserts!='')inserts=inserts+' , ';
                inserts=inserts+" ( '"+archivo+"','"+termino+"',"+frecuencia[termino]+",'freq_word') ";
                
            });
            resolve(inserts);
        });
    });
    

};

const exist_file = (archivo)=>{
    const ruta = raiz+'documentos/'+archivo;
    const existe_archivo = fs.existsSync(ruta);
    return existe_archivo;
};

const get_content_file = (archivo)=>{
    const path_file = raiz+'documentos/'+archivo;
    const contenido = fs.readFileSync(path_file, 'utf8');
    return contenido;
};

const get_freq_termino = (contenido,termino)=>{
    const tokens = contenido.split(/\W+/);
    const frecuencia={};
    frecuencia[termino] = 0;

    for(i=0;i<tokens.length;i++){
        var palabra = tokens[i].toUpperCase(); 
        if(palabra.includes(termino))
            frecuencia[termino]+=1;                
    }
    return frecuencia;
}

const fs_Controller = {};
fs_Controller.get_inserts = get_inserts;
fs_Controller.exist_file = exist_file;
fs_Controller.get_content_file = get_content_file;
fs_Controller.get_freq_termino = get_freq_termino;

module.exports = fs_Controller;