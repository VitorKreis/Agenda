const mongoose = require('mongoose')//Iniciando o moongose;

const HomeSchema = new mongoose.Schema({
    titulo : String,
    descriçao: String,
    date : {type: Date, default: Date.now}
})//Criando um schema para MongoDB

const HomeModel = mongoose.model('Home', HomeSchema)//Inicaindo e configurando o model da home;


module.exports = HomeModel; //Exportando o homeModel;