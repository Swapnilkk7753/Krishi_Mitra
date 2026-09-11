import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Mic01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useParams } from 'react-router';
import axios from 'axios';

const Bot = () => {
    const {id} = useParams()
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const transcriptRef = useRef(''); 
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const [chatting, setChatting] = useState([])

    const bottomElmRef = useRef()
  
  
    const speak = useCallback((text) => {
        if (!text) return;

        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = window.speechSynthesis.getVoices();

        const hindiVoice = voices.find(voice => voice.lang.includes('hi') || voice.lang.includes('HI'));
        
        if (hindiVoice) {
            utterance.voice = hindiVoice;
        } else {
            utterance.lang = 'hi-IN';
        }

        utterance.rate = 1.0;
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
    }, []);

    const handleQuery = async (queryText) => {
        if (!inputValue || inputValue.trim() === '') return;
        
        setChatting(prev => {
            return [...prev, {
                user : inputValue
            }]
        })

        setIsProcessing(true);
        try {
            const formData = new FormData()
            formData.append("field_id", id)
            formData.append("message", inputValue)

            const response = await axios.post('http://127.0.0.1:5000/mcp', formData);
            
            const botMessage = response.data;
            
            const cleanMessage = botMessage.replace(/\*/g, ''); 

            setChatting(prev => {
                return [...prev, {
                    bot : cleanMessage
                }]
            })

            speak(cleanMessage);
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isProcessing) {
            handleQuery(inputValue);
        }
    };

    useEffect(() => {
        setInputValue(transcript);
        transcriptRef.current = transcript;
    }, [transcript]);

    const handleMicClick = () => {
        window.speechSynthesis.resume();

        if (listening) {
            SpeechRecognition.stopListening();

            setTimeout(() => {
                handleQuery(transcriptRef.current);
            }, 300);
        } else {
            setInputValue('');
            resetTranscript();
            transcriptRef.current = '';
            SpeechRecognition.startListening({ 
                continuous: false, 
                language: 'en-IN' 
            });
        }
    };

    useEffect(() => {
        bottomElmRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatting]);

    if (!browserSupportsSpeechRecognition) {
        return <p className="p-4 text-red-500">Please use Chrome or Safari for voice features.</p>;
    }

    return (
        <div className="flex justify-center min-h-[200px] w-full">
            <div className="container h-[85vh] flex justify-center relative">
                <div className="h-full w-3/4 p-5 overflow-hidden overflow-y-scroll pb-30 overflowScroller">
                    <p className="text-2xl text-[#346a36] font-medium">Hello {localStorage.getItem('farmer_name')}!</p>
                    <p className="text-sm text-[#346a3688] mb-4">
                        {isProcessing ? 'Thinking...' : 'Tap the mic to speak'}
                    </p>

                    <div>
                        {chatting.map(chat => {
                            const key = Object.keys(chat)[0]

                            return <div className={`flex items-center ${key == "user" ? 'justify-end' : 'justify-start'}`}>
                            
                            <div className='rounded rounded-tr-0 p-3 max-w-100 bg-gray-100 mb-3'>{chat[key]}</div>
                        </div>
                        })}

                        <div ref={bottomElmRef}></div>
                    </div>
                    <div className="absolute bottom-5 left-0 w-full flex items-center justify-center">

                        <div className="w-[80%] flex items-center justify-center gap-2">
                            <input 
                                type="text" 
                                className='w-full bg-[#f2f2f2] rounded-lg py-3 px-5 outline-none' 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)} 
                                onKeyDown={handleKeyDown} // Add this line
                                placeholder="Your message..." 
                            />

                            <button 
                                onClick={inputValue && !listening ? () => handleQuery(inputValue) : handleMicClick} 
                                disabled={isProcessing} 
                                className={`p-4 text-white rounded-full ${listening ? 'bg-red-500 animate-pulse' : 'bg-[#97cd62]'}`}
                            >
                                <HugeiconsIcon icon={Mic01Icon} size={24}/>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  );
};

export default Bot;
