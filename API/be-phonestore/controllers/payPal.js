const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
      "AcTxeUF198ynxIDCym7_S42CtfWEOX0zriP9Mf-WSqmitUBy5kgL1-bVVKIRK-LSvHkJIMMI19xa9snH",
  client_secret:
      "EMLf7SalfYbuGTP3PhDQBqqT_RLmQd4arxeReRlJGbiNWwB2U2S_4GUp28UHd6cR3nrfpJqOnCQlT2RV"
});

const getPayPal = async(req, res, next) => {
  const {total} = req.body;
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: `${process.env.URL}/paypal/success`,
      cancel_url: `${process.env.URL}/paypal/cancel`
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total
        },
        description: "This is the payment description."
      }
    ]
  };

  paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
}

const successPayPal = async(req, res, next) => {
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
    payer_id: PayerID
  };
  paypal.payment.execute(paymentId, execute_payment_json, function(
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log("Get Payment Response");
      console.log(JSON.stringify(payment));
      res.render("success");
    }
  });
}

const cancelPayPal = async(req, res, next) => {
  res.render("cancel");
}

module.exports = {
  getPayPal,
  successPayPal,
  cancelPayPal
}