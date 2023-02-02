const mongoose = require('mongoose')//Iniciando o moongose;
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email : {type: String, required: true},
    password :{type: String, required: true}
})//Criando um schema para MongoDB

const LoginModel = mongoose.model('Login', LoginSchema)//Inicaindo e configurando o model da home;


class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.users = null;
    }

    async login(){
        this.valida();

        if(this.errors.length > 0){
            return;
        }

        this.users = await LoginModel.findOne({ email : this.body.email})

        if(!this.users){
            this.errors.push('Usuario ou senha errado!!');
            this.users = null;
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.users.password)){
            this.errors.push('Usuario ou senha errado!!');
            return;
        }


    }

    async register(){
        this.valida();

        if(this.errors.length > 0){
            return;
        }

        await this.userExists();

        if(this.errors.length > 0){
            return;
        }

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt) 
        this.users = await LoginModel.create(this.body) 
        

    }

    async userExists(){
        this.users = await LoginModel.findOne({ email : this.body.email})

        if(this.users) this.errors.push('Este email ja esta sendo utilizado!!')
    }

    valida(){
        this.cleanData();

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido!!');

        if(this.body.password.length < 3 || this.body.length > 50){
            this.errors.push('A senha precisar entre 3 e 50 caracteres!!');
        }
    }


    cleanData(){
        for(let key in this.body){
            if(typeof this.body[key] !== "string"){
                this.body[key] = '';
            }

            this.body = {
                email : this.body.email,
                password : this.body.password
            }
        }
    }



}


module.exports = Login; //Exportando o homeModel;