const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment  = require('../models/comments');

//1-get all comments 
router.get('/',async (req, res, next) => {
    await Comment.find({}, (err, comments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comments) {
            return res
                .status(404)
                .json({ success: false, error: `Collection is empty` })
        }
        return res.status(200).json({ success: true, data: comments })
    }).catch(err => console.log(err))
});

//2-post new comment 
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

//3-get existing comment by object ID
router.get('/:commentID', async (req, res) => {
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

//4-update existing comment by object ID
router.put('/:commentID', async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Comment.findById({ _id: req.params.commentID }, (err, comment) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comment not found!',
            })
        }
        comment.commentBody = body.commentBody
        comment.commentedBy = body.commentedBy
        
        comment
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: comment._id,
                    message: 'Comment updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Comment not updated!',
                })
            })
    })
})


//5-delete a comment through object ID
router.delete('/:commentID',async (req, res) => {
    await Comment.findOneAndDelete({ _id: req.params.commentID }, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comment) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({ success: true, message:'Comment found and deleted' })
    }).catch(err => console.log(err))
}
)

module.exports = router;