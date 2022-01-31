/*
THIS FILE IS NOT USED. INSTEAD THE LOGIC IS MOVED TO "routes-config.js" UTILIZING HTTP-PROXY-MIDDLEWARE
*/

var express = require('express');
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))

var router = express.Router();

// =======================================================
// INITIALIZATION
const authService = config.ROUTE_URLS.authService;
const api = AxiosWrapper(authService);

// =======================================================
// UNAUTHENTICATED CALLS
// SERVICE ROUTING
router.post('/register', (req, res) => {
    api.post(req.path, req.body)
    .then(resp => {
        res.send(resp.data);
    })
    .catch(function (error) {
        console.log(error.response.status, error.response.data);
        res.status(error.response.status).send(error.response.data)
    });
});

// =======================================================
// USER LOGIN
router.post('/login', (req, res) => {
    api.post(req.path, req.body)
    .then(resp => {
        res.cookie('auth', resp.data.token, { httpOnly: true });
        res.send(resp.data);
    })
    .catch(function (error) {
        console.log(error.response.status, error.response.data);
        res.status(error.response.status).send(error.response.data)
    });
});

// =======================================================
// USER LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie("auth");
    res.end();
})

// =======================================================
// TOKEN VERIFICATION
router.post('/verifyToken', (req, res) => {
    api.post(req.path, req.body)
    .then(resp => {
        res.send(resp.data);
    })
    .catch(function (error) {
        console.log(error.response.status, error.response.data);
        res.status(error.response.status).send(error.response.data)
    });
});

// =======================================================

module.exports = router;