var express = require('express');
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))

var router = express.Router();

// =======================================================
// INITIALIZATION
const profileService = config.ROUTE_URLS.profileService;
const api = AxiosWrapper(profileService);

// =======================================================
// SERVICE ROUTING
// =======================================================
router.get('/getProfile', (req, res) => {
    api.get(`getProfileById?id=${req.user_id.id}`)
    .then(resp => {
        console.log(resp.data);
        res.send(resp.data);
    })
    .catch(function (error) {
        console.log(error.response.status, error.response.data);
        res.status(error.response.status).send(error.response.data)
    });
});

// =======================================================
router.post('/updateProfile', (req, res) => {
    req.body.id = req.user_id.id;
    api.post("updateProfileById", req.body)
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