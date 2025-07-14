import Razorpay from "razorpay";

export async function POST(req) {
  const body = await req.json();

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  const options = {
    amount: body.amount * 100, // paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await instance.orders.create(options);
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
