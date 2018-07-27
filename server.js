const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app =express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now =new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to srver.log');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintan.hbs',{
    pageTitle:'Maintenance'
  });
});

hbs.registerHelper('getcurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIT',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  // res.send('<h1>Yo!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    Welcome:'Yo! Irashai'
  });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
      pageTitle:'About Page'
    });
  //res.send('<h1 style ="color:blue;background-color:red;padding:5px">About Page</h1>');
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMsg:'404 Not Found'
  });
});

app.listen(3000,()=>{
  console.log('Server is Up');
});
