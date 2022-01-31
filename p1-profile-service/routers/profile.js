var express = require('express');
const path = require('path');
var bcrypt = require('bcryptjs');

var User = require(path.join(__dirname,'../model/user.js'));

var router = express.Router();

// =======================================================
// GET USER PROFILE
router.get('/getProfileById', (req, res) => {
    User.findOne({ _id: req.query.id }, (err, user) => {
        if (err) return res.status(500).send("Internal server error")
        if (!user) return res.status(404).send("User not found")
        
        if(user) {
            let userObj = {
                "name": user.name,
                "email": user.email,
            }
            res.status(200).send(userObj)
        }
    });

})

// =======================================================
// UPDATE USER PROFILE
router.post('/updateProfileById', (req, res) => {

    User.findOne({ _id: req.body.id }, (err, user) => {
        if (err) return res.status(500).send("Internal server error")
        if (!user) return res.status(404).send("User not found")

        if(user) {
            
            let hashedPassword = bcrypt.hashSync(req.body.password, 8)

            let updObj = {}
            if(req.body.name && user.name != req.body.name) {
                updObj['name'] = req.body.name
            }
            if(req.body.password && user.password != hashedPassword) {
                updObj['password'] = hashedPassword
            }
            
            User.updateOne(
            {_id: req.body.id},
            {
                $set : updObj
            },
            {upsert : false},
            (err, user2) => {
                if (err) return res.status(500).send("User profile update failed")

                res.status(200).send("User profile updated!")
            })
        }
    });

    
})

// =======================================================
// CREATE USER PROFILE
router.post('/createProfile', (req, res) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send("Internal server error")
        if(user) {
            if(req.body.profileType == "googleOAuth") {
                return res.status(200).send(user._id)
            }
            return res.status(500).send("User already exists")
        }
        else {
            let hashedPassword = bcrypt.hashSync(req.body.password, 8)
            
            let insertObj = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                profileType: req.body.profileType
            }
            
            User.create(insertObj, (err, user2) => {
                if (err) {
                    return res.status(500).send({ message: "Registration failed!" })
                }
                else {
                    if(req.body.profileType == "googleOAuth") {
                        return res.status(200).send(user2._id)
                    }
                    return res.status(200).send({ message: "Registration completed!" })
                }
            })
        }
    });
  
})

// =======================================================
// COMPARE USER PASSWORD
router.post('/checkUserCredentials', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send("Internal server error")
        if (!user) return res.status(404).send("User not found")
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) return res.status(401).send({ auth: false, message: "Password Mismatch!"})
        
        res.status(200).send({ auth: true, message: "User credentials validated!", user_id: user._id })
    })

})

// =======================================================

module.exports = router