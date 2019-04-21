const express = require("express");

// initialization
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.json());

//Global Variables

// Routes
app.get('/', (req,res)=>{
  res.send('Hello World');
});

// Starting the server
const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
