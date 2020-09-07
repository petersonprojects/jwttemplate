
const express = require('express');
const app = express();
//const jwt = require('jwt-simple');  //creates token



app.use(require('./routes/authentication'))




app.listen(3001, () => {
    console.log(`listening on port 3001`);
})


// app.get('/', (req, res)=>{

//     res.send('home page')
// })

//user information from login form
// let userInfo = {
//     id: '12345',
//     userName: 'Veronica',
//     email: 'me@me.com'
// }

// let token = (user) =>{

//     let timestamp = new Date().getTime();

//     return jwt.encode({sub: user.id, name: user.userName, iat:timestamp}, "ljasldj;lasdjlf;sjdlfk")
// }

// let tokenID = token(userInfo)

// console.log(jwt.decode(tokenID, 'ljasldj;lasdjlf;sjdlfk'));