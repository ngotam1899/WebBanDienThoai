//Config enviroment
require('dotenv').config()

const express = require('express');

//const logger = require('morgan');

const routerUser = require('./routes/user')
const routerReview = require('./routes/review')
const routerShop = require('./routes/shop')
const routerProduct = require('./routes/product')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/LearnAPI', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.log(`Connect fail, please check and try again!Error: ${error}`))

//Middlewares
//app.use(logger('dev'))

app.use(bodyParser.json())

//Routes
app.use('/users', routerUser)
app.use('/reviews', routerReview)
app.use('/shop-info', routerShop)
app.use('/products', routerProduct)


//Catch 404 error and forward them to error handler
app.use((req, res, next) => {
    const err = new HttpError('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

//Error handler function

//Start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
    console.log('Server is listening at port ' + app.get('port'));
});