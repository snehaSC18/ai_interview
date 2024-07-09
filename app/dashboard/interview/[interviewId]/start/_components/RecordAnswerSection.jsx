"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { Result } from 'postcss';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiApiModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
function RecordAnswerSection({mockInterviewQuestion, activeIndexQuestion, interviewData}) {
    const [userAnswer, setUserAnswer] = useState("");
    const {user} = useUser()
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
    }, [results])


    useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
            UpdateUserAnswer();
        }
        if(userAnswer?.length<10){
            setLoading(false)
            toast("Unexpected Error Occurred! Please Record again.");
            return;
        }
    }, [userAnswer])
    const StartStopRecording = async()=>{
        if(isRecording){
            
            stopSpeechToText()
            
            
        }
        else{
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async()=>{
        console.log(userAnswer)
        setLoading(true);
        const feedbackPrompt = "Question:"+mockInterviewQuestion[activeIndexQuestion]?.question+", User Answer:"+userAnswer+",Depends on question and user answer for given interview question" + "please give us rating for answer and feedback for area of improvement if any"+"in just 3 to 5 lines to improve it in json format with rating field and feedback field"

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(mockJsonResp)
        const JsonFeedbackResp = JSON.parse(mockJsonResp);
        const resp = await db.insert(UserAnswer).values({
            mockId: interviewData?.mockId,
            question: mockInterviewQuestion[activeIndexQuestion]?.question,
            correctAns: mockInterviewQuestion[activeIndexQuestion]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
        })

        if(resp){
            toast("User Answer Recorded Successfully.")
            setResults([])
        }
        setResults([])
        setLoading(false)
    }
    return (
        <div>
            <div className='flex flex-col mt-20 justify-center items-center rounded-lg p-5'>
                <Image src={"/webcam.jfif"} width={200} height={200}className='absolute' />
                <Webcam mirrored={true} style={
                    {
                        height: 200,
                        width: "100%",
                        zindex: 10,

                    }
                } />
            </div>
            <Button  disabled={loading} onClick={StartStopRecording} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600 mx-40 mt-5">{
                isRecording ? 
                <h2 className='text-red-600'>
                    <Mic />Stop Recording
                </h2>
                :
                "Record Answer"
             }</Button>

             
        </div>

    )
}

export default RecordAnswerSection