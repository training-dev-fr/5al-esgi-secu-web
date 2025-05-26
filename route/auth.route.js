const express = require('express');
const authController = require('./../controller/auth.controller.js');
const { checkComplexity } = require('../middleware/password-complexity.middleware.js');

const router = express.Router();

router.post('/signin', (req) => checkComplexity(req.body.password), authController.signin);

router.post('/login', authController.login);

module.exports = router;