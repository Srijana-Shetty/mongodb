const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Srijana:cFnblp2tMQdx0YSa@cluster0.juceajt.mongodb.net/node-tuto?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');




//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) => {
      const blog = new Blog({
        title: 'new blog 2',
        snippet:'about my new blog',
        body:'more about new blog'
      })

      blog.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      })
})

app.get('/all-blogs',(req,res) => {
    Blog.find()
    .then((result)=> {
        res.send(result);
    })
    .catch((err) => console.log(err))
})

app.get('/single-blog', (req,res) => {
    Blog.findById('65dedca22b1bc494c05503ce')
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
        console.log(err);
      })
})

// routes
app.get('/', (req, res) => {
    const blogs= [
        {title: 'Yash1 finds eggs', snippet:' have a nice day'},
        {title: 'Mario finds stars', snippet: 'hyee hello good morning'},
        {title:'go to shop', snippet: 'had your breakfast'}
    ];
    res.render('index', {title: 'home' , blogs});
})

app.get("/about", (req,res) => {
    res.render('about', {title: 'About'})
})

// blog routes
// app.get("/blogs/create", (req,res) => {
//     res.render('create', {title: 'Create a new blog'})
// })

//   app.get('/blogs', (req, res) => {
//     Blog.find().sort({ createdAt: -1 })
//       .then(result => {
//         res.render('index', { blogs: result, title: 'All blogs' });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
  
//   // 404 page
//   app.use((req, res) => {
//     res.status(404).render('404', { title: '404' });
//   });

