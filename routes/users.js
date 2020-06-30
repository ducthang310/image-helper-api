const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/user.controller');

router.get('/', userController.list);
router.post('/', userController.store);
router.get('/:id', userController.store);
router.patch('/:id', userController.update);

module.exports = router;
