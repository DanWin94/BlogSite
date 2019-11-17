const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User  = require('../models/users');

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /users'
    });
});

router.post('/',(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const newUser = new User(body)

    if (!newUser) {
        return res.status(400).json({ success: false, error: err })
    }

    newUser
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: newUser._id,
                message: 'New User Added to database',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
})
//
router.get('/:userID', async(req, res) => {
    await User.findOne({ _id: req.params.userID }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}
)

router.put('/:userID', async(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user to update',
        })
    }

    User.findById({ _id: req.params.userID }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.userID = body.userID
        user.password = body.password
        user.email = body.email
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
})

router.delete('/:userID', async(req, res) => {
    await User.findOneAndDelete({ _id: req.params.userID }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, message:'User found and deleted' })
    }).catch(err => console.log(err))
}
)
  
module.exports = router;