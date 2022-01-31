var express = require('express');
const path = require('path')
var bodyParser = require('body-parser');
var authRouter = require(path.join(__dirname,"../routers/auth.js"))
var googleAuthRouter = require(path.join(__dirname,"../routers/googleAuth.js"))

var router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authRouter)
router.use(googleAuthRouter)

module.exports = router