var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config ={
    user:'msgtosateesh',
    database:'msgtosateesh',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
    
    title :'article one | Sateesh Chinni',
    heading :'Article one',
    date : 'aug 6 2017',
    content : `<p>
                this is dhe contentds of my first article.
            </p>
            
                        <p>
                this is the content of my first article.
            </p>


            <p>
                this is the content of my first article.
            </p>`
},
'article-two' : {
    
    title :'article two | Sateesh Chinni',
    heading :'Article two',
    date : 'aug 16 2017',
    content : `<p>
                this is dhe contentds of my second article.
            </p>
            
                        <p>
                this is the content of my second article.
            </p>


            <p>
                this is the content of my second article.
            </p>`
},
'article-three' : {
    
    title :'article third | Sateesh Chinni',
    heading :'Article three',
    date : 'aug 17 2017',
    content : `<p>
                this is dhe contentds of my third article.
            </p>
            
                        <p>
                this is the content of my third article.
            </p>


            <p>
                this is the content of my third article.
            </p>`
},
    
}

var articleOne = {
    
    title :'article one | Sateesh Chinni',
    heading :'Article one',
    date : 'aug 6 2017',
    content : `<p>
                this is dhe contentds of my first article.
            </p>
            
                        <p>
                this is the content of my first article.
            </p>


            <p>
                this is the content of my first article.
            </p>`
};

function createTemplate(data){
    
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

var htmlTemplate=`<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

            <link href="/ui/style.css" rel="stylesheet" />

        
        
    </head>
    <body>
        
        <div class="container" >
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}

        </div>
    </div>        
    </body>
    
</html>
`;

return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
    
}


app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-sateesh');
    res.send(hashedString);
    
});

// app.get('/article-one',function(req,res){
//   //res.send('Artile one requested and will  be served here')  ;
//   //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
//   res.send(createTemplate(articleOne));
// });

var pool = new Pool(config);

app.get('/test-db',function(req,res){
    pool.query('select * from test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
    
});

var counter = 0;

app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/submit-name',function(req,res){
    
    //var name = req.params.name;
    var name = req.query.name;
    names.push(name);
    
    
    
    res.send(JSON.stringify(names));
});




app.get('/articles/:articleName',function(req,res){
  //res.send('Artile one requested and will  be served here')  ;
  //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
  //var articleName =req.params.articleName;
  //res.send(createTemplate(articles[articleName]));
  var articleData = 
  //pool.query("SELECT * FROM ARTICLE1 WHERE title = '" + req.params.articleName+"'", function(err,result){
  pool.query("SELECT * FROM ARTICLE1 WHERE title = $1",[req.params.articleName], function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          
          if(result.rows.length === 0 ){
              res.status(404).send('Article Not Found');
          }else{
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));              
          }
          
      }
  });
  

});

// app.get('/article-two',function(req,res){
//   //res.send('Article two requested and will be served here');
//      res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
// });

// app.get('/article-three',function(req,res){
//   //res.send('Article three requested and will be served here');
//      res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
// });

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names = [];


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
