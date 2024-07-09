"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'

function InterviewList() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);
    useEffect(()=>{
        user&&getInterviewList();
    }, [user])
    const getInterviewList = async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)).orderBy(desc(MockInterview.id))
        console.log(result)
        setInterviewList(result)
    }
  return (
    <div className='font-medium text-xl'>
        Previous Mock Interview
    </div>
  )
}

export default InterviewList