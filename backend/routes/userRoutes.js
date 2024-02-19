const express = require('express');
const { signup , signin , google , updateUser , deleteUser , signout , getUser} = require('../controllers/userController');

const verifyToken = require('../utlis/verifyUser')






const router = express.Router();


router.post('/signup' ,  signup)

router.post('/signin' ,  signin)
router.post('/google' ,  google)
router.get('/signout' ,  signout);
router.post('/update/:id' , verifyToken ,   updateUser)
router.get('/:id' , verifyToken , getUser)







module.exports = router;