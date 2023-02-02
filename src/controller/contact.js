const Contato = require('../models/Contact')


exports.contato = (req, res) => {
    res.render('Contato', {
        contato: {}
    })
}


exports.newContact = async (req,res) =>{
    try {
    const contato = new Contato(req.body) 
    await contato.register();
    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(()=> res.redirect('/contacts'));
        return;
    }

    req.flash('success', 'Contato criado com sucesso!');
        req.session.save(()=> res.redirect(`/contacts/${contato.contato._id}`));
        return;
        
    } catch (error) {
        return console.log(error)
    }
    
}

exports.editar = async (req,res) => {
    if(!req.params.id) return res.send('Error 404')

    const contato = await Contato.BuscarId(req.params.id)

    if(!contato) return res.send('Error 404')

    res.render('Contato', { contato })

}

exports.registrar = async (req, res) => {

    try {
        if(!req.params.id) return res.send('Error 404')
        const contato = new Contato(req.body)
    
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect(`/contacts/${contato.contato._id}`));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso com sucesso!');
            req.session.save(()=> res.redirect('/'));
            return;
            
        } catch (error) {
            return console.log(error)
        } 
}

exports.deletar = async (req, res) =>{
    if(!req.params.id) return res.send('Error 404')

    const contato = await Contato.delete(req.params.id)

    if(!contato) return res.send('Error 404')


    req.flash('success', 'Contato apagado com sucesso!');
            req.session.save(() => res.redirect('/'));
            return;
}