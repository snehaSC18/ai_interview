import React from 'react'
import { UserButton } from '@clerk/nextjs'
//import AddNewInterviwe from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import AddNewInterview from './_components/AddNewInterview'


function Dashboard() {
  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl text-yellow-400'>Dashboard</h2>
        <h2 className='text-white'>Create Your AI Mock Interview</h2>


        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview/>
        </div>

       <InterviewList/>
    </div>
  )
}

export default Dashboard