const express =require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const postRoutes = require('./api/routes/posts');
const userRoutes = require('./api/routes/users');
const commentRoutes = require('./api/routes/comments');

const Url = 'mongodb+srv://jpdReactDB:' + process.env.MONGO_DB_PASSWORD +'@reactcluster-stgpr.azure.mongodb.net/apiCollections?retryWrites=true&w=majority';
const localUrl ='mongodb://localhost:27017/BlogSiteAPI';

//connects to MongoAtlas cluster, password located in local .env file not commited to git. 

mongoose.connect(localUrl,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', localUrl)
})

db.on('error', err => {
  console.error('connection error:', err)
})

//used to log HTTP request information
app.use(morgan('dev'));
//used to parse URL
app.use(bodyParser.urlencoded({exteded: false}));
//used to parse JSON data
app.use(bodyParser.json());

//setting correct headers for CORS
app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);


//used for error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;