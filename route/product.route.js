const express = require('express');
const productController = require('./../controller/product.controller.js');
const { auth } = require('../middleware/auth.middleware.js');
const { checkRole } = require('../middleware/check-role.middleware.js');
const { productOwnerShip } = require('../middleware/product-ownership.middleware.js');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', auth, checkRole("seller"), productController.create);
router.put('/:id', auth, checkRole("seller"),productOwnerShip, productController.update);

router.delete('/:id', productController.remove);


module.exports = router;