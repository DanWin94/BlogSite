const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post  = require('../models/posts');

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /posts'
    });
});

router.post('/',(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a post',
        })
    }

    const newPost = new Post(body)

    if (!newPost) {
        return res.status(400).json({ success: false, error: err })
    }

    newPost
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: newPost._id,
                message: 'Post Added to database',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })
})


router.get('/:postID',async (req, res) => {
    await Post.findOne({ _id: req.params.postID }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err))
}
)

router.put('/:postID', async(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Post.findById({ _id: req.params.postID }, (err, post) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Post not found!',
            })
        }
        post.title = body.title
        post.description = body.description
        post.createdBy = body.createdBy
        post
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: post._id,
                    message: 'Post updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Post not updated!',
                })
            })
    })
})

router.delete('/:postID', async(req,res) => {
    await Post.findOneAndDelete({ _id: req.params.postID }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, message:'Post found and deleted' })
    }).catch(err => console.log(err))
}
)

module.exports = router;