import React from 'react'
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

const username = async ({ params }) => {
    await connectDB()
    //if the username is not present in the database
    const { username } = await params
    let a = await User.findOne({ username: username })
    if (a) {
        return (
            <>
                {/* <PaymentPage Payment={plainPayments} /> */}
                <PaymentPage />
            </>
        )
    }
    else {
        return notFound()
    }
}

export default username

export const metadata = {
  title: 'Your Page-GetMeDonation',
};