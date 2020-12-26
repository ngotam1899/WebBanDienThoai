const Order = require('../models/Order')
const Product = require('../models/Product')
const Image_Pro = require('../models/Image_Pro')
const Validator = require('../validators/validator')

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
        return res.status(200).json({ success: true, code: 200, message: '', orders: orders })
    } catch (error) {
        return next(error)
    }
}
const addOrder = async(req, res, next) => {
    try {
        const { shipping_phonenumber, payment_method, email, shipping_address, note, total_price, total_quantity, order_list } = req.body;
        const userID = req.user._id;
        const order = new Order();
        if (!shipping_phonenumber) return res.status(200).json({ success: false, code: 400, massage: 'Phone Number is required' });
        order.shipping_phonenumber = shipping_phonenumber;
        if (!shipping_address) return res.status(200).json({ success: false, code: 400, message: 'Address is required' });
        order.shipping_address = shipping_address;
        if (note) order.note = note;
        if (!email) return res.status(200).json({ success: false, code: 400, message: 'Email is required' });
        order.email = email;
        if (!total_price) return res.status(200).json({ success: false, code: 400, message: 'Total Price is required' })
        order.total_price = total_price;
        if (!total_quantity) return res.status(200).json({ success: false, code: 400, message: 'Total Quantity is required' })
        order.total_quantity = total_quantity;
        if (payment_method == 'paypal') {
            order.is_paid = true;
            order.payment_method = 'paypal';
            order.confirmed = true;
        }
        if (order_list) {
            for (let item of order_list) {
                let productFound = await Product.findById(item.product);
                if (productFound) {
                    let product = productFound._id;
                    let name = productFound.name;
                    let price = productFound.price;

                    console.log(productFound)
                    let imageFound = await Image_Pro.findById(productFound.bigimage);
                    if (imageFound) {
                        var image = imageFound.public_url;
                    }
                    let quantity = item.quantity
                    await order.order_list.push({ product, name, price, image, quantity });
                }
            }
        }
        //order.order_list = order_list;
        order.user = userID;
        await order.save();
        return res.status(200).json({ success: true, code: 201, message: 'success', order: order });
    } catch (error) {
        next(error);
    }
}
const addOrderItem = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const order = await Order.findById(IDOrder)

        if (!order) return res.status(404).json({ success: false, code: 404, message: 'Something wrong, can not found Order' });
        if (order.confirmed == true) res.status(403).json({ success: false, code: 403, message: 'Order has confirmed before, plesea post another Order for user' });

        const { product, price, quantity } = req.body;
        const productFound = await Product.findById(product)

        if (!productFound) return res.status(200).json({ success: false, code: 404, message: 'Something wrong, can not found Product' });
        if (!quantity) return res.status(200).json({ success: false, code: 400, message: 'Quantity is requied' });
        if (quantity < 1) return res.status(200).json({ success: false, code: 400, message: 'Quantity equals 0' });

        await order.save();

        return res.status(200).json({ success: true, code: 201, message: 'success', order: order })
    } catch (error) {
        next(error);
    }
}

const requestSendEmail = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const order = await Order.findById(IDOrder)
        if (!order || order.confirmed == true) return res.status(200).json({ success: false, code: 404, message: 'Something wrong, can not found Order to confirm' });
        if (String(order.user) != String(req.user._id)) return res.status(200).json({ success: false, code: 403, message: 'permission denied' });
        if (!order.email) return res.status(200).json({ success: false, code: 400, message: 'email of order is null' });

        await sendEmail(order.email, order._id);
        return res.status(200).json({ message: 'success', 'send to: ': order.email })

    } catch (error) {
        next(error)
    }
}
const sendEmail = async(email, IDOrder) => {
    const token = service.encodedToken(IDOrder, '1h');
    const url = "https://localhost:5000/#/order/active/" + token;
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
                    return res.status(200).json({ success: false, code: 400, message: 'Incorect or Expired link' });
                }
                const IDOrder = decodeToken.sub;
                const order = await Order.findById(IDOrder);

                if (!order) {
                    return res.status(200).json({ success: false, code: 400, message: 'Incorect Link' });
                }
                order.confirmed = true;
                await order.save();
                return res.status(200).json({ message: true, code: 200, message: 'Confirm Successfull' })
            })
        }
    } catch (error) {

    }
}

const finishOrder = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const order = await Order.findById(IDOrder);
        if (order.confirmed == false) return res.status(200).json({ success: false, code: 400, message: 'Order is not confirm' });

        order.status = true;
        await order.save();

        return res.status(200).json({ success: true, code: 200, message: '', order: order })
    } catch (error) {
        return next(error)
    }
}

const userGetOrder = async(req, res, next) => {
    try {
        const { IDUser } = req.params;
        const isValid = await Validator.isValidObjId(IDUser);
        if (!isValid) return res.status(200).json({ success: false, code: 400, message: 'User is not correctly' });
        const order = await Order.find({ user: IDUser });

        return res.status(200).json({ success: true, code: 200, message: "", orders: order })
    } catch (error) {
        return next(error)
    }
}
const getAnOrder = async(req, res, next) => {
    try {
        const { IDOrder } = req.params;
        const isValid = await Validator.isValidObjId(IDOrder);
        if (!isValid) return res.status(200).json({ success: false, code: 400, message: 'ID is not correctly' });
        const order = await Order.findById(IDOrder)
        return res.status(200).json({ success: true, code: 200, message: '', order: order })
    } catch (error) {
        return next(error)
    }
}
const findOrderByPhone = async(req, res, next) => {
    const phone = req.query.phone;
    const order = await Order.find({ shipping_phonenumber: phone });
    return res.status(200).json({ success: true, code: 200, message: '', order: order })
}
const deleteOrder = async(req, res, next) => {
    const { IDOrder } = req.params;
    let is_valid = await Validator.isValidObjId(IDOrder);
    if (!is_valid) return res.status(200).json({ success: false, code: 400, message: 'id is not correctly' })

    let result = await Order.findByIdAndDelete(IDOrder);
    if (result) {
        return res.status(200).json({ success: true, code: 200, message: 'removed' })
    } else {
        return res.status(200).json({ success: false, code: 400, message: 'id is not correctly' })

    }

}
module.exports = {
    getAllOrder,
    getAnOrder,
    addOrder,
    addOrderItem,
    requestSendEmail,
    deleteOrder,
    confirmOrder,
    finishOrder,
    userGetOrder,
    findOrderByPhone
}