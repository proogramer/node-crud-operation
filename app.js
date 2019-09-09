const express =require('express');
const path = require('path');

// Init App
const app =express();

//Load view Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


// Home Route
app.get('/',function(req,res){
    res.render('index',{
        title:'articles'
    });
});

// add articles routes

app.get('/articles/add',function(req,res){
let articles =[
    {
        id:1,
        title:'Artice one',
        author:'Prince',
        body:'this is article one'
    },
    {
        id:2,
        title:'Artice two',
        author:'Prince',
        body:'this is article two'
    },
    {
        id:3,
        title:'Artice three',
        author:'Prince',
        body:'this is article three'
    },
    {
        id:4,
        title:'Artice four',
        author:'Prince',
        body:'this is article four'
    },
    {
        id:5,
        title:'Artice five',
        author:'Prince',
        body:'this is article five'
    },
    {
        id:6,
        title:'Artice six',
        author:'Prince',
        body:'this is article six'
    },
];
    res.render('add_article',{
        title:'Add Articles',
        articles:articles
    });
});

//Start Server
app.listen(3000,function(){
    console.log('server statred on port 3000....');
});