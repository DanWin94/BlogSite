const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment  = require('../models/comments');


router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /comments'
    });
});

router.post('/',(req, res, next) => {
    const comment = new Comment({
        commentBody: req.body.title,
        commentedBy: req.body.description,
        commentID: new mongoose.Types.ObjectId,
        date: req.body.date
    });
    comment.save().then(result => {
        console.log(result);
    })
    .catch(err => comsole.log(err));
    res.status(201).json({
        message:'comment was posted',
        comment:comment
    });
});

router.get('/:commentID',(req, res, next) => {
    const id = req.params.commentID;
    if(id ==='special'){
    res.status(200).json({
        message:'comment was detected and retrieved',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'comment was not found'
        });
    }
});

router.post('/:commentID',(req, res, next) => {
    const id = req.params.commentID;
    res.status(201).json({
        message:'comment was entered into database',
        id: id
        });
})

router.patch('/:commentID',(req, res, next) => {
    const id = req.params.comentID;
    if(id ==='special'){
    res.status(200).json({
        message:'comment was was found and updated',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'comment was not found to be updated'
        });
    }
});

router.delete('/:commentID',(req,res,next) => {
    const id = req.params.commentID;
    if(id ==='special'){
    res.status(200).json({
        message:'comment was detected and deleted',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'comment was not detected and could not be deleted'
        });
    }
});



module.exports = router;