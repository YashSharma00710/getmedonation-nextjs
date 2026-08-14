import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="py-5 bg-[#101828]">
                <div className='flex justify-between items-center mx-auto px-30  text-[#ffffff] max-[822px]:px-10 max-[630px]:flex-col'>
                    <div className='text-center'>
                        <p>© {currentYear} Your Company, Inc. All rights reserved.</p>
                    </div>
                    <div>
                        <ul className='flex gap-4'>
                            <a href="https://www.facebook.com/profile.php?id=100023303678819"><li><img src="/facebook.png" alt="" className='w-6.25 invert' /></li></a>
                            <a href="https://www.instagram.com/"><li><img src="/instagram.png" alt="" className='w-6.25 invert' /></li></a>
                            <a href="https://x.com/?lang=en-in"><li><img src="/twitter.png" alt="" className='w-6.25 invert' /></li></a>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer