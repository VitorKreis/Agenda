require('dotenv').config() // Configurando o env;

//Iniciando o express;
const express = require('express')
const app = express()

//Iniciado o monoogse e configurando;
const mongoose = require('mongoose')
mongoose.connect(process.env.ConnectUrl).then(()=> { // Conectando ao banco de dados;
    console.log('Conexao com a base de dados!')
    app.emit('Pronto')
});



const path = require('path')

//Iniciado middlewares e utilizando;



//Iniciado o session e o mongoStore
const session = require('express-session')
const mongoStore = require('connect-mongo')
//Configurando session e mongoStore
const sessionConfg = session({
    secret: "mcnvxruhe4834978ckjx439857dfksçjerw89 idsuiusriudtr",
    store : mongoStore.create({mongoUrl: process.env.ConnectUrl }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 120 * 24 * 7,
        httpOnly: true  
     }
})
app.use(sessionConfg)


//Iniciando o flash message e utulizando;
const flash = require('connect-flash')
app.use(flash())


const middleware = require('./src/middlewares/middlewares')
app.use(middleware.FlashMessage);


//Iniciando Helmet e utilizando
const helmet = require('helmet')
app.use(helmet())


app.use(express.urlencoded({extended : true}))//Extendedo a url e configurando express;

app.use(express.static(path.resolve(__dirname, "public")))//Configurando o public com dirname;
 
app.set('views', path.resolve(__dirname, 'src' , 'views'))//Configurando o view com dirname;

app.set('view engine', 'ejs')//Configurando ejs;

const routers = require('./Routes')//Iniciado router e utilizando;
app.use(routers)

//Iniciando conexao com a internet;
app.on('Pronto', ()=>{
    app.listen(3000, ()=>{
        console.log('Acessar o site em: http://localhost:3000')
    })
})
