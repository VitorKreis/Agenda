const Contato = require('../models/Contact')

exports.home = async (req,res) =>{
    const contatos = await Contato.BuscarContatos();
    res.render('index', {contatos})
}