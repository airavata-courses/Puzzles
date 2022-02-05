var express = require('express')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router()

// =======================================================
// INITIALIZATION
const sessionService = config.ROUTE_URLS.sessionService;
const api = AxiosWrapper(sessionService);

// =======================================================
// SERVICE ROUTING
// router.get('/hashtags', asyncHandler(async(req, res) => {
//     let resp = await api.get(req.path)
//     res.send(resp.data)
// }))

// router.get('/hashtags/:name', asyncHandler(async(req, res) => {
//     let resp = await api.get(req.path)
//     res.send(resp.data)
// }))

// =======================================================

module.exports = router