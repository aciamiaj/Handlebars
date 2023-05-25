/****************************************************************************************************************** 
 * ITE5315 – Assignment 2 * I declare that this assignment is my own work in accordance with Humber Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students. 
 * Name: Jaimaica Daisy Eugenio Student ID: N01516797  Date: April 9, 2023 
 *****************************************************************************************************************/ 

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const data = require('./data.json');
const fs = require('fs');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');

const handlebars = exphbs.create({});
handlebars.handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

handlebars.handlebars.registerHelper('zeroIfNone', function(value) {
  return value === 0 ? "zero" : value;
});

handlebars.handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});


const app = express();

// Configure handlebars engine
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Define route for index page
app.get('/', (req, res) => {
  res.render('partials/main', {
    title: 'My Favorite Pet'
  });
});

//http://localhost:3000/data/
// Define route for /data
app.get('/data', (req, res) => {
  // Render the data.hbs template and pass the data
  res.render('partials/data', {
    data: data
  });
});

app.get('/show', (req, res) => {
    res.render('partials/show', { message: 'JSON data is loaded and ready!' });
    console.log(data);
  });

// Handling a new route: http://localhost:5500/data/isbn/{index} in which when user enters the index_no, 
// it displays the related book_isbn item in the list (in JSON data).
app.get('/data/isbn/:index', (req, res) => {
  const index = req.params.index;
  const book = data[index];
  if (book) {
    const { isbn, title, authors } = book;
    res.render('partials/isbn', {
      data: [{ isbn, title, authors }]
    });
  } else {
    res.send('Index Not Found');
  }
});


// Handling a new route: http://localhost:5500/data/search/isbn/ 
// When user enters the ISBN, the program searches the given JSON data 
app.get('/data/search/isbn', (req, res) => {
  res.render('partials/search', {
    searchType: 'ISBN',
    action: '/data/search/isbn',
    placeholder: 'Enter ISBN'
  });
});

app.post('/data/search/isbn', (req, res) => {
  const isbn = req.body && req.body.isbn;
  const result = data.find(book => book && book.isbn === isbn);
  if (result) {
    res.render('partials/searchResult', {
      searchType: 'ISBN',
      searchTerm: isbn,
      searchResult: {
        title: result.title,
        authors: result.authors,
        isbn: result.isbn
      }
    });
  } else {
    res.render('partials/searchResult', {
      searchType: 'ISBN',
      searchTerm: isbn,
      errorMessage: 'No results found'
    });
  }
});

// Set up routes
app.get('/data/search/title', (req, res) => {
  res.render('partials/searchTitle', {
    searchType: 'Title',
    action: '/data/search/title',
    placeholder: 'Enter Title'
  });
});

app.post('/data/search/title', (req, res) => {
  const title = req.body.title;
  const books = data.filter(book => book.title.toLowerCase().includes(title.toLowerCase()))
                    .map(book => ({
                      isbn: book.isbn,
                      title: book.title,
                      authors: book.authors.join(', ')
                    }));
  if (books.length > 0) {
    res.render('partials/searchTitleResult', {
      searchType: 'Title',
      searchTerm: title,
      searchResult: books
    });
  } else {
    res.render('partials/searchTitleResult', {
      searchType: 'Title',
      searchTerm: title,
      errorMessage: 'No results found'
    });
  }
});

// app.get('/allData', (req, res) => {
//   // Create a new array containing all book objects
//   const books = data.map(book => ({
//     isbn: book.isbn,
//     title: book.title,
//     authors: book.authors.join(', ')
//   }));
// });
// Define route for /allData
// app.get('/allData', (req, res) => {
//   res.render('allData', {
//     books: data,
//     zeroIfNone: Handlebars.helpers.zeroIfNone
//   });
// });
app.get('/allData', (req, res) => {
  res.render('partials/allData', {
    books: data,
    zeroIfNone: Handlebars.helpers.zeroIfNone
  });
});

// Port
app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
  });