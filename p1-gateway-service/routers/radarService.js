var express = require('express')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))

var router = express.Router()

// =======================================================
// INITIALIZATION
const radarService = config.ROUTE_URLS.radarService;
const api = AxiosWrapper(radarService);

// =======================================================
// SERVICE ROUTING
// router.get('/feeds', isAuthorized, (req, res) => {
//   api.get(req.path).then(resp => {
//     res.send(resp.data)
//   })
//   .catch((response) => {
//     res.status(response.status).send({ message: response.statusText })
//   })
// })

// router.get('/feeds/:hashtag', isAuthorized, (req, res) => {
//   api.get(req.path).then(resp => {
//     res.send(resp.data)
//   })
//   .catch((response) => {
//     res.status(response.status).send({ message: response.statusText })
//   })
// })

// router.post('/feeds', isAuthorized, (req, res) => {
//   api.post(req.path, req.body).then(resp => {
//     res.send(resp.data)
//   })
//   .catch((response) => {
//     res.status(response.status).send({ message: response.statusText })
//   })
// })

// =======================================================

module.exports = router