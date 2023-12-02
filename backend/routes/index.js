const { Router } = require('express');
const postController = require('../controllers/post.controller');

const router = new Router();

router.get('/', postController.getPosts);
router.get('/post/:id', postController.getByPost);
router.post('/post', postController.createPost);
router.put('/post/:id', postController.updatePost);
router.delete('/post', postController.deletePost);



module.exports = router;