var express = require('express');
const path = require('path');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))

var router = express.Router();

// =======================================================
// INITIALIZATION
const secret = config.SECRET;
const profileService = config.ROUTE_URLS.profileService;
const profileServiceApi = AxiosWrapper(profileService);

// =======================================================
// USER REGISTERATION
router.post('/register', (req, res) => {

  profileServiceApi.post(`/createProfile`, req.body)
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(function (error) {
      console.log(error.response.status, error.response.data);
      res.status(error.response.status).send(error.response.data)
  });

})

// =======================================================
// USER LOGIN
router.post('/login', (req, res) => {

  profileServiceApi.post(`/checkUserCredentials`, req.body)
  .then(resp => {
      let isAuth = resp.data.auth;
      let message = resp.data.message;
      let user_id = resp.data.user_id;
      
      if(isAuth) {
        var token = jwt.sign({ id: user_id }, secret, { expiresIn: 15 * 60 })
        res.cookie('auth', token, { httpOnly: true });
        return res.status(200).send({ auth: true, message: "Login Successful!" })
      }
      
      res.status(500).send("Internal server error")
  })
  .catch(function (error) {
      console.log(error.response.status, error.response.data);
      res.status(error.response.status).send(error.response.data)
  });

})

// =======================================================
// USER LOGOUT
router.get('/logout', (req, res) => {
  res.clearCookie("auth");
  res.end();
})

// =======================================================
// TOKEN VERIFICATION
router.post('/verifyToken', (req, res) => {
  jwt.verify(req.body.token, secret, (err, decoded) => {
    if (err) {
      res.status(403).send({ isTokenValid: false })
    } else {
      res.status(200).send({ isTokenValid: true })
    }
  })
})

// =======================================================

module.exports = router