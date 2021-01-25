const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();
// router.get('/', (req, res) => res.send('Auth route!'));
// router.get('/more', (req, res) => res.send('Auth more route!'));

// @ sending client id, redirect uri, response type to fetch a code
router.get('/login', (req, res) => {

    try {
        res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    
        })}`);
        
    } catch (err) {
              console.error(err.message);
        res.status(500).send('Server Error!');
    }
});


// @ the callback after login in to get the tokens after receiving the code 
router.get('/callback', async (req, res) => {
    
    const {code} = req.query;  
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    const grant_type = 'authorization_code';
    
    const basicHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');

    console.log({code});
   

    const {data} = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type,
        code,
        redirect_uri,
    }), {
        headers: {
            Authorization: `Basic ${basicHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const sessionJWTObject = {
        token: data.access_token,
    };

    req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY)
    return res.redirect('/');

});

router.get('/current-session', (req, res) => {
    try {
        jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err || !decodedToken) {
                res.send(false);
            } else {
                console.log(decodedToken);
                res.send(decodedToken);
            }
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
})

router.get('/logout', (req, res) => {
    try {
        req.session = null;
        res.redirect(
            `/`
        );
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');   
    }
});

router.get('/search/:token/:name', async (req, res) => {
    console.log(req.params.token)
    console.log(req.params.name)
    const {data} = await axios.get(`http://api.spotify.com/v1/search?q=${req.params.name}&type=artist`, {
        headers: {
            "Authorization": `Bearer ${req.params.token}`
        }
    })

    const artistId = data.artists.items[0].id;
    console.log(artistId)

    const albumData = await axios.get(`http://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
            "Authorization": `Bearer ${req.params.token}`
        }
    })

    console.log(albumData.data.items);
    const albumArr = albumData.data.items;
    console.log(albumArr.length);

});

module.exports = router;
