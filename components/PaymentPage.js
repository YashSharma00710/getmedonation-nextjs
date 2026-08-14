"use client"
import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { useParams } from 'next/navigation'
import { coverpic, fetchPayment, fetchUser, initiate } from '@/actions/razorpay'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
// import payments from 'razorpay/dist/types/payments'

const PaymentPage = () => {
    // console.log(` Payment: ${JSON.stringify(Payment)}`)
    const [paymentForm, setpaymentForm] = useState({ name: "", message: "", amount: "" })
    const { data: session, status } = useSession();
    const [currentuser, setcurrentuser] = useState({})
    const [Payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    let param = useParams()

    useEffect(() => {
        getdata()
    }, [session])


    useEffect(() => {
        if (searchParams.get("payment") == "true") {
            toast.success('Payment made succesfully ThankYou!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            router.push(`/${session?.user?.name}`)
        }
        if(!session){
            router.push("/login")
        }
    }, [searchParams, session, router])


    const inputref = useRef()

    const handlechange = (e) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }
    const getdata = async () => {
        let u = await fetchUser(session?.user?.name)
        setcurrentuser(u)
        console.log(currentuser)

        let dbpayments = await fetchPayment(param.username)
        setPayments(dbpayments)
    }
    const pay = async (amount) => {
        if (paymentForm.name.length >= 3 && paymentForm.message.length >= 3) {
            let a = await initiate(amount, param.username, paymentForm)
            let orderID = a.id;
            let options = {
                "key": currentuser?.razorpayid, // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. 
                "currency": "INR",
                "name": "GetMeDonation", //your business name
                "description": "Test Transaction",
                "image": "/atm-card.png",
                "order_id": orderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9976543210" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            }
            let rzp1 = new Razorpay(options);
            rzp1.open();
        }
        else {
            toast('Fill the fields First!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='w-full min-h-[55vh] relative'>
                <img src="cover.jpg" alt="" className='absolute inset-0 w-full h-full object-cover' />
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                    <img
                        src={currentuser?.coverpic}
                        className='max-[1336px]:w-24 max-[993px]:w-20 max-[700px]:w-19 w-27 rounded-2xl aspect-square object-cover'
                        alt=""
                    />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-16 gap-2">
                <div className='font-bold text-2xl'>
                    {param.username}
                </div>
                <div className="text-slate-400">
                    Creating Animated art for VTT's
                </div>
                <div >
                    <ul className='flex gap-9 text-slate-400'>
                        <li >{Payments.length} payments</li>
                        <li className='list-disc'>{Payments.reduce((acc, curr) => acc + Number(curr.amount), 0)} Fund Raised</li>
                        {/* <li className='list-disc'>$16,760/release</li> */}
                    </ul>
                </div>
                <div className="payment flex gap-3 w-[80%] max-[700px]:w-[90%] max-[400px]:flex-col">
                    <div className="supporter w-1/2  bg-slate-900 rounded-lg p-3 space-y-4 max-[400px]:w-full">
                        <h2 className='text-2xl font-bold text-center max-[630px]:text-xl'>
                            Top suppoter
                        </h2>
                        {/* Show list of all the supporter as a leaderboard */}
                        {/* <ul className='flex flex-col gap-3'>
                            <li className='flex gap-2 items-center'>
                                <img src="/user.png" width={30} alt="user avatar" />
                                <span>Anshuman donate <span className='font-bold'>₹30</span> rupees with a message <span>"I love your work bro"</span>.a </span>
                            </li>
                            <li className='flex gap-2 items-center'>
                                <img src="/user.png" width={30} alt="user avatar" />
                                <span>Anshuman donate <span className='font-bold'>₹30</span> rupees with a message <span>"I love your work bro"</span>.</span>
                            </li>
                            <li className='flex gap-2 items-center'>
                                <img src="/user.png" width={30} alt="user avatar" />
                                <span>Anshuman donate <span className='font-bold'>₹30</span> rupees with a message <span>"I love your work bro"</span>.</span>
                            </li>
                        </ul> */}
                        <ul className='flex flex-col gap-3 max-[630px]:text-sm max-[400px]:max-h-[110] overflow-auto'>
                            {Payments.length ? Payments.map((i) => (
                                <li className='flex gap-2 items-center' key={i._id}>
                                    <img src="/user.png" width={30} alt="user avatar" />
                                    <span>{i.name} donate <span className='font-bold'>₹{i.amount}</span> rupees with a message <span className='text-[#3efd3e]'>{i.message}</span>.</span>
                                </li>
                            )) : <li className='flex gap-2 items-center'>! There is no Donation till now to {param.username}</li>}
                        </ul>
                    </div>
                    <div className="makepayment items-start w-1/2 bg-slate-900 rounded-lg p-3 flex flex-col space-y-4 max-[400px]:w-full">
                        <h2 className='text-2xl font-bold text-center max-[630px]:text-xl'>
                            Make Payment
                        </h2>
                        <div className='flex gap-3 flex-col items-center w-full'>
                            <input type="text" onChange={(e) => handlechange(e)} value={paymentForm.name} name='name' className='max-[630px]:text-sm bg-slate-500 w-full rounded-xl px-2 py-2' placeholder='Enter Name' />
                            <input type="text" onChange={(e) => handlechange(e)} value={paymentForm.message} name='message' className='max-[630px]:text-sm bg-slate-500 w-full rounded-xl px-2 py-2' placeholder='Enter Message' />
                            <input type="number" ref={inputref} onChange={(e) => handlechange(e)} value={paymentForm.amount} name='amount' className='max-[630px]:text-sm bg-slate-500 w-full rounded-xl px-2 py-2' placeholder='Enter Amount' />
                            <button type="button" className=" max-[630px]:px-2 max-[630px]:py-1.5 text-white rounded-xl bg-linear-to-br w-full from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5  disabled:from-slate-900 disabled:to-slate-500 disabled:cursor-not-allowed" disabled={paymentForm.name.length < 3 || paymentForm.message.length < 3 || paymentForm.amount.length < 1} onClick={() => pay(paymentForm.amount * 100)} >Pay</button>
                        </div>
                            <span className='m-0 max-[691px]:text-sm'>or choose from these amount:</span>
                        <div className="options flex gap-3 flex-wrap">
                            <button className='bg-slate-600 py-2 px-4 cursor-pointer rounded-xl max-[691px]:py-1 max-[691px]:px-2' onClick={(e) => pay(5000)} value={50}>₹50</button>
                            <button className='bg-slate-600 py-2 px-4 cursor-pointer rounded-xl max-[691px]:py-1 max-[691px]:px-2' onClick={(e) => pay(10000)} value={100}>₹100</button>
                            <button className='bg-slate-600 py-2 px-4 cursor-pointer rounded-xl max-[691px]:py-1 max-[691px]:px-2' onClick={(e) => pay(15000)} value={150}>₹150</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PaymentPage