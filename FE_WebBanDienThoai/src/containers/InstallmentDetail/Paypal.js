import React, { useRef, useEffect } from "react";

export default function Paypal({ id, moneyUSD, money, onUpdate, queryParams }) {
  const paypal = useRef();
  /* eslint-disable */
  useEffect(() => {
    window.paypal.Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Tell Me Payment",
                amount: {
                  currency_code: "USD",
                  value: moneyUSD,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          data = {
            money
          }
          onUpdate(id, data, queryParams);
          await actions.order.capture();
        },
        onError: (err) => {
        },
      })
      .render(paypal.current);
  }, []);
/* eslint-disable */
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
