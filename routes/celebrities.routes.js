// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here 

router.get('/', async(req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', {celebrities});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/create', (req, res, next) => {
    const occupationOptions = Celebrity.schema.path('occupation').enumValues;
    res.render('celebrities/new-celebrity', {occupationOptions});
});

router.post('/create', async (req, res, next) => {
    const celebrity = {...req.body};
    try {        
        await Celebrity.create(celebrity);
        res.redirect('/celebrities')
    } catch (error) {
        // While the specification just says in case of an error to render the form again,
        // I am extending that a bit - filling out the form with the given values again,
        // and showing an error message to point out the problem so user can correct it
        const occupationOptions = Celebrity.schema.path('occupation').enumValues;
        res.render('celebrities/new-celebrity', {occupationOptions, error: error, celebrity});
    }
});

module.exports = router;