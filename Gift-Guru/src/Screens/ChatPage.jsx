import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';

function ChatPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you?', sender: 'bot' },
    ]);
    const [products, setProducts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiHost = import.meta.env.VITE_API_HOST;

    const fetchProducts = async (query) => {
        try {
            const response = await fetch(`${apiUrl}&query=${query}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': apiHost,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            const productCards = data.data.products.slice(0, 5).map(product => ({
                name: product.product_title,
                image: product.product_photo,
                price: product.product_price,
                url: product.product_url,
            }));

            return productCards;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const productCards = await fetchProducts(input);
        const botMessage = { products: productCards, sender: 'bot' };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <>
            <div className="bg-btnColor min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex justify-center items-center pt-20 pb-20 ">
                    <div className="w-4/5 max-h-full overflow-y-auto p-4 rounded-lg">

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`${message.sender === 'user' ? 'bg-blue-700 text-white' : ' bg-white text-black'} p-2 m-2 rounded-lg max-w-xs`}
                                >

                                    {message.sender === 'user' ? (
                                        <div>{message.text}</div>
                                    ) : (
                                        <div>
                                            <img src="./public/images/GIFT GURU logo.png" alt="botimg" className="w-8 h-8 inline-block  object-cover pr-2" />
                                            {message.text}
                                        </div>
                                    )}

                                    {message.products && message.products.length > 0 && (
                                        <div className="">
                                            {message.products.map((product, idx) => (
                                                <div key={idx} className="
                                                                product-card 
                                                                bg-white border  
                                                                rounded-lg 
                                                                p-2 
                                                                m-4
                                                                mb-5
                                                                border-black    
                                                                min-h-48">

                                                    <img src={product.image} alt={product.name} className="h-28 w-28 object-contain" />

                                                    <h3 className="text-base font-semibold pt-3">{product.name}</h3>

                                                    <p className="text-green-500 pt-2">{product.price}</p>
                                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline pt-3">
                                                        View Product
                                                    </a>
                                                </div>
                                            ))}
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
