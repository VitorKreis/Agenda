const mongoose = require('mongoose')//Iniciando o moongose;
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    nome : {type: String, required: true},
    sobrenome :{type: String, required: false, default: ''},
    email :{type: String, required: false, default: ''},
    telefone :{type: String, required: false, default: ''},
    Data: {type: Date, default: Date.now}

})//Criando um schema para MongoDB

const ContactModel = mongoose.model('Contact', ContactSchema)//Inicaindo e configurando o model da Contact;


function Contact(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

    

    Contact.prototype.register = async function(){
        this.valida()

        if(this.errors.length > 0) return;

        this.contato = await ContactModel.create(this.body)

    }

    Contact.prototype.valida = function(){
        this.cleanData();

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido!!');

        if(!this.body.nome) this.errors.push('E necessario que coloque o nome') 

        if(!this.body.email && !this.body.telefone) {
            this.errors.push('E preciso que coloque e-mail ou telefone');
        }

        

    }


    Contact.prototype.cleanData = function(){
        for(let key in this.body){
            if(typeof this.body[key] !== "string"){
                this.body[key] = '';
            }

            this.body = {
                nome : this.body.nome,
                sobrenome : this.body.sobrenome,
                email : this.body.email,
                telefone : this.body.telefone,
               
            }
        }
    }

    Contact.prototype.edit = async function(id){
        if(typeof id !== "string" ){
            return;
        }

        this.valida()

        if(this.errors > 0){
            return;
        }

        this.contato = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})
    }


    //Metodos Estaticos

    Contact.BuscarId = async function(id) {
        if(typeof id !== 'string') return;
        const user = await ContactModel.findById(id)
        return user;
    }
    
    Contact.BuscarContatos = async function() {
        const contatos = await ContactModel.find().sort({Data: -1})
        return contatos;
    }

    Contact.delete = async function(id) {
        if(typeof id !== 'string') return;
        const contato = await ContactModel.findByIdAndDelete({_id: id})
        return contato;
    }


module.exports = Contact; //Exportando o ContactModel;