const express = require('express');
const config = require('../config/config');
const UserService = require('../services/user-service');
const router = express.Router();

router.post('/login', (req, res) => {
    UserService.login(req.body.EmailAddress, req.body.Password).then(result => res.send(result));
});
  

module.exports = router;