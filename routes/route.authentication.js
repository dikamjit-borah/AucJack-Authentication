const express = require('express')
const controllerAuthentication = require('../controllers/controller.authentication')
const router = express.Router()

router.post('/signUp', controllerAuthentication.signUp)
router.get('/authenticate', controllerAuthentication.authenticate)

module.exports = router