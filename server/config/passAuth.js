
const passport = require('passport');
const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../secrets');


let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

}

let jwtLogin = new JwtStrategy(jwtOptions, (payload, done)=>{

    //unencoded payload: payload.sub
    db.user.findByPk(payload.sub)
    .then(foundUser => {

        if(foundUser){
            //success
            done(null, foundUser)
        }
        else{
            done(null, false)
        }

    })
    .catch(err =>{
        return done(err, false)
    })

})


let options = { usernameField: 'email' };

//passport is scraping header info from request
let localLogin = new LocalStrategy(options, (email, password, done) => {


    // check to see if email is in our database 

    db.user.findAll({ where: { email: email } })
        .then(results => {
            //check to see if there is an email.  If no email, then invalid login

            if (results != null) {
                // compare passwords
                let user = results[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {

                    //couldn't compare passwords
                    if (err) {
                        return done(err)
                    }

                    //mismatch database
                    if (!isMatch) {
                        return done(null, false)
                    }

                    //valid user
                    return done(null, user)
                })

            }
            else {
                // no email was found, exit with error
                return done(null, false)
            }
        })
        .catch(err => {
            return done(err);
        })


})


passport.use(localLogin);
passport.use(jwtLogin);