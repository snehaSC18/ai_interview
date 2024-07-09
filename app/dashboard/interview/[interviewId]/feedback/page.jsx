"use client"
import { db } from '@/utils/db'
import { Button } from "@/components/ui/button";

import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsDown, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation';


function Feedback ({params}) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter()
  useEffect(()=>{
    getFeedback();
  }, [])
  const getFeedback = async()=>{
          const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockId, params.interviewId)).orderBy(UserAnswer.id)
          console.log(result)
          setFeedbackList(result);
  }
  return (
    <div className='p-10'>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl text-white'>Here is your report Card</h2>
          <h2 className='text-yellow-300 text-lg my-3'>Your overall interview grade: <strong>7/10</strong></h2>

          <h2 className='text-sm text-white' >Find below your answers, correct answers and feedback for furthur improvement</h2>
          {feedbackList&&feedbackList.map((item, index)=>(
                 <Collapsible key={index} className='mt-7'>
                 <CollapsibleTrigger className='p-2 bg-yellow-300 rounded-lg my-2 text-left flex justify-between w-full gap-7'>
                 {item.question} <ChevronsUpDown className='h-5 w-5 gap-7'/>
                 </CollapsibleTrigger>
                 <CollapsibleContent>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-red-500 p-2 border rounded-lg'>
                      <strong>Rating:</strong>{item.rating}
                    </h2>
                      <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>

                      <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>

                      <h2 className='p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-900'><strong>Feedback: </strong>{item.feedback}</h2>
                      
                  </div>
                 </CollapsibleContent>
               </Collapsible>
               
          ))}
          <Button onClick={()=>router.replace("/dashboard")}>Go Home</Button>
    </div>
  )
}

export default Feedback