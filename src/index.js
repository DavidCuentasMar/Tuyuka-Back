const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./database')
const bodyParser = require('body-parser')


// initialization
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Settings
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.json());

//Global Variables

// Routes
app.get('/', (req,res)=>{
  res.send('Hello World');
});
app.get('/users', db.getUsers);
app.post('/newuser', db.createUser);

app.post('/login', (req,res) => {
  const user = {
    id:1,
    username:'Kenny Bell',
    email: 'kennybell@kennybell.com'

  }
  jwt.sign({user},process.env.SECRETKEY,(err,token)=>{
    res.json({token});
  });
});

app.post('/product', verifyToken, (req, res) => {  
  jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}


// Starting the server
const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

