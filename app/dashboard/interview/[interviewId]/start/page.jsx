"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


function StartInteview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeIndexQuestion, setActiveIndexQuestion] = useState(0)
    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails();
      }, [params.interviewId])

      const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        
         
            const jsonMockResp = JSON.parse(result[0].jsonMockRes);
            console.log(jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
         
            
          
        }
        
        
    
      
  return (
    <div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
             <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeIndexQuestion={activeIndexQuestion}/>

             <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeIndexQuestion={activeIndexQuestion}
             interviewData={interviewData}/>
        </div>


        <div className='flex justify-end gap-6'>
          {activeIndexQuestion>0&&<Button onClick = {()=>setActiveIndexQuestion(activeIndexQuestion-1)} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">Previous Question</Button>}
          {activeIndexQuestion!=mockInterviewQuestion?.length-1&&<Button onClick = {()=>setActiveIndexQuestion(activeIndexQuestion+1)} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">Next Question</Button>}
          {activeIndexQuestion==mockInterviewQuestion?.length-1&&<Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}><Button className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">End Interview</Button></Link>}
        </div>
    </div>
  )
}

export default StartInteview