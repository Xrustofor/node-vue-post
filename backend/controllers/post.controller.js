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
        const { id } = req.params;
        try{
            const post = await Post.findByPk(id);
            if(post){ 
                post.destroy();
                res.status(201).json({id});
            }else{
                res.status(400).json({ errors: [{path: 'id', msg: 'No such id exists'}] });
            }
        }catch(e){
            console.log(e.message);
            res.status(400).json({ errors: [{path: 'id', msg: e.message}] });
        }        
    }

    async getPosts(req, res) {
        const { page } = req.query;
        let limit = 3;
        let offset = 0 + ((+page || 1) - 1) * limit;
        let pages = 0;
        
        try{
            const posts = await Post.findAndCountAll({
                offset: offset,
                limit: limit,
                order: [['updatedAt', 'DESC']],
            }).then( res => {
                pages = Math.ceil(res.count / limit) || 1;
                return {
                    meta: {
                        count: res.count,
                        limit,
                        offset,
                        pages
                    },                    
                    items: res.rows
                };
            } )
            
            res.status(200).json(posts);
        }catch(e){ 
          console.log(e.message)
          res.status(400).json({ errors: [{path: 'cards', msg: e.message}] });
        }
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