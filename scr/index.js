const { response } = require('express');
const express = require('express');
const app = express();
//const morgan = require('morgan');//para ver las peticiones del clientes

app.set('port',3000);//le seteo el puerto 3000

//app.use(morgan('dev'));// le digo a exprees que voy a utilizar morgan. morgan tiene varios parametros pero con 'dev', ya tengo la info necesaria


//definos las rutas
app.use('/api/get_freq_word_in_file',require('./routes/get_freq_word_in_file.js'));
app.use('/api/get_freq_word',require('./routes/get_freq_word.js'));


app.listen(app.get('port'), ()=>{
    console.log("SERVIDOR PRENDIDO EN PUERTO ",app.get('port'));
});