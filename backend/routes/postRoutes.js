const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController.js')
const auth = require('../middlewares/auth.js');

router.get('/',controller.getAll);
router.get('/:id',auth,controller.getOne);
router.post('/',auth,controller.createPost);
router.put('/:id',auth,controller.updatePost);
router.delete('/:id',auth,controller.deletePost);

module.exports = router;