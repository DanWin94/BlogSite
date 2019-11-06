const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post  = require('../models/posts');
const Comment  = require('../models/comments');

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /posts'
    });
});

router.post('/',(req, res, next) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        postID: new mongoose.Types.ObjectId,
        createdBy: req.body.createdBy,
        date: req.body.date,
        comments: [Comment]
        
    });
    post.save().then(result => {
        console.log(result);
    })
    .catch(err => comsole.log(err));
    res.status(201).json({
        message:'new post was created',
        post: post
    });
});

router.get('/:postID',(req, res, next) => {
    const id = req.params.postID;
    if(id ==='special'){
    res.status(200).json({
        message:'post was detected and retrieved',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'post was not found'
        });
    }
});

router.post('/:postID',(req, res, next) => {
    const id = req.params.postID;
    res.status(201).json({
        message:'postID was entered into database',
        id: id
        });
})

router.patch('/:postID',(req, res, next) => {
    const id = req.params.postID;
    if(id ==='special'){
    res.status(200).json({
        message:'post was was found and updated',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'Post was not found to be updated'
        });
    }
});

router.delete('/:postID',(req,res,next) => {
    const id = req.params.postID;
    if(id ==='special'){
    res.status(200).json({
        message:'post was detected and deleted',
        id: id
        });
    }
    else{
    res.status(200).json({
        message:'postID was not detected and could not be deleted'
        });
    }
});


module.exports = router;