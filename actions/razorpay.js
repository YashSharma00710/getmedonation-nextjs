"use server"
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
export const initiate = async (amount, to_username, paymentForm) => {
    await connectDB();
    let user = await User.findOne({ username: to_username })
    const Rid = user.razorpayid
    const secret = user.razorpaysecret
    let instance = new Razorpay({
        key_id: Rid,
        key_secret: secret
    })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options)
    //create a  payment object which shows the pending payment in the database
    await Payment.create({ oid: x.id, amount: x.amount / 100, to_user: to_username, name: paymentForm.name, message: paymentForm.message, })
    return x;
}
export const fetchUser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username }).lean()
    // console.log(u.coverpic)
    // let user = u
    // console.log("user", u.coverpic)
    return JSON.parse(JSON.stringify(u))
}
export const fetchPayment = async (username) => {
    await connectDB();
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    let final = p.map((i) => ({
        ...i,
        _id: i._id.toString(),
    }))
    // let user=u.toObject({flattenObjectIds:true})
    return final
}

export const updateProfile = async (data, oldusername) => {
    await connectDB();
    let ndata = data;
    // console.log("hello:",ndata)
    //if the username is being updated,check if the username is available 
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return {
                success: false,
                // error: "Username already exist"
            }
        }
        await User.updateOne({ email: ndata.email }, { $set: ndata })
        await Payment.updateMany({to_user:oldusername},{$set:{to_user:ndata.username}})
        return {
            success: true
        }
    }
}
export const checkUserExists = async (email) => {
    await connectDB();

    const user = await User.findOne({ email });

    return !!user;
};


export const coverpic = async (name) => {
    await connectDB();
    console.log("hello yash")
    let img = await User.findOne({ username: name })
    console.log("img", img.coverpic)
    return img.coverpic;

}