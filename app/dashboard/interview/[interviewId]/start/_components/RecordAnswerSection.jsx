"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { Result } from 'postcss';

function RecordAnswerSection() {
    const [userAnswer, setUserAnswer] = useState("");
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
    }, [results])
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
            <Button  onClick={isRecording?stopSpeechToText:startSpeechToText} className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600 mx-40 mt-5">{
                isRecording ? 
                <h2 className='text-red-600'>
                    <Mic />Stop Recording
                </h2>
                :
                "Record Answer"
             }</Button>

             <Button className="bg-gray-400 text-yellow-300 font-bold  hover:bg-yellow-300 hover:text-gray-600 mx-40 mt-5" onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
        </div>

    )
}

export default RecordAnswerSection