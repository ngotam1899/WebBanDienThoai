const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const Product = require('../models/Product')

var smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const createError = require('http-errors');
const service = require('../services/service');
const JWT = require('jsonwebtoken')

const { JWT_SECRET, EMAIL_NAME, PASS } = require('../configs/config')

const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 8000,
    secure: false,
    auth: {
        type: "login",
        user: EMAIL_NAME,
        pass: PASS
    }
}))

const getAllOrder = async(req, res, next) => {
    try {
        const orders = await Order.find()
        return res.status(200).json({ orders: { success: 'true', orders } })
    } catch (error) {
        return next(error)
    }
}
const addOrder = async(req, res, next) => {
    try {
        const { shipping_phonenumber, email, shipping_address, note } = req.body;
        const userID = req.user._id;
        const order = new Order();
        if (!shipping_phonenumber) return res.status(400).json({ massage: 'Phone Number is required' });
        order.shipping_phonenumber = shipping_phonenumber;
        if (!shipping_address) return res.status(400).json({ message: 'Address is required' });
        order.shipping_address = shipping_address;
        if (note) order.note = note;
        if (!email) return res.status(400).json({ message: 'Email is required' });
        order.email = email;

        order.user = userID;
        await order.save();
        return res.status(201).json({ message: 'success', order });
    } catch (error) {
        next(error);
    }
}
const addOrderItem = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const order = await Order.findById(IDOrder)

        if (!order) return res.status(404).json({ message: 'Something wrong, can not found Order' });
        if (order.confirmed == true) res.status(403).json({ message: 'Order has confirmed before, plesea post another Order for user' });

        const { product, price, quantity } = req.body;
        const productFound = await Product.findById(product)

        if (!productFound) return res.status(404).json({ message: 'Something wrong, can not found Product' });
        if (!quantity) return res.status(400).json({ message: 'Quantity is requied' });
        if (quantity < 1) return res.status(400).json({ message: 'Quantity equals 0' });

        const order_item = new OrderItem();
        order_item.product = productFound._id;
        if (!price) {
            order_item.price = productFound.price;
        } else {
            order_item.price = price;
        }
        order_item.quantity = quantity;
        await order_item.save();

        order.orderitem.push(order_item._id);
        order.total_price = order.total_price + order_item.price;
        await order.save();

        return res.status(201).json({ message: 'success', order_item })
    } catch (error) {
        next(error);
    }
}

const requestSendEmail = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const order = await Order.findById(IDOrder)
        if (!order) return res.status(404).json({ message: 'Something wrong, can not found Order to confirm' });
        if (String(order.user) != String(req.user._id)) return res.status(403).json({ message: 'permission denied' });
        if (!order.email) return res.status(400).json({ message: 'email of order is null' });

        await sendEmail(order.email, order._id);
        return res.status(200).json({ message: 'success', 'send to: ': order.email })

    } catch (error) {
        next(error)
    }
}
const sendEmail = async(email, IDOrder) => {
    const token = service.encodedToken(IDOrder, '1h');
    const url = "https://fe-phonestore.herokuapp.com/#/order/active/" + token;
    const at = {
        from: '"noreply@yourdomain.com" <noreply@yourdomain.com>',
        to: email,
        subject: 'Confirm Order',
        text: "",
        html: '<h2>Confirm Order PhoneStore</h2><p>Click <a href="' + url + '">here</a> to confirm order by PhoneStore</p>'
    };
    transporter.sendMail(at,
        async(err, response) => {
            if (err) {
                return res.status(500).json({ error: { message: 'Please check email and try again!' } })
            } else {
                console.log(response);
            }
        })
}

const confirmOrder = async(req, res, next) => {
    try {
        const { tokenOrder } = req.params
        console.log(tokenOrder)
        if (tokenOrder) {
            JWT.verify(tokenOrder, JWT_SECRET, async(err, decodeToken) => {
                if (err) {
                    return res.status(400).json({ error: { message: 'Incorect or Expired link' } });
                }
                console.log(decodeToken);
                const IDOrder = decodeToken.sub;
                const order = await Order.findById(IDOrder);

                if (!order) {
                    return res.status(400).json({ error: { message: 'Incorect Link' } });
                }
                order.confirmed = true;
                await order.save();
                return res.status(200).json("Confirm Successfull")
            })
        }
    } catch (error) {

    }
}

const finishOrder = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const order = await Order.findById(IDOrder);
        if (order.confirmed == false) return res.status(400).json({ message: 'Order is not confirm' });

        order.status = true;
        await order.save();

        return res.status(200).json({ order: { success: 'true', order } })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllOrder,
    addOrder,
    addOrderItem,
    requestSendEmail,
    confirmOrder,
    finishOrder
}