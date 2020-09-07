
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let db = require('../models');
let bcrypt = require('bcryptjs');
let config = require('../secrets');
const jwt = require('jwt-simple');  //creates token

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

let passport = require('passport');
let passportService = require('../config/passAuth');

let requireSignin = passport.authenticate('local', {session: false});
let requireAuth = passport.authenticate('jwt', {session: false});

let token = (user) =>{

    let timestamp = new Date().getTime();

    return jwt.encode({sub: user.id,  iat:timestamp}, config.secret)
}

router.get('/', requireAuth, (req, res) => {
  
    res.send('hello world')
})

// when a user, logging in with credentials
router.post('/signin', requireSignin, (req, res) => {
  
    //req.user
    //pass back jwt token
    // check to see if user credentials are correct
    //credentials: username, password
    //look inside db

    res.json({token: token(req.user)})
})

// user is registering
router.post('/signup', (req, res) => {
  
    //create record in our database
    // email, password 

    let email = req.body.email;

    let password = bcrypt.hashSync(req.body.password, 8);

    db.user.findAll({where: {email: email}})
    .then(results => {

        if(results.length === 0){
            // no duplicates found
            // take credentials and add to database 

            db.user.create({ email: email, password: password})
            .then(user => {
                // on success, return json web token 
                return res.json({token: token(user)})
            })
            .catch(err => {
                res.status(423).send({error: "Couldn't add to database"})
            })
        }
        else {
            //duplicates have been found

            return res.status(422).send({error: 'Email already exists'})
        }
    })

})

module.exports = router;