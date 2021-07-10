const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AcTxeUF198ynxIDCym7_S42CtfWEOX0zriP9Mf-WSqmitUBy5kgL1-bVVKIRK-LSvHkJIMMI19xa9snH",
  client_secret:
    "EMLf7SalfYbuGTP3PhDQBqqT_RLmQd4arxeReRlJGbiNWwB2U2S_4GUp28UHd6cR3nrfpJqOnCQlT2RV",
});

const getPayPal = async (req, res, next) => {
  try {
    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: 'http://be-phonestore.herokuapp.com/paypal/success',
        cancel_url: 'http://be-phonestore.herokuapp.com/paypal/cancel',
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: req.query.total,
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment);
        res.redirect(payment.links[1].href);
      }
    });
  } catch (error) {
    next(error);
  }
};

const successPayPal = async (req, res, next) => {
  try {
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
      payer_id: PayerID,
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          res.render("success");
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const cancelPayPal = async (req, res, next) => {
  try {
    res.render("cancel");
  } catch {
    next(error);
  }
};

module.exports = {
  getPayPal,
  successPayPal,
  cancelPayPal,
};
