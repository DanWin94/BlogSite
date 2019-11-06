const express =require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./api/routes/posts');
const userRoutes = require('./api/routes/users');
const commentRoutes = require('./api/routes/comments');

//connects to MongoAtlas cluster, password located in "nodemon.json" file
mongoose.connect('mongodb+srv://dtran94:' + process.env.MONGO_ATLAS_PW + '@cluster0-irsh5.azure.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true
}
);

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