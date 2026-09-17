"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
import { checkUserExists, fetchUser, updateProfile } from '@/actions/razorpay';
import { toast, ToastContainer } from 'react-toastify'


const Dashboard = () => {
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const [form, setform] = useState({})
    useEffect(() => {
        document.title = "Dashboard-GetMeDonation"

        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        const checkDatabaseUser = async () => {
            const exists = await checkUserExists(session?.user?.email);

            if (!exists) {
                await signOut({
                    callbackUrl: "/login"
                });
                return;
            }

            const user = await fetchUser(session?.user?.name);

            if (user) {
                setform({
                    name: user.name || "",
                    email: user.email || "",
                    username: user.username || "",
                    profilepic: user.profilepic || "",
                    coverpic: user.coverpic || "",
                    razorpayid: user.razorpayid || "",
                    razorpaysecret: user.razorpaysecret || ""
                });
            }
        };

        if (session?.user?.email && session?.user?.name) {
            checkDatabaseUser();
        }
    }, [status, session, router]);




    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
        console.log(form)
    }
    const handlesubmit = async (e) => {
        if (form.name && form.email && form.username) {

            let a = await updateProfile(form, session?.user?.name)
            console.log("hello")
            if (a?.success) {
                await update();
                setform({})
                toast.success('Profile Updated!', {
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
            else {
                alert(a?.error || "Something went wrong")
            }
        }
        else {
            alert("Fill the fields")
        }
        // console.log(e.target.entries)
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
            <div className='container mx-auto py5 px-2.5'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your dashboard</h1>

                <form className='max-w-2xl mx-auto' action={handlesubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                        <input value={form.name ? form.name : ""} onChange={handlechange} type="text" name='name' id='name' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for email */}
                    <div className='my-2'>
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input value={form.email ? form.email : ""} onChange={handlechange} type="text" name='email' id='email' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for username */}
                    <div className='my-2'>
                        <label htmlFor="username" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                        <input value={form.username ? form.username : ""} onChange={handlechange} type="text" name='username' id='username' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className='my-2'>
                        <label htmlFor="profilepic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Profile Picture</label>
                        <input value={form.profilepic ? form.profilepic : ""} onChange={handlechange} type="text" name='profilepic' id='profilepic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for Cover picture */}
                    <div className='my-2'>
                        <label htmlFor="coverpic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cover Picture</label>
                        <input value={form.coverpic ? form.coverpic : ""} onChange={handlechange} type="text" name='coverpic' id='coverpic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input razorpay id */}
                    <div className='my-2'>
                        <label htmlFor="razorpayid" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razor Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handlechange} type="text" name='razorpayid' id='razorpayid' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input razorpay secret */}
                    <div className='my-2'>
                        <label htmlFor="razorpaysecret" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razor Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handlechange} type="text" name='razorpaysecret' id='razorpaysecret' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='my-2'>
                        <button type='submit' className='block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-400 focus:ring-4 focus:outline-none dark:focus:ring-blue-500 font-medium text-sm'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard