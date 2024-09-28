import React, { useState } from 'react'
import Navbar from '../Components/navbar'


function ChatPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you?', sender: 'bot' },
    ]);

    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;


    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        const botMessage = { text: 'Thank you for your message!', sender: 'bot' };

        setMessages((prevMessages) => [...prevMessages, userMessage, botMessage,]);

        setInput('');
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex-grow p-4 overflow-y-auto pt-20">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`${message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-black'
                                } p-2 m-2 rounded-lg max-w-xs`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-gray-100 flex items-center justify-center w-full">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="border rounded-lg w-1/2 p-2 mr-2"
                />

                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-lg w-20"
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default ChatPage