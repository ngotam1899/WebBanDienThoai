//Config enviroment
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const cloudinary = require('cloudinary').v2;

const routerUser = require('./routes/user');
const routerReview = require('./routes/review');
const routerProduct = require('./routes/product');
const routerOrder = require('./routes/order');
const routerImage = require('./routes/image');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const http = require('http')
const socketIO = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketIO(server,{
	cors: {
		origin: '*',
		methods: ["GET", "POST"],
		credentials: true
	}
})

app.use(
	fileUpload({
		useTempFiles: true
	})
);

// @For tester
/* mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.5yggc.mongodb.net/mongodb?retryWrites=true&w=majority', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB!'))
.catch((error) => console.log(`Connect fail, please check and try again!Error: ${error}`))  */

// @For dev
mongoose
 	.connect(process.env.MONGODB_URI || 'mongodb://localhost/LearnAPI', {
 		useCreateIndex: true,
 		useNewUrlParser: true,
 		useUnifiedTopology: true,
 		useFindAndModify: false
 	})
 	.then(() => console.log('Connected to MongoDB!'))
 	.catch((error) => console.log(`Connect fail, please check and try again!Error: ${error}`));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

//Middlewares
//app.use(logger('dev'))
app.use(cors());
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
	);
	res.header('Access-Control-Expose-Headers', '*');
	req.header('Access-Control-Allow-Headers', '*');
	next();
});
app.use(bodyParser.json());


//Routes
app.use('/users', routerUser);
app.use('/reviews', routerReview);
app.use('/products', routerProduct);
app.use('/orders', routerOrder);
app.use('/image', routerImage);


io.on('connection', (socket) => {
	var admin;
	socket.on("login", ()=>{
		console.log('test', socket.id)
		admin = socket.id;
		//Lấy giá trị order mới nhất từ database
  })
  socket.on('order', ({ email, order }) => {
		// Nếu bắt đc trạng thái join
    // Thêm order vào danh sách order mới
		socket.join(order);
		// Trả về toàn bộ order cho admin
		var orders = [];
    orders.push(order);
		io.sockets.emit("newOrder", {newOrders: orders.length})
		console.log(orders)
    // "Chào mừng user vào phòng"
    //socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // Cho mọi người trong phòng cùng biết, ko cho mình
    //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    //callback(); // lặp lại mỗi lần bắt đc sự kiện join
  });
});

//Catch 404 error and forward them to error handler
app.use((req, res, next) => {
	const err = new HttpError('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};
	const status = err.status || 500;

	return res.status(status).json({
		error: {
			message: error.message
		}
	});
});

//Error handler function

//Start server
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function() {
	console.log('Server is listening at port ' + app.get('port'));
});
