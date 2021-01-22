const express = require('express');
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const dotenv = require('dotenv');
const path = require('path');


/* Import config */
dotenv.config({path: path.resolve(__dirname, '.env')});

/* Create Express App */
const app = express();

/* Set Security Configs */
app.use(helmet());
app.use(hpp());

// Initiate middleware to allow body parser
app.use(express.json({ extended: false }));

/* Set Cookie Settings */
app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
);


app.use(csurf());

const authRoutes = require('./routes/auth');
// const searchRoutes = require('./routes/search');

app.use('/auth', authRoutes);
// app.use('/search', searchRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!!!`);
});

module.exports = app;