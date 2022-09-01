####################################################
Challenge de desarrollo para Mercado Libre 
Autor:Erik Borges
Fecha: 31 de agosto del 2022
####################################################

Se requiere desarrollar un sistema que permita obtener la frecuencia de términos de un una
colección de documentos a través de una API Rest. La misma debe contar con 2 endpoints:


******************************************
Deploy
******************************************

Para la solución del mismo se utilizo docker-compose ejecutando el siguiente comando:
> docker-compose up -d

❖ El primer endpoint contara la cantidad de veces que aparece un término en un documento
dado. Donde tanto el término como el nombre del documento deben ser pasados
como query params.
Frecuencia de una palabra en un archivo:
- http://localhost:3000/api/get_freq_word_in_file?doc_name=320-8.txt&term=casa
Respuesta: { "frecuencia": 67 }


❖ El segundo endpoint contara cantidad de veces que aparece un término a lo largo de todos
los documentos dados. Donde el término es pasado como un query param.
Frecuencia de una palabra en un directorio:
- http://localhost:3000/api/get_freq_word?&term=casa
Respuesta: { "frecuencia": 6548 }

#UNA ACLARACION ES QUE NO BUSCA PALABRAS CON TILDE