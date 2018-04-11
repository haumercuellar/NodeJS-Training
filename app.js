const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


//Connect to local Mongo Database
mongoose.connect('mongodb://localhost/trainingdb');
let db = mongoose.connection;


//Check for DB connection
db.once('open', function(){
    console.log('Connected to MongoDB');

    
});

//Check for DB errors
db.on('error', function(err){
    console.log(err);

});










//Init app
const app = express();

//Bring in models
let Training = require('./models/training');


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: (param, msg, value)=>{
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));








//Home route
app.get('/api/v1/trainings/', (req, res)=>{
    Training.find({},(err, trainings)=>{
        if (err){
            console.log(err);
        } else {
            res.json(trainings);      
            
        }   
    });
});


// Route Files
let trainings = require('./routes/trainings');
app.use('/api/v1/trainings', trainings);



app.listen(3000, ()=>{
    console.log('Server started on port 3000...');

});