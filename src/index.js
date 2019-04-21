const express = require("express");
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
app.get('/users', db.getUsers)
app.post('/newuser', db.createUser)


// Starting the server
const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

