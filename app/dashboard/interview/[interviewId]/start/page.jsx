"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'


function StartInteview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeIndexQuestion, setActiveIndexQuestion] = useState(1)
    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails();
      }, [params.interviewId])

      const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        const jsonMockResp = JSON.parse(result[0].jsonMockRes);
        console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    
      }
  return (
    <div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
             <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeIndexQuestion={activeIndexQuestion}/>

             <RecordAnswerSection/>
        </div>
    </div>
  )
}

export default StartInteview