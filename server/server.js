var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/todos');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models

var Todo = mongoose.model('Todo', {
  title: String,
  description: String
});

// Routes

// GET all Todos
app.get('/api/todos', function(req, res) {

  console.log("Retrieving Todos");

  Todo.find(function(err, todos) {

    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
});

app.post('/api/todos', function(req, res) {

  console.log("Creating a Todo");

  Todo.create({
    title: req.body.title,
    description: req.body.description,
    done: false
  }, function(err, review) {
    if (err) {
      res.send(err);
    }

    // Return all todos after the creation of a new todo.
    Todo.find(function(err, todos) {
      if (err) {
        res.send(err)
      }
      res.json(todos);
    });
  });
});

// Delete a Todo
app.delete('/api/todos/:todos_id', function(req, res) {

  Todo.remove({
    _id: req.params.todos_id
  }, function (err, review) {

  });
});


app.listen(8080);
console.log("App is listening on port 8080");
