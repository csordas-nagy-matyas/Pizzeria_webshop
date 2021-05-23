const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://admin:admin@prf-cluster.9rhs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', ()=>{
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err)=>{
    console.log('Hiba történt', err);
})

require('./user.model');
require('./products.model');
require('./drinks.model');
require('./orders.model');
require('./basket.model');


const userModel = mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

const whiteList = ['http://localhost:4200', 'https://webshop-node-heroku.herokuapp.com'];

var corsOptions = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) != -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('CORS Error'));
        }
    }, credentials: true,
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));

passport.use('local', new localStrategy(function (username, password, done) {
    userModel.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));

passport.serializeUser(function(user, done){
    if(!user) return done('Nincs beléptethető felhasználó', null);
    return done(null, user);
})

passport.deserializeUser(function(user, done){
    if(!user) return done('Nincs user akit kiléptethetnénk', null);
    return done(null, user);
})

app.use(expressSession({secret: 'prf2021valami', resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))

app.use('/', require('./routes'));

app.use((req, res, next) => {
    console.log('ez a hibakezelo');
    res.status(404).send('A kert eroforras nem talalhato');
})

app.listen(port, () => {
    console.log('The server is running!');
})
