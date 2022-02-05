var express = require('express')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router()

// =======================================================
// INITIALIZATION
const radarService = config.ROUTE_URLS.radarService;
const api = AxiosWrapper(radarService);

// =======================================================
// SERVICE ROUTING
// router.get('/feeds', asyncHandler(async(req, res) => {
//     let resp = await api.get(req.path)
//     res.send(resp.data)
// }))

// router.get('/feeds/:hashtag', asyncHandler(async(req, res) => {
//     let resp = await api.get(req.path)
//     res.send(resp.data)
// }))

// router.post('/feeds', asyncHandler(async(req, res) => {
//   let resp = await api.post(req.path, req.body)
//   res.send(resp.data)
// }))

// =======================================================

module.exports = router