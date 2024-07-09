"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiApiModel';
import { LoaderCircle, User } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const {user} = useUser();
  // const router = useRouter();

  const onSubmit = async(e)=>{
    setLoading(true)
    e.preventDefault();
      console.log(jobPosition, jobDescription, jobExperience)
      const InputPrompt = "Job Role: "+jobPosition+" Job Description: "+jobDescription+" Years Of Experience: "+jobExperience+" Give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answers in json format"
      const result = await chatSession.sendMessage(InputPrompt)
      const MockJsonResponse = result.response.text().replace('```json', '').replace('```', '');
      console.log(MockJsonResponse);
      setJsonResponse(MockJsonResponse);

      if(MockJsonResponse){
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockRes: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy")
        }).returning({mockId: MockInterview.mockId})
        console.log("Inserted ID:", resp)
        if(resp){
          setOpenDailog(false);
          // router.push("/dashboard/interview/"+resp[0].mockId)
        }
      }
      else{
        console.log("ERROR")
      }
      
      setLoading(false)
      
  }
  return (
    <div>
      <div className='p-10 border rounded-lg hover:scale-105 hover: shadow-md cursor-pointer transition-all' onClick={()=>{setOpenDailog(true)}}>
        <h2 className='font-bold text-lg text-white text-center'>+ Add New</h2>
      </div>


      <Dialog open = {openDailog}>
        
        <DialogContent className="max-w-2xl bg-gray-200">
          <DialogHeader>
            <DialogTitle className="text-2xl">Help Alex to create your job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
             <div>
             
              <h2>Add your job role, job description and year of experience</h2>
              <div className='mt-7 my-3'>
                <label>Job Role/Job Position</label>
                <Input placeholder = "Ex. Backend Developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>

              <div className='my-3'>
                <label>Job Description</label>
                <Textarea placeholder = "Ex. React.js, Node.js, JavaScript etc" required onChange={(event)=>setJobDescription(event.target.value)}/>
              </div>

              <div className='my-3'>
                <label>Years of Experience</label>
                <Input placeholder = "Ex. 5" type="number" max="25" required onChange={(event)=>setJobExperience(event.target.value)}/>
              </div>
             </div>
              <div className='flex gap-5 justify-end'>
                <Button  type = "button" onClick={()=>{setOpenDailog(false)}} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">Cancel</Button>
                <Button type = "submit" disabled = {loading} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">{
                  loading? 
                  <>
                  <LoaderCircle className='animate-spin'/>Generating From AI
                  </>: 'start Interview'}</Button>
              </div>
              </form>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>

  )
}

export default AddNewInterview