const express = require('express');
const roleController = require('./../controller/role.controller.js');
const { auth } = require('../middleware/auth.middleware.js');
const { checkRole } = require('../middleware/check-role.middleware.js');

const router = express.Router();

router.get('/', roleController.getAll);
router.get('/:id', roleController.getById);

router.post('/', auth, checkRole("admin"), roleController.create);
router.put('/:id', roleController.update);

router.delete('/:id', roleController.remove);


module.exports = router;