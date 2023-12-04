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
        const {page} = req.query;
            const data = {
            meta: {
                pages: 0,
                page: +page || 1,
                offset: 0,
                limit: 5,
                count: null
            },           
            items: null,            
        };

        try{
            const count = await Post.count();
            data.meta.count = count ? count -1 : 1;
            if(data.meta.count > 0){
                data.meta.pages = Math.floor(data.meta.count / data.meta.limit, 1);
                if(data.meta.count >= data.meta.limit * data.meta.page){
                    data.meta.offset = (data.meta.page == 1) ? 0 : data.meta.limit * data.meta.page;
                }else if(data.meta.count < data.meta.limit * data.meta.page) {
                    data.meta.offset = data.meta.count - data.meta.limit;
                    data.meta.page = data.meta.pages;
                }else{
                    data.meta.offset = 0;
                }
            }
            const posts = await Post.findAll({ 
                order: [['updatedAt', 'DESC']],
                offset: data.meta.offset,
                limit: data.meta.limit,
            });
            data.items = posts.map(p => p.dataValues);
            
        }catch(e){ console.log(e.message) }

        res.status(201).json(data);
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