const express = require('express');
const loginController = require('../controller/login_controller.js')

const router = express.Router();

//Recurso: /login
router.post('/', loginController.realizarLogin);

module.exports = router;