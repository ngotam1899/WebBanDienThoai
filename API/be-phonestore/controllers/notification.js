const Notification = require('../models/notification')
const Validator = require('../validators/validator')

const getAllNotification = async(req, res, next) => {
  try {
    let condition = {}
    let conditions = {}
    if (req.query.user != undefined && req.query.user != "") {
			condition.user = req.query.user;
    }
    if (req.query.admin != undefined && req.query.admin != "") {
			condition.user = null;
    }
    if (req.query.type != undefined && req.query.type != "") {
			condition.type = parseInt(req.query.type);
    }
    if (req.query.active != undefined && req.query.active != "") {
			conditions.active = req.query.active=='1' ? true : false;
		}
    let limit = 10;
    let page = 0;
    if (req.query.limit != undefined && req.query.limit != "") {
      const number_limit = parseInt(req.query.limit);
      if (number_limit && number_limit > 0) {
        limit = number_limit;
      }
    }
    if (req.query.page != undefined && req.query.page != "") {
      const number_page = parseInt(req.query.page);
      if (number_page && number_page > 0) {
        page = number_page;
      }
    }
    const notifications = await Notification.find(condition)
    .populate({ path: 'image', select: 'public_url' })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * page)
    const total = await Notification.countDocuments({
      ...condition, 
      ...conditions
    });
    return res.status(200).json({ success: true, code: 200, message: '', total, notifications })
  } catch (error) {
    return next(error)
  }
}

const addNotification = async(req, res, next) => {
  const notification = new Notification(req.body)
  await notification.save()
  return res.status(200).json({ success: true, code: 201, message: '', notification })
}

const updateNotification = async(req, res, next) => {
  const { IDNotification } = req.params
  const notification = req.body
  const result = await Notification.findByIdAndUpdate(IDNotification, notification)
  if (!result) {
    return res.status(200).json({ success: false, code: 400, message: 'id notification is not correctly' })
  }
  return res.status(200).json({ success: true, code: 200, message: '' })
}

const updateAllNotification = async(req, res, next) => {
  try {
    const {user} = req.body;
    await Notification.updateMany({user}, {$set: {active: false}})
    return res.status(200).json({ success: true, code: 200, message: '' })
  } catch (error) {
    return next(error)
  }
}

const deleteNotification = async (req, res, next) => {
	const { IDNotification } = req.params;
	const isValid = await Validator.isValidObjId(IDNotification);
	if (!isValid) {
		return res.status(200).json({ success: false, code: 400, message: 'id notification is not correctly' });
	} else {
		const result = await Notification.findByIdAndDelete(IDNotification);
		if (result) return res.status(200).json({ success: true, code: 200, message: '' });
	}
};

const deleteAllNotification = async (req, res, next) => {
	try {
    const { IDUser} = req.params;
    await Notification.deleteMany({user : IDUser})
    return res.status(200).json({ success: true, code: 200, message: '' })
  } catch (error) {
    return next(error)
  }
};

module.exports = {
  getAllNotification,
  addNotification,

  updateNotification,
  updateAllNotification,

  deleteNotification,
  deleteAllNotification
}