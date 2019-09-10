const express =require('express');
const path = require('path');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const  { check, validationResult }  = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

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

//middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname,'public')));

//express sesssion middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,

}));

//express session message
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware



// Home Route
app.get('/',function(req,res){
    Articles.find({},function(err,articles){
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

//view article
app.get('/article/:id',function(req,res){
    Articles.findById(req.params.id,function(err, article){
        if(err){
            console.log(err);
        }else{
            res.render('view_article',{
                title:'View Article',
                article:article
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

app.post('/articles/add',[check('title', "your custom error message").isEmpty()], function(req,res){

    //get errors
    const errors = validationResult(req);
    if (errors) {
        res.render('add_article',{
            title:'Add Article',
            errors:errors
        });
    }else{
        let article = new Articles();
        article.title =req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

        article.save(function(err){
            if(err){
                console.log(err);
                return ;
            }else{
                req.flash('success','Article added succesfully');
                res.redirect('/');
            }
        })
    }


});

// edit articles routes
app.get('/article/edit/:id',function(req,res){
    Articles.findById(req.params.id,function(err, article){
        if(err){
            console.log(err);
        }else{
            res.render('edit_article',{
                title:'Edit Article',
                article:article
            });
        }
    });
});

// post edit articles routes
app.post('/article/edit/:id',function(req,res){
    let article = {};
    article.title =req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Articles.update(query,article, function(err){
        if(err){
            console.log(err);
            return ;
        }else{
            req.flash('success','Article edit succesfully');
            res.redirect('/');
        }
    })
});

//delete article
app.delete('/article/delete/:id',function(req,res){
    let query = {_id:req.params.id};

    Articles.remove(query,function(err){
        if(err){
            console.log(err);
        }else{
            res.send('Success');
        }
    });
});

//Start Server
app.listen(3000,function(){
    console.log('server statred on port 3000....');
});