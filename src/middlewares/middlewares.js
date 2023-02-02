exports.FlashMessage = (req, res, next) =>{
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user
    next();
}

exports.loginRequired = (req,res, next) =>{
    if(!req.session.user){
        req.flash('errors', 'Voce nao esta logado e necesarrio que faça login');
        req.session.save(()=> res.redirect('/login'));
        return;
    }

    next()
}