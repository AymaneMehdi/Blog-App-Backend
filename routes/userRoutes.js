const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController.js')
const auth = require('../middlewares/auth.js');

router.get('/',auth,controller.getAllUser);
router.get('/:id',auth,controller.getOneUser);
router.put('/:id',auth,controller.updateUser);
router.delete('/:id',auth,controller.deleteUser);
router.post('/',controller.createUser);

module.exports = router;