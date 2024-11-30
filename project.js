const express = require('express');
const mongoose = require('mongoose');
const Sup = require('./models/signup');

const app = express();
const dburl = 'mongodb+srv://userdata:mine1234@userdata.bzn7uty.mongodb.net/dat?retryWrites=true&w=majority';
mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


app.set('view engine','ejs');



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.render('home',{title:'Home'} );
});

app.get('/login',(req,res)=>{
  res.render('login',{title:'Login'} );
});

app.get('/signup',(req,res)=>{
  res.render('signup',{title:'Sign Up'} );
});



app.post('/menu',(req,res)=>{
  const ud = new Sup(req.body);
  ud.save()
  .then(result => {
    res.render('menu',{title:'Menu'} );
  })
  .catch(err => {
    console.log(err);
  });
  
});

app.get('/menu',(req,res)=>{
  Sup.find();
})


app.use((req,res) =>{
  res.status(404).render('404',{title:'404'});
});