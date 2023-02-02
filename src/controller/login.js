const { reset } = require('nodemon');
const Login = require('../models/Login');

exports.login = (req ,res) => {
    res.render("Login")
}

exports.register = async (req, res) => {
    try {
    const login = new Login(req.body)

   await login.register();

   if(login.errors.length > 0){
    req.flash('errors', login.errors);
    req.session.save(() =>{
        return res.redirect('/login');
    });
    return;
   }
   req.flash('success', "Seu usuario foi salvo com sucesso!!");
    req.session.save(() =>{
        return res.redirect('/login');
    });
        
    } catch (error) {
        console.log(error)
        return res.send('Error 404')
    }
};

exports.log = async (req, res) => {
    try {
    const login = new Login(req.body)

   await login.login();

   if(login.errors.length > 0){
    req.flash('errors', login.errors);
    req.session.save(() =>{
        return res.redirect('/login');
    });
    return;
   }
   req.flash('success', "Voce fez login com sucesso");
   req.session.user = login.users;
    req.session.save(() =>{
        return res.redirect('/');
    });
        
    } catch (error) {
        console.log(error)
        return res.send('Error 404')
    }
};

exports.logout = (req, res) =>{
    req.session.destroy();
    res.redirect('/')
}