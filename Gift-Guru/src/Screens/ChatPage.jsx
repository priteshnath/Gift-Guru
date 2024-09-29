import { useState } from 'react';
import Navbar from '../Components/navbar';

function ChatPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you?', sender: 'bot' },
    ]);

    // API URL
    const apiUrl = 'http://127.0.0.1:5000/generate'; // Flask API endpoint
    // const apiUrl = '/generate';  // Use relative path

    const handleSendMessage = async () => {
        if (input.trim() === '') return;
    
        const messageToSend = `${input}. Keep the content short.`;
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
    
        // Show "thinking..." message
        const thinkingMessage = { text: 'Thinking...', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
    
        try {
            // Send the message to the Flask API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: messageToSend }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch response from API');
            }
    
            // Parse the API response
            const data = await response.json();
            const botMessage = { text: data.response, sender: 'bot' };
    
            // Replace "Thinking..." message with the actual response
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1] = botMessage; // Replace the last message (thinking...)
                return updatedMessages;
            });
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { text: 'Sorry, something went wrong.', sender: 'bot' };
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1] = errorMessage; // Replace the last message (thinking...)
                return updatedMessages;
            });
        }
    
        // Clear the input field after sending the message
        setInput('');
    };
    
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            <div className="bg-btnColor min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex justify-center items-center pt-20 pb-20">
                    <div className="w-4/5 max-h-full overflow-y-auto p-4 rounded-lg">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`${message.sender === 'user' ? 'bg-blue-700 text-white' : 'bg-white text-black'} p-2 m-2 rounded-lg max-w-xs`}
                                >
                                    {message.sender === 'user' ? (
                                        <div>{message.text}</div>
                                    ) : (
                                        <div>
                                            <img src="./public/images/GIFT GURU logo.png" alt="botimg" className="w-8 h-8 inline-block object-cover pr-2" />
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 flex items-center justify-center w-full fixed bottom-0 bg-white shadow-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="border border-black rounded-lg w-1/2 p-2 mr-2 bg-transparent"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-btnColor text-white p-2 rounded-lg w-20"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatPage;
