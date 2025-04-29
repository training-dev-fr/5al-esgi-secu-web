const express = require('express');
const userController = require('./../controller/user.controller.js');

const router = express.Router();

router.get('/', userController.getAll);

router.post('/',userController.create);

module.exports = router;