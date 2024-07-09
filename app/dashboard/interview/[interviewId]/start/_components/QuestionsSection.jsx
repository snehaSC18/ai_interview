import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({ mockInterviewQuestion, activeIndexQuestion }) {
    const textToSpeach = (text)=>{
          if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
          }
          else{
            alert("sorry! your browser does not support text to speech")
          }
    }
    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 className={`p-1 bg-gray-300 text-yellow-700 font-bold rounded-full text-xs md:text-sm text-center cursor-pointer ${activeIndexQuestion == index && "text-gray-300 bg-yellow-700"}`}>Question #{index + 1}</h2>
                ))}

            </div>
            <h2 className='text-white my-5 text-md md:text-lg'>{mockInterviewQuestion[activeIndexQuestion]?.question}</h2>
            <Volume2 className="cursor-pointer" onClick={()=>textToSpeach(mockInterviewQuestion[activeIndexQuestion]?.question)}/>

            <div className='border rounded-lg p-5 bg-yellow-300 mt-20'>
                <h2 className='flex gap-2 items-center text-yellow-800'>
                    <Lightbulb/>
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    )
}

export default QuestionsSection