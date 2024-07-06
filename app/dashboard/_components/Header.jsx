import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='flex p-4 items-center justify-between bg-gray-400 shadow-sm'>
       <Image src={"/logo.svg"} width={160} height={100} alt="logo"/>
       <ul className='flex gap-6'>
        <li className='text-yellow-400 hover:text-yellow-500 hover:font-bold transition all cursor-pointer'>Dashboard</li>
        <li className='text-yellow-400 hover:text-yellow-500 hover:font-bold transition all cursor-pointer'>Questions</li>
        <li className='text-yellow-400 hover:text-yellow-500 hover:font-bold transition all cursor-pointer'>Upgrade</li>
        <li className='text-yellow-400 hover:text-yellow-500 hover:font-bold transition all cursor-pointer'>How it works?</li>

       </ul>
       <UserButton/>
    </div>
  )
}

export default Header