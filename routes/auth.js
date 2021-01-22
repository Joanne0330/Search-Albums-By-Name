const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => res.send('Auth route!'));
router.get('/more', (req, res) => res.send('Auth more route!'));


module.exports = router;