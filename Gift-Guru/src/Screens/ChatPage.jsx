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

        // Fetch products and add them to messages
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
            <Navbar />
            <div className="flex-grow p-4 overflow-y-auto pt-20">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-2 m-2 rounded-lg max-w-xs`}
                        >
                            {message.text}
                            {message.products && message.products.length > 0 && (
                                <div className="product-cards">
                                    {message.products.map((product, idx) => (
                                        <div key={idx} className="product-card bg-white border border-gray-300 rounded-lg p-2 m-2">
                                            <img src={product.image} alt={product.name} className="product-image h-24 w-24 object-cover" />
                                            <h3 className="product-title font-semibold">{product.name}</h3>
                                            <p className="product-price text-green-500">${product.price}</p>
                                            <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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
    );
}

export default ChatPage;
