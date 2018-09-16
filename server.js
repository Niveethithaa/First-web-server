const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to the file');
    }
  });
  next();
})

// app.use((req,res,next) => {
//   res.render('maintanance.hbs');
// })
hbs.registerHelper('getCurrentyear',() => {
  return new Date().getFullYear()
});
app.get('/',(req, res) => {
  //res.send('Hello World!!');
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMsg : 'Welcome to the Home Page',
  });
});

app.get('/about',(req,res) => {
  //res.send('<h1>About the page</h1>');
  res.render('about.hbs',{
    pageTitle : 'About Page',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    Error : '404 Not found'
  });
});
app.listen(8080,() => {
  console.log('Server is up on port 8080');
});