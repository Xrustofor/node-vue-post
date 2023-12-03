const Post = require('../models/post');
const { validationResult } = require('express-validator');

class PostController {
    async createPost(req, res) {
        const {title, description, price, imagesId} = req.body;
        let item = {};

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({ errors: errors.array() });
        }
       
        try{
            const post = await Post.create({ title, description, price, imagesId })
            item = post.dataValues;
        }catch(e){ console.log(e.message) }
       
        res.status(201).json(item);
    }

    async updatePost(req, res) {
        const { id } = req.params;
        const {title, description, price, imagesId} = req.body;
        let item = {};

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({ errors: errors.array() });
        }
        
        try{
            const post = await Post.findByPk(id);
            post.update({ title, description, price, imagesId })
            item = post.dataValues;
        }catch(e){ console.log(e.message) }
        
        res.status(201).json(item);
    }

    async deletePost(req, res) {
        const { id } = req.query;
        try{
            const post = await Post.findByPk(id);
            if(post){ post.destroy() }
        }catch(e){ console.log(e.message) }
        
        res.status(201).json({id});
    }

    async getPosts(req, res) {
        let items = null;
        try{
            const posts = await Post.findAll();
            items = posts.map(p => p.dataValues);
        }catch(e){ console.log(e.message) }

        res.status(201).json(items);
    }

    async getByPost(req, res) {
        const { id } = req.params;
        let item = {};
        try{
            const post = await Post.findByPk(id);
            item = post;
        }catch(e){ console.log(e.message) }

        res.status(201).json(item);
    }
}

module.exports = new PostController();