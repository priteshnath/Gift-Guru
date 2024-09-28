import React from 'react'
import Navbar from '../Components/navbar'
import { useNavigate } from 'react-router-dom';


function WelcomePage() {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/chat');
    };

    return (
        <>
            <Navbar />
            <h1 className="text-4xl font-bold mb-4 pt-20">Welcome to Gift Guruji!</h1>
            <p className="text-lg mb-4">Your personal assistant for finding the perfect gift.</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleStartNow}
            >
                Start Now
            </button>
        </>
    )
}

export default WelcomePage