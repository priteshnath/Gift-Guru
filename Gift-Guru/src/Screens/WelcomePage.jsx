import React from 'react'
import './Welcome.css'
import Navbar from '../Components/navbar'
import { useNavigate } from 'react-router-dom';


function WelcomePage() {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/chat');
    };

    return (
        <>
            <div className='bg-btnColor absolute h-full w-full z-[-11]'>
                <Navbar />
                <img src="./public/images/GIFT GURU logo.png" alt="Not found"
                    loading='lazy'
                    className='absolute h-[70vh] w-full z-[-10] object-contain welcome-image top-10' />
                <div className='absolute left-1/2 transform -translate-x-1/2 bottom-10'>
                    <h1 className="text-5xl font-bold mb-4 pt-20 text-white items-center">Welcome to Gift Guru </h1>
                    <p className="mb-4 text-center text-white text-xl">Your personal assistant for finding the perfect gift.</p>
                    <div className='w-full flex items-center justify-center'>
                        <button
                            className="bg-transparent border-white border-2 text-white px-4 py-2 rounded-2xl"
                            onClick={handleStartNow}
                        >
                            Start Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage