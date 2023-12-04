const { Router } = require('express');
const postController = require('../controllers/post.controller');
const validationMiddleware = require('../middlewares/validation.middleware')
const { body, query } = require('express-validator');

const router = new Router();

router.get('/', postController.getPosts);
router.get('/post/:id', postController.getByPost);
router.post('/post', validationMiddleware, postController.createPost);
router.put('/post/:id', validationMiddleware, postController.updatePost);
router.delete('/post/:id', postController.deletePost);

module.exports = router;