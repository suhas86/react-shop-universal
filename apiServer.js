var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

//For SESSION
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


//APIS
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://suhas:reactrocks@ds129053.mlab.com:29053/suhasbookshop')

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error'));
//------>>>>>SET UP SESSIONS <<<<<-------

app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}))

//SAVE TO SESSION
app.post('/cart', function (req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function (err) {
    if (err) {
      console.log(err);
    }

    res.json(req.session.cart);
  })
})

//GET SESSION CART API
app.get('/cart', function (req, res) {
  if (typeof req.session.cart != 'undefined') {
    res.json(req.session.cart);
  }
})

//------>>>>>END SESSION SET UP <<<<<<<----------

var Books = require('./models/books.js');
//------>>>>>>>Post API <<<<<<-------//
app.post('/books', function (req, res) {
  var book = req.body;
  Books.create(book, function (err, books) {
    if (err) {
      console.log(err);
    } else {
      res.json(books);
    }
  })
});

//------->>>>Get Book List <<<<<<-----
app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      console.log(err);
    } else {
      res.json(books);
    }
  })
})
//------->>>>Delete Book <<<<<<-----
app.delete('/books/:_id', function (req, res) {
  var query = {
    _id: req.params._id
  };
  Books.remove(query, function (err, books) {
    if (err) {
      console.log(err);
    } else {
      res.json(books);
    }
  })
});
//------->>>>Update Book <<<<<<-----
app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = {
    _id: req.params._id
  };

  //If field doesnt exists $set will add the field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      price: book.price,
      images: book.image
    }
  }

  //When true returns the updated document
  var options = {
    new: true
  };

  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if (err) {
      console.log(err);
    } else {
      res.json(books);
    }
  })
});

//GET BOOKS IMAGE API
app.get('/images', function (req, res) {
  const imgFolder = __dirname + '/public/images/';

  const fs = require('fs');
  //READ ALL FILES
  fs.readdir(imgFolder, function (err, files) {
    if (err) {
      return console.error(err);
    } else {
      //CREATE AN EMPTY ARRAY
      const filesArr = [];
      //Iterate all images in the directory & add to the array
      files.forEach(function (file) {
        filesArr.push({ name: file });
      })
      //SEND JSON RESPONSE
      res.json(filesArr);
    }
  })
});
//ENDAPIS

app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Api server is listening at 3001")

})