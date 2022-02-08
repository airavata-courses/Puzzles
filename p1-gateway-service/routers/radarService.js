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
const radarAPI = AxiosWrapper(radarService);

// =======================================================
// SERVICE ROUTING
router.get('/radar/plot', asyncHandler(async(req, res) => {
    // /radar/plot?radar_id=KAMX&date=10-10-2020&hour=15
    let resp = await radarAPI.get(req.url)
    res.send(resp.data)
}))

// =======================================================

module.exports = router