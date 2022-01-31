var express = require('express')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))

var router = express.Router()

// =======================================================
// INITIALIZATION
const sessionService = config.ROUTE_URLS.sessionService;
const api = AxiosWrapper(sessionService);

// =======================================================
// SERVICE ROUTING
// router.get('/hashtags', isAuthorized, (req, res) => {
//     api.get(req.path).then(resp => {
//         res.send(resp.data)
//     })
//     .catch((response) => {
//         res.status(response.status).send({ message: response.statusText })
//     })
// })

// router.get('/hashtags/:name', isAuthorized, (req, res) => {
//     api.get(req.path).then(resp => {
//         res.send(resp.data)
//     })
//     .catch((response) => {
//         res.status(response.status).send({ message: response.statusText })
//     })
// })

// =======================================================

module.exports = router