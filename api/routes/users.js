const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User  = require('../models/users');

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /users'
    });
});

router.post('/',(req, res, next) => {
    const user =new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            userID: req.body.userID,
            email: req.body.email,
            memberID: new mongoose.Types.ObjectId
    });
    user.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));


    res.status(201).json({
        message:'new user was created',
        user: user
    });
});

router.get('/:userID',(req, res, next) => {
    const id = req.params.userID;
    if(id ==='user1'){
    res.status(200).json({
        message:'Specific user was found and returned',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'user was not found'
        });
    }
});

router.post('/:userID',(req, res, next) => {
    const id = req.params.userID;
    res.status(201).json({
        message:'userID was entered into database',
        id: id
        });
})

router.patch('/:userID',(req, res, next) => {
    const id = req.params.userID;
    if(id ==='user1'){
    res.status(200).json({
        message:'user was was found and updated',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'user was not found to be updated'
        });
    }
});

router.delete('/:userID',(req, res, next) => {
    const id = req.params.userID;
    if(id ==='user1'){
    res.status(200).json({
        message:'user was detected and deleted',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'user was not detected and could not be deleted'
        });
    }
});
  
module.exports = router;