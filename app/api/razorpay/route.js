import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import User from "@/models/User";


export const POST = async (req) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body)
    //check if razorpay order id is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.error("OrderId is not found")
    }
    //fetch the secret to the user who is getting the payment
    let user = await User.findOne({ username: p.to_user })
    const secret = user.razorpaysecret

    //Verify the payment
    let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, secret)

    if (xx) {
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" }, { new: true })
        console.log("touser:", updatedPayment.to_user)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payment=true`)
    }
    else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" })
    }
}

export const metadata = {
  title: 'RazorPay-GetMeDonation',
};