const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment  = require('../models/comments');


router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /comments'
    });
});

router.post('/',(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comment',
        })
    }

    const newComment = new Comment(body)

    if (!newComment) {
        return res.status(400).json({ success: false, error: err })
    }

    newComment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: newComment._id,
                message: 'Comment Added to database',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Comment not created!',
            })
        })
})

router.get('/:commentID', 

async (req, res) => {
    await Comment.findOne({ _id: req.params.commentID }, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comment) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({ success: true, data: comment })
    }).catch(err => console.log(err))
}
)

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