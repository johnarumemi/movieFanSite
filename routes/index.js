var express = require('express');
const axios = require('axios');
const passport = require('passport');

var router = express.Router();
const apiKey = process.env.APIKEY;

const apiBaseUrl = 'http://api.themoviedb.org/3';  // base endpoint
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageWidth = 300;
const imageBaseUrl = `http://image.tmdb.org/t/p/w${imageWidth}`;

router.use((req, res, next) => {
    // allow all routes to have access to base image url endpoint
    res.locals.imageBaseUrl = imageBaseUrl
    res.set('Cache-control', 'no-store');
    next();
})

/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log(`User info: ${req.user}`);

    axios({
        method: 'GET',
        url: nowPlayingUrl
    }).then( response => {
        // response object has following properties
        // 1. status : http status code
        // 2. statusText: http status message
        // 3. data:   essentially the body of the response
        // 4. headers: response headers sent back by server
        // 5. config: original request configuration
        // 6. request: XMLHttpRequest object (when running in a browser)

        res.render('index', {
            parsedData: response.data.results
        });

    }).catch( error => {
    // error object has following properties
    // 1. message : error message text
    // 2. response : response object received
    // 3. request : request object
    // 4. config : original request configuration
        console.log(error)
    })

});


// authenticate via github strategy and redirect to registered callback of github app
router.get('/login', passport.authenticate('github')) // redirects to github

router.get('/auth', passport.authenticate('github', {  // redirects after authentication
    successRedirect: '/',
    failureRedirect: '/loginFailed'
}));

router.get('/favorites', (req, res, next)=>{
    res.json(req.user.displayName);
})

router.get('/movie/:id', (req, res, next)=>{
    const movieId = req.params.id;
    const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}`

    axios({
        method: 'GET',
        url: thisMovieUrl,
        params: {
            "api_key": apiKey
    }
    }).then( response => {

        const movieData = response.data

        res.render('single-movie', {movieData})

    }).catch( error => {
        console.log(error.message)
    })
})

router.post('/search', (req, res, next) => {
    const userSearchTerm = encodeURI(req.body.movieSearch);
    const cat = req.body.cat;
    const movieUrl = `${apiBaseUrl}/search/${cat}?api_key=${apiKey}&query=${userSearchTerm}`

    axios.get(movieUrl).then(response => {

        let parsedData = response.data;

        if (cat === 'person'){
            parsedData.results = parsedData.results.flatMap(actor => {
                return actor.known_for
            })
        }

        res.render('index', {
            parsedData: parsedData.results
        })

    }).catch( error => {
        res.send(error.message)
    })
})

module.exports = router;
