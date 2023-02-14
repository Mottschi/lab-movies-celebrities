// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')

// all your routes here
router.get('/', async (req, res, next)=>{
    try {
        const movies = await Movie.find();
        res.render('movies/movies', {movies});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/create', async (req, res, next)=>{
    try {
        const actors = await Celebrity.find();
        res.render('movies/new-movie', {actorOptions: actors});    
    } catch (error) {
        
    }
    
});

router.post('/create', async (req, res, next)=>{
    const movie = {...req.body};
    try {
        await Movie.create(movie);
        res.redirect('/movies')
    } catch (error) {
        console.log(error);

        // NOTE: Not a good idea to do something that can fail inside the CATCH
        // Better split this out via next(error) and add a route to catch that error below
        const actors = await Celebrity.find();
        res.render('movies/new-movie', {error, movie, actorOptions: actors});
    }
});

module.exports = router;