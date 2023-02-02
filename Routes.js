//Aonde se cria as rotas;

const express = require('express') //Inicando express;
const router = express.Router() //Confirgurando o router;

//recebendo controllers;
const homeController = require('./src/controller/home')
const loginController = require('./src/controller/login')
const ContactController = require('./src/controller/contact')

//Middleware;
const {loginRequired} = require('./src/middlewares/middlewares')


//Rota da home
router.get('/', homeController.home); //GET da home;

//Rota do Login
router.get('/login', loginController.login)

router.post('/register', loginController.register);

router.post('/login', loginController.log)

router.get('/logout', loginController.logout)


//Rotas de Contatos
router.get('/contacts', loginRequired,  ContactController.contato)

router.post('/newContact', loginRequired,  ContactController.newContact)

router.get('/contacts/:id', loginRequired,  ContactController.editar)

router.post('/contacts/:id', loginRequired,  ContactController.registrar)

router.get('/delete/:id', loginRequired,  ContactController.deletar)


module.exports = router; //Exportando as rotas;