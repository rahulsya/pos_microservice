const midtransClient = require("midtrans-client");
const { PAYMENT_PRODUCTION, CLIENT_KEY, SERVER_KEY } = process.env;

let snap = new midtransClient.Snap({
  isProduction: false,
  clientKey: CLIENT_KEY,
  serverKey: SERVER_KEY,
});

const intiatePayment = async (req, res) => {
  try {
    const { order, user } = req.body;

    let parameter = {
      transaction_details: {
        order_id: order.invoice,
        gross_amount: order.total_price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
      },
    };

    console.log(req.body);
    let response = await snap.createTransaction(parameter);

    return res.json(response);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavaiable" });
    }
    return res.json(error.response);
    // const { status, data } = error.response;
    // return res.status(status).json(data);
  }
};

module.exports = { intiatePayment };
