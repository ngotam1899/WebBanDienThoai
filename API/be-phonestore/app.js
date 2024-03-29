// 1. Import Area
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const cloudinary = require('cloudinary').v2;

// 1.1. Import Routers
const routerAd = require('./routes/ad');
const routerUser = require('./routes/user');
const routerReview = require('./routes/review');
const routerProduct = require('./routes/product');
const routerOrder = require('./routes/order');
const routerImage = require('./routes/image');
const routerInstallment = require('./routes/installment');
const routerPaypal = require('./routes/paypal');

// 1.2. Import Packages
const mongoose = require('mongoose');
const engines = require("consolidate");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const http = require('http')
const socketIO = require('socket.io')
const Product = require('./models/Product');
const Relate = require('./models/relate');
const Like = require('./models/like');

// 2. Define server SocketIO, Express
const app = express();
const server = http.createServer(app)
const io = socketIO(server, {
	cors: {
		origin: '*',
		methods: ["GET", "POST"],
		credentials: true
	}
})

// 3. Define view engine
app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
	fileUpload({
		useTempFiles: true
	})
);

// 4. Define Database

// @For tester
mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.5yggc.mongodb.net/mongodb?retryWrites=true&w=majority', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
	.then(() => console.log('Connected to MongoDB!'))
	.catch((error) => console.log(`Connect fail, please check and try again!Error: ${error}`))

//@For dev
/* mongoose
.connect(process.env.MONGODB_URI || 'mongodb://localhost/LearnAPI', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB!'))
.catch((error) => console.log(`Connect fail, please check and try again!Error: ${error}`)); */

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

// 5. Middlewares
app.use(cors());
app.use(function (req, res, next) {
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
app.use(bodyParser.urlencoded({ extended: true }));

// 6. Routes
app.use('/ad', routerAd);
app.use('/users', routerUser);
app.use('/reviews', routerReview);
app.use('/products', routerProduct);
app.use('/orders', routerOrder);
app.use('/image', routerImage);
app.use('/installment', routerInstallment);
app.use('/paypal', routerPaypal)

// 7. SocketIO Realtime
io.on('connection', (socket) => {
	socket.on('orderChangeStatus', ({ status, user, order }) => {
		io.sockets.emit(`order_${user}`, {
			status, order
		});
	})
	socket.on('installmentChangeStatus', ({ status, user, installment }) => {
		io.sockets.emit(`installment_${user}`, {
			status, installment
		});
	})
	socket.on('installmentMoney', ({ email, installment }) => {
		var installments = [];
		installments.push(installment);
		io.sockets.emit("newInstallmentMoney", {
			newInstallments: installments.length,
			email
		})
	});
	socket.on('order', ({ email, order }) => {
		var orders = [];
		orders.push(order);
		io.sockets.emit("newOrder", {
			newOrders: orders.length,
			email
		})
	});
	socket.on('installment', ({ email, installment }) => {
		var installments = [];
		installments.push(installment);
		io.sockets.emit("newInstallment", {
			newInstallments: installments.length,
			email
		})
	});
});

// 8. Child process python machine learning
const likeProducts = async (req, res, next) => {
	try {
		var products = await Product.find({}, { _id: 1 });
		for (let i = 0; i < products.length; i++) {
			var spawn = require('child_process').spawn;
			var process = spawn('python', [
				'./middlewares/like.py',
				products[i]._id,
			]);
			process.stdout.on("data", async (data) => {
				// Convert string to JSON
				var _data = JSON.stringify(data.toString())
				var result = JSON.parse(JSON.parse(_data));
				const recommendFound = await Like.findOne({ product: products[i]._id })
				if (recommendFound) {
					recommendFound.recommend = result.data;
					await recommendFound.save();
				}
				else {
					const relate = new Like();
					relate.product = products[i]._id,
						relate.recommend = result.data;
					await relate.save()
				}
				/* await Product.populate(result, { path: 'data', select: ['name', 'bigimage', 'stars', 'price_min', 
				'pathseo', 'active', 'reviewCount', 'real_price_min', 'real_price_max'],
				populate : {path : 'bigimage', select: "public_url"} });
				return res.status(200).json({ success: true, code: 200, result: result.data }); */
			})
		}
		return res.status(200).json({ success: true, code: 200, result: "Training successfully" });
	} catch (error) {
		next(error)
	}
}

const relateProducts = async (req, res, next) => {
	try {
		var products = await Product.find({}, { _id: 1 });
		for (let i = 0; i < products.length; i++) {
			var spawn = require('child_process').spawn;
			var process = spawn('python', [
				'./middlewares/relate.py',
				products[i]._id,
			]);
			process.stdout.on("data", async (data) => {
				// Convert string to JSON
				var _data = JSON.stringify(data.toString())
				var result = JSON.parse(JSON.parse(_data));
				const recommendFound = await Relate.findOne({ product: products[i]._id })
				if (recommendFound) {
					recommendFound.recommend = result.data;
					await recommendFound.save();
				}
				else {
					const relate = new Relate();
					relate.product = products[i]._id,
						relate.recommend = result.data;
					await relate.save()
				}
			})
		}
		return res.status(200).json({ success: true, code: 200, result: "Training successfully" });
		/* await Product.populate(result, { path: 'data', select: ['name', 'bigimage', 'stars', 'price_min', 
				'pathseo', 'active', 'reviewCount', 'real_price_min', 'real_price_max'],
				populate : {path : 'bigimage', select: "public_url"} });
				return res.status(200).json({ success: true, code: 200, result: result.data }); */
	} catch (error) {
		console.log(error)
		next(error)
	}
}

app.get('/train-like', likeProducts);
app.get('/train-relate', relateProducts);

// 9. Catch 404 error and forward them to error handler
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

// 10. Start server
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function () {
	console.log('Server is listening at port ' + app.get('port'));
});
