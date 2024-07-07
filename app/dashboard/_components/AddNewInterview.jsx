"use client"
import React, { useState } from 'react'
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
function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
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
              <form>
             <div>
             
              <h2>Add your job role, job description and year of experience</h2>
              <div className='mt-7 my-3'>
                <label>Job Role/Job Position</label>
                <Input placeholder = "Ex. Backend Developer" required/>
              </div>

              <div className='my-3'>
                <label>Job Description</label>
                <Textarea placeholder = "Ex. React.js, Node.js, JavaScript etc" required/>
              </div>

              <div className='my-3'>
                <label>Years of Experience</label>
                <Input placeholder = "Ex. 5" type="number" required/>
              </div>
             </div>
              <div className='flex gap-5 justify-end'>
                <Button  type = "button" onClick={()=>{setOpenDailog(false)}} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">Cancel</Button>
                <Button type = "submit" className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600">Start Interview</Button>
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