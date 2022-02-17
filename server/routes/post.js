const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/post')

// @router POST api/posts
// @desc Create post 
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body

    // simble validation
    if(!title) {
        return res.status(400).json({sucess: false, message:'title is require!'})
    }

    try {
        const post = await Post.findOne({title})
        if(post) {
            return res.status(400).json({sucess: false, message:'title is exist!'})
        }
        const newPost = new Post({
            title, 
            description, 
            url:url.startsWith('http://') ? url : `http://${url}`, 
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()
        res.json({sucess: true, message:'happy learing', post: newPost})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:'Internal server error'})
    }
})

// @router PUT api/posts
// @desc Update post 
// @access Private

router.put('/:id', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body

    // simble validation
    if(!title) {
        return res.status(400).json({sucess: false, message:'title is require!'})
    }

    try {
        let updatePost ={
            title, 
            description:description || '',
            url:(url.startsWith('http://') ? url : `http://${url}`) || '', 
            status: status || 'TO LEARN',
        }

        const postUpdateCondition = {_id: req.params.id, user:req.userId}
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {new:true})

        //  if user not authorised to update post or post not found
        if(!updatePost) {
            return res.status(400).json({sucess: false, message:'post not found '})
        }
        else {
            res.json({success: true, message:'excellent progress', post: updatePost})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message:'Internal server error'})
    }
})

module.exports = router