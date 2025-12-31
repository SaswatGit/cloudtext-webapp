import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full p-7 bg-gray-800 flex justify-between items-center'>
            <Link href={"/"} ><h1 className='text-white font-bold text-3xl'>CloudText</h1></Link>

            <div className='flex items-center justify-center gap-3'>
                <Link href={"/newpaste"} className='px-6 py-4 rounded-full bg-blue-700 text-lg font-bold text-white'>New Paste</Link>
            </div>
        </nav>
    )
}

export default Navbar