const router = require('express').Router();
const Movie = require('../models/movie.model');

// Error Response Function
const errorResponse = (res,err) => {
    return(
        res.status(500).json({
            ERROR: err.message
        })
    )
}

//Create Movie (POST)
router.post('/', async(req,res) => {
    try {
        
        //1. Pull data from client (body)
        const {
            title, genre, rating, length, releaseYear
        } = req.body;

        //2. Create a new object for Schema
        const movie = new Movie({
            title, genre, rating, length, releaseYear
        })
        
        //3. Use mongoose method to save to DB
        const newMovie = await movie.save();

        //4. Respond to client
        res.status(200).json({
            result: newMovie,
            message: `${newMovie.title} added to collection!`
        })

    } catch (err) {
        // res.status(500).json({
        //     ERROR: err.message
        // });
        errorResponse(res, err);
    }
})

//TODO Get All
/* 
!   Challenge
        - No special endpoint necessary
        - Response should consider
            - If found
            - not found
        - Test the route within Postman
        
        Docs: https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
        
        Hint: parameters within method are optional
*/

//TODO GET One
/* 
!   Challenge
        - By ID
        - Response should consider
            - If found
            - If no document found
        - Test the route within Postman
        
        Hint: Consider login within user.controller.js
        Docs: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
*/

//TODO Get All by Genre
/* 
!   Challenge
        - No special endpoint necessary
        - Response should consider
            - If found
            - not found
        - Consider parameter casing within the endpoint.
            - hint: conditional w/ looping
        - Test the route within Postman
*/

module.exports = router;