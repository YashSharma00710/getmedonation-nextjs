"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
    const [showdropdown, setshowdropdown] = useState(false)
    const router = useRouter();
    const truedropdown = () => {
        let toggle = !showdropdown;
        setshowdropdown(toggle)
    }
    const { data: session } = useSession()
    useEffect(() => {
        console.log(session);
    }, [session]);
    return (
        <nav>
            <div className='py-5 bg-[#101828]' >
                <div className='flex justify-between mx-auto px-30 max-[822px]:px-10 text-[#ffffff] items-center max-[630px]:flex-col max-[688px]:px-10 max-[589px]:px-5'>
                    <Link href="/">
                        <div className='logo text-2xl flex justify-center items-center gap-3 font-bold'>
                            <img src="favicon.ico" width={50} alt="" />
                            <span>GetMeDonation!</span>
                        </div>
                    </Link>
                    <div>
                        {session ?
                            <div className='flex justify-center gap-4 max-[688px]:gap-2'>
                                <div className='flex flex-col relative justify-center bg-slate-900 '>
                                    <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" onClick={() => truedropdown()}
                                        data-dropdown-trigger="hover" className={`${showdropdown ? "border py-2" : ""} max-[688px]:text-[12px]transition-all inline-flex items-center justify-center text-white bg-brand box-border hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 max-[688px]:px-2 max-[688px]:py-1 max-[375px]:px-1 max-[330px]:px-0.5" type="button`}>
                                        {session.user.email}
                                        {!showdropdown ? <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg> :
                                            <img src="/close.png" className='invert w-3 ml-2' alt="" />
                                        }
                                    </button>

                                    <div id="dropdownHover" className={`z-10 ${showdropdown ? "" : "hidden"} bg-slate-900 w-full top-10 absolute bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg`}>
                                        <ul className=" p-2 text-sm text-body font-medium" aria-labelledby="dropdownHoverButton">
                                            <li>
                                                <Link href="/dashboard" className="hover:bg-[#2c1665] inline-flex items-center w-full p-2  hover:text-heading rounded" onClick={() => setshowdropdown(false)}>Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link href={`/${encodeURIComponent(session?.user?.name)}`}className="hover:bg-[#2c1665] inline-flex items-center w-full p-2  hover:text-heading rounded" onClick={() => setshowdropdown(false)}>Your Page</Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="hover:bg-[#2c1665] inline-flex items-center w-full p-2  hover:text-heading rounded" onClick={() => setshowdropdown(false)}>Settings</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <button className='rounded-lg cursor-pointer text-[16px] text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base px-4 py-2.5 text-center leading-5 max-[688px]:text-[13px] max-[688px]:px-2 max-[688px]:py-1 max-[375px]:px-1' onClick={() => signOut({ callbackUrl: "/login" })}>Sign out</button>

                            </div> :
                            <Link href={session ? "" : "/login"}>
                                <button type="button" className="rounded-lg cursor-pointer text-[16px] text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base px-4 py-2.5 text-center leading-5">Login</button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar