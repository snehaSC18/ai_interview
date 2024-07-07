import React from 'react'
import Header from './_components/Header'
function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <div className='px-5 md:px-20 lg:px-36 bg-gray-600 '>
      {children}
      </div>
    
    </div>
  )
}

export default DashboardLayout