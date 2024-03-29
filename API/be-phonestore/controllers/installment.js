const Installment = require('../models/installment');
const Notification = require('../models/notification');
const Product = require('../models/Product');
const User = require('../models/User');
const Validator = require('../validators/validator');
const CronJob = require('cron').CronJob;

const getAllInstallment = async (req, res, next) => {
	try {
    let condition = {};
    if (req.query.active != undefined && req.query.active != '') {
			condition.active = req.query.active == '1' ? true : false;
    }
    if (req.query.status != undefined && req.query.status != '') {
			condition.status = req.query.status;
    }
    if (req.query.period != undefined && req.query.period != '') {
			condition.period = req.query.period;
    }
    if (req.query.user != undefined && req.query.user != '') {
			condition.user = req.query.user;
    }
    if (req.query.product != undefined && req.query.product != '') {
			condition['product._id'] = req.query.product
    }
    let limit = 10;
		let page = 0;
		if (req.query.limit != undefined && req.query.limit != '') {
			const number_limit = parseInt(req.query.limit);
			if (number_limit && number_limit > 0) {
				limit = number_limit;
			}
		}
		if (req.query.page != undefined && req.query.page != '') {
			const number_page = parseInt(req.query.page);
			if (number_page && number_page > 0) {
				page = number_page;
			}
    }
    const total = await Installment.countDocuments(condition);
    const installments = await Installment.find(condition, {user: 1, product: 1, startedAt: 1, endedAt: 1, status: 1, debt: 1, paid: 1, prepay: 1, active: 1})
    .populate({ path: 'user', select: ["image", "firstname", "lastname", "phonenumber"], populate : {path : 'image', select: "public_url"} })
    .populate({ path: 'staff', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
    .populate({ path: 'product.color', select: "name_vn"})
    .populate({ path: 'product._id', select: ["bigimage", "name"], populate : {path : 'bigimage', select: "public_url"}})
    .sort({ createdAt: -1 })
    .limit(limit)
		.skip(limit * page);
		return res.status(200).json({ success: true, code: 200, message: '', total, installments });
	} catch (error) {
		return next(error);
	}
};

const addInstallment = async (req, res, next) => {
  try {
    var { startedAt, period, prepay , interest_rate, product } = req.body;
    period = parseInt(period);
    const installment = new Installment(req.body);
    if(startedAt && period){  // Xuất ngày đáo hạn
      const _startedAt = new Date(startedAt);
      installment.endedAt = new Date(_startedAt.setMonth(_startedAt.getMonth() + period))
      if(prepay && interest_rate){  // Xuất tiền nợ, detail
        var debt = Math.ceil(((product.product_price-prepay )*(1 + interest_rate*0.01))/1000)* 1000
        var detail = []
        for(let i=0; i<period; i++){
          const due_date = new Date(_startedAt.setMonth(_startedAt.getMonth() + 1 + i))
          detail[i] = {
            month: i+1,
            due_date,
            payable: parseInt(debt/period),
            status: 0
          }
        }
        installment.debt = debt;
        installment.detail = detail
      }
    }
    await installment.save();
    if(startedAt){
      // Sau 1 tháng, nếu tới hạn trả góp mà detailItem.status vẫn còn là 0 (chưa tới hạn) thì 
      // đặt lại detailItem.status là -1 (quá hạn)
      const _startedAt = new Date(startedAt);
      const expire = new Date(_startedAt.setMonth(_startedAt.getMonth() + period));
      var job = new CronJob( `${_startedAt.getMinutes()} ${_startedAt.getHours()} * * *`, 
        async() => {
          //Mỗi ngày, chạy kiểm tra xem hôm nay đã tới hẹn trả chưa?
          const thisTime = new Date();
          const installmentNow = await Installment.findById(installment._id);
          // Thông báo khi đơn hết hạn
          const productInstallment = await Product.findById(installment.product._id)
          const staffInstallment = await User.findById(installment.staff)
          const userInstallment = await User.findById(installment.user)
          installmentNow.detail.map(async item => {
            var due_date = new Date(item.due_date); // Ngày tới hạn
            var due_pay = item.payable*item.month;  // Số tiền phải trả = payable*số tháng
            if(due_date >= thisTime && installment.paid < due_pay){  
              // Nếu quá hạn và số tiền đã trả ít hơn số tiền phải trả (status = -1) -> quá hạn
              item.status = -1;
              installmentNow.status = 2;
              // 1. Thông báo cho người dùng
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} đã quá hạn`,
                link: installment._id,
                user: installment.user,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy liên hệ với nhân viên phụ trách ${staffInstallment.firstname} ${staffInstallment.lastname} qua số điện thoại ${staffInstallment.phonenumber} hoặc email ${staffInstallment.email} để kiểm tra và xác thực tình trạng trả góp`
              })
              // 2. Thông báo cho admin
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} đã quá hạn`,
                link: installment._id,
                user: null,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy liên hệ với khách hàng ${userInstallment.firstname} ${userInstallment.lastname} qua số điện thoại ${userInstallment.phonenumber} hoặc email ${userInstallment.email} để kiểm tra và xác thực tình trạng trả góp`
              })
              await job.stop();
            }
            // Nếu còn 5 ngày nữa thì tới hạn, gửi thông báo cho user + mail mỗi ngày
            if((due_date - thisTime > 1 || due_date - thisTime < 5) && installment.paid < due_pay){
              // 1. Thông báo cho người dùng
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} còn ${due_date - thisTime} ngày để thanh toán`,
                link: installment._id,
                user: installment.user,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy đến chi nhánh của TellMe để tiến hành trả góp trước ngày ${due_date} hoặc thanh toán online thông qua Paypal trên Trang cá nhân của bạn trên TellMe`
              })
              // 2. Thông báo cho admin
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} còn ${due_date - thisTime} ngày để thanh toán`,
                link: installment._id,
                user: null,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy liên hệ với khách hàng ${userInstallment.firstname} ${userInstallment.lastname} qua số điện thoại ${userInstallment.phonenumber} hoặc email ${userInstallment.email} để kiểm tra và xác thực tình trạng trả góp`
              })

            }
          })
          await installmentNow.save();
          // Kiểm tra đã hết hạn thì dừng Job
          if(expire >= thisTime){
            await job.stop();
          }
        },async () => {
          
        },
        true, /* Start the job right now */
        'Asia/Ho_Chi_Minh' /* Time zone of this job. */
      );
    }
    
    return res.status(200).json({ success: true, code: 201, message: '', installment });
  } catch (error) {
    return next(error);
  }
};

const updateInstallment = async (req, res, next) => {
  try {
    const { IDInstallment } = req.params;
    const { money, status, startedAt, period, prepay, interest_rate, active, staff } = req.body;
    const installment = await Installment.findById(IDInstallment);
    if (!installment) {
      return res.status(200).json({ success: false, code: 400, message: 'id installment is not correctly' });
    }
    if(status) {
      if(status == 0 && installment.status == -1){  // Nếu từ chưa duyệt chuyển sang chưa hoàn tất -> giảm số lượng sp
        const productFound = await Product.findById(installment.product._id)
        productFound.colors.find(i => i._id == installment.product.color.toString()).amount -= 1;
        await productFound.save();
      }
      installment.status = status;
    }
    if(staff) installment.staff = staff;
    if(active == false && installment.status == -1) installment.active = active;
    if(money > 0){
      installment.paid += parseInt(money)
      if(installment.debt - parseInt(money) <= 0){
        installment.debt = 0;
        installment.status = 1;
      }
      else{
        installment.debt -= parseInt(money);
      }
      var _money = installment.paid
      installment.detail.map(item => {
        if(_money >= item.payable){
          item.status = 1;
          _money -= item.payable;
        }
      })
    }
    if(installment.detail.length == 0){
      if(prepay && interest_rate){  // Xuất tiền nợ, detail
        var debt = Math.ceil(((installment.product.product_price-prepay )*(1 + interest_rate*0.01))/1000)* 1000
        var detail = []
        for(let i=0; i<period; i++){
          const _startedAt = new Date(startedAt);
          const due_date = new Date(_startedAt.setMonth(_startedAt.getMonth() + 1 + i))
          detail[i] = {
            month: i+1,
            due_date,
            payable: parseInt(debt/period),
            status: 0
          }
        }
        installment.debt = debt;
        installment.detail = detail
      }
    }
    if(installment.startedAt == undefined && startedAt){
      installment.startedAt = startedAt;
      // Sau 1 tháng, nếu tới hạn trả góp mà detailItem.status vẫn còn là 0 (chưa tới hạn) thì 
      // đặt lại detailItem.status là -1 (quá hạn)
      const _startedAt = new Date(startedAt);
      const expire = new Date(_startedAt.setMonth(_startedAt.getMonth() + period));
      installment.endedAt = expire;
      var job = new CronJob(`${_startedAt.getMinutes()} ${_startedAt.getHours()} * * *`, 
        async() => {
          const thisTime = new Date();
          const installmentNow = await Installment.findById(installment._id);
          // Thông báo khi đơn hết hạn
          const productInstallment = await Product.findById(installment.product._id)
          const staffInstallment = await User.findById(installment.staff)
          const userInstallment = await User.findById(installment.user)
          installmentNow.detail.map(async item => {
            var due_date = new Date(item.due_date); // Ngày tới hạn
            var due_pay = item.payable*item.month;  // Số tiền phải trả = payable*số tháng
            if(due_date >= thisTime && installment.paid < due_pay){  
              // Nếu quá hạn và số tiền đã trả ít hơn số tiền phải trả (status = -1) -> quá hạn
              item.status = -1;
              installmentNow.status = 2;
              // 1. Thông báo cho người dùng
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} đã quá hạn`,
                link: installment._id,
                user: installment.user,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy liên hệ với nhân viên phụ trách ${staffInstallment.firstname} ${staffInstallment.lastname} qua số điện thoại ${staffInstallment.phonenumber} hoặc email ${staffInstallment.email} để kiểm tra và xác thực tình trạng trả góp`
              })
              // 2. Thông báo cho admin
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} đã quá hạn`,
                link: installment._id,
                user: null,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy liên hệ với khách hàng ${userInstallment.firstname} ${userInstallment.lastname} qua số điện thoại ${userInstallment.phonenumber} hoặc email ${userInstallment.email} để kiểm tra và xác thực tình trạng trả góp`
              })
              await job.stop();
            }
            // Nếu còn 5 ngày nữa thì tới hạn, gửi thông báo cho user + mail mỗi ngày
            if((due_date - thisTime > 1 || due_date - thisTime < 5) && installment.paid < due_pay){
              // 1. Thông báo cho người dùng
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} còn ${due_date - thisTime} ngày để thanh toán`,
                link: installment._id,
                user: installment.user,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy đến chi nhánh của TellMe để tiến hành trả góp trước ngày ${due_date} hoặc thanh toán online thông qua Paypal trên Trang cá nhân của bạn trên TellMe`
              })
              // 2. Thông báo cho admin
              await Notification.insert({
                name: `Phiếu trả góp ${installment._id} còn ${due_date - thisTime} ngày để thanh toán`,
                link: installment._id,
                user: null,
                image: productInstallment.bigimage,
                type: 2,
                content: `Hãy liên hệ với khách hàng ${userInstallment.firstname} ${userInstallment.lastname} qua số điện thoại ${userInstallment.phonenumber} hoặc email ${userInstallment.email} để kiểm tra và xác thực tình trạng trả góp`
              })

            }
          })
          await installmentNow.save();
          // Kiểm tra đã hết hạn thì dừng Job
          if(expire >= thisTime){
            await job.stop();
          }
          
        },async () => {
          // Kết thúc trả góp không làm gì cả
        },
        true, /* Start the job right now */
        'Asia/Ho_Chi_Minh' /* Time zone of this job. */
      );
    }
    await installment.save()
    return res.status(200).json({ success: true, code: 200, message: '', installment });
  } catch (error) {
    return next(error);
  }
};

const deleteInstallment = async (req, res, next) => {
  try {
    const { IDInstallment } = req.params;
    const isValid = await Validator.isValidObjId(IDInstallment);
    if (!isValid) {
      return res.status(200).json({ success: false, code: 400, message: 'id installment is not correctly' });
    } else {
      const result = await Installment.findByIdAndDelete(IDInstallment);
      if (result) return res.status(200).json({ success: true, code: 200, message: '' });
    }
  } catch (error) {
    return next(error);
  }
};

const getDetailInstallment = async (req, res, next) => {
  try {
    const { IDInstallment } = req.params;
    const isValid = await Validator.isValidObjId(IDInstallment);
    if (!isValid) {
      return res.status(200).json({ success: false, code: 400, message: 'id installment is not correctly' });
    } else {
      const result = await Installment.findById(IDInstallment)
      .populate({ path: 'user', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
      .populate({ path: 'staff', select: ["image", "firstname", "lastname", "phonenumber"], populate : {path : 'image', select: "public_url"} })
      .populate({ path: 'product.color', select: "name_vn"})
      .populate({ path: 'product._id', select: ["bigimage", "name"], populate : {path : 'bigimage', select: "public_url"}});
      return res.status(200).json({ success: true, code: 200, message: '', installment: result });
    }
  } catch (error) {
    return next(error);
  }
};

// Số lượng installment mỗi ngày, mỗi tháng, mỗi quí
const sessionInstallment = async (req, res, next) => {
	const today = new Date();
	try {
		let condition = {};
		if (req.query.browse != undefined && req.query.browse != '') {
			switch(req.query.browse){
				case 'day':
					condition.browse = {
						'$match': { 
							'_id.year' : today.getFullYear(), 
							'_id.month' : today.getMonth() + 1, 
							'_id.day': today.getDate()
						}
					}
					break;
				case 'month':
					condition.browse = { 
						'$match': { 
							'_id.year' : today.getFullYear(), 
							'_id.month' : today.getMonth() + 1 
						}
					}
					break;
				case 'year':
					condition.browse = {
						'$match': { 
							'_id.year' : today.getFullYear()
						}
					}
					break;
				default:
					condition.browse = {
						'$project': { 
							'_id' : 1, 'count': 1
						}
					};
			}
		}
		else{
			condition.browse = {
				'$project': { 
					'_id' : 1, 'count': 1
				}
			};
		}
		const pipeline = [
      {
        '$match': {
          'status': 1
        }
      },
			{
				'$group':
				{
					'_id':  {						
						day: {'$dayOfMonth': '$updatedAt'}, 
						month: {'$month': '$updatedAt'}, 
						year: {'$year': '$updatedAt'}
					},
					'count': {
						'$sum': 1
					}
				}
			},
			{ '$sort': { '_id.year': 1, '_id.month': 1, '_id.day': 1} },
			condition.browse
		];
		const installment = await Installment.aggregate(pipeline);
		const count = installment.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
		return res
			.status(200)
			.json({ success: true, code: 200, message: '', count, installment});
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getAllInstallment,
	addInstallment,
	updateInstallment,
	deleteInstallment,
	getDetailInstallment,
  sessionInstallment
};
