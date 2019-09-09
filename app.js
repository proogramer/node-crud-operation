const express =require('express');
const path = require('path');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/node-crud-operarion');
let db = mongoose.connection;

//check connection
db.once('open',function(){
   console.log('connection to mongo db');
});

//check for DB errors
db.on('error',function(err){
    console.log(err);
});

// Init App
const app =express();

//Bring in Modes
let Articles = require('./models/article');

//Load view Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Home Route
app.get('/',function(req,res){
    Articles.find({},function(err,articles){
        console.log(articles);
        if(err){
            console.log(err);
        }else{
            res.render('index',{
                title:'Add Articles',
                articles:articles
            });
        }

    });
});

// add articles routes
app.get('/articles/add',function(req,res){
    res.render('add_article',{
        title:'Add Articles',
    });

});

app.post('/articles/add',function(req,res){
    let article = new Articles();
    article.title =req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return ;
        }else{
            res.redirect('/');
        }
    })


});

//Start Server
app.listen(3000,function(){
    console.log('server statred on port 3000....');
});