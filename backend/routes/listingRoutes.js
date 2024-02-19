const express = require('express');
const {createListing , getUserListings , deleteListing , updateListing , getListing , getSearchListings , getListings }  = require('../controllers/listingController');
const verifyToken = require('../utlis/verifyUser')



const router = express.Router();

//create listing
router.post('/create' , verifyToken ,   createListing);
//get listings by the user id
router.get('/listings/:id' , verifyToken , getUserListings  );

//delete the listing
router.delete('/delete/:id' , verifyToken , deleteListing );

//update listing
router.post('/update/:id' , verifyToken , updateListing );


//get single listing
router.get('/get/:id' ,  getListing );



//search listings router
router.get('/get' ,getSearchListings);


//get all listings
router.get('/listings' ,getListings);







module.exports= router;