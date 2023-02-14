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
    res.render('celebrities/new-celebrity');
});

router.post('/create', async (req, res, next) => {
    const celebrity = {};
   if (req.body.name.length > 0) celebrity.name = req.body.name;
   if (req.body.occupation.length > 0) celebrity.occupation = req.body.occupation;
   if (req.body.catchphrase.length > 0) celebrity.catchphrase = req.body.catchphrase;
    try {        
        await Celebrity.create(celebrity);
        res.redirect('/celebrities')
    } catch (error) {
        // While the specification just says in case of an error to render the form again,
        // I am extending that a bit - filling out the form with the given values again,
        // and showing an error message to point out the problem so user can correct it
        res.render('celebrities/new-celebrity', {error: error, celebrity});
    }
});

module.exports = router;