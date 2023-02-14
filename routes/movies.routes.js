// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')
const { isValidObjectId } = require('mongoose')

// all your routes here
router.get('/', async (req, res, next)=>{
    try {
        const movies = await Movie.find();
        res.render('movies/movies', {movies});
    } catch (error) {
        
        next(error);
    }
});

router.get('/:id', async (req, res, next)=>{
    const id = req.params.id;
    if (!isValidObjectId(id)) return next();
    try {
        const movie = await Movie.findById(id).populate('cast');
        res.render('movies/movie-details', {movie});
    } catch (error) {
        next(error);
    }
});

router.post('/:id/delete', async (req, res, next)=>{
    const id = req.params.id;
    try {
        await Movie.findByIdAndRemove(id);
        res.redirect('/movies');
    } catch (error) {
        next(error);
    }
});

router.get('/:id/edit', async (req, res, next)=>{
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        const actors = await Celebrity.find();

        res.render('movies/edit-movie', {movie, actorOptions: actors})
    } catch (error) {
        next(error);
    }
});

router.post('/:id', async (req, res, next)=>{
    const id = req.params.id;
    if (!isValidObjectId(id)) return next();

    const movie = {genre: req.body.genre, plot: req.body.plot, cast: req.body.cast};

    // Preventing updates that remove the title completely
    // (title is required, but an empty string is technically accepted,
    // when it shouldn't be)
    if (req.body.title.length > 0) movie.title = req.body.title;

    try {
        await Movie.findByIdAndUpdate(id, movie);
        res.redirect('/movies');
    } catch (error) {
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
        next(error)
    }
});

module.exports = router;