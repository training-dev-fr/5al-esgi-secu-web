const express = require('express');
const userController = require('./../controller/user.controller.js');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);

router.post('/',userController.create);
router.put('/:id',userController.update);

router.delete('/:id',userController.remove);


module.exports = router;