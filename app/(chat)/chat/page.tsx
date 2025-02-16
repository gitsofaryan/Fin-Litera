"use client";

import { useState, useEffect } from "react";
// import Layout from "./layout";

export default function Page() {
    const [chats, setChats] = useState<string[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const savedChats = localStorage.getItem("chats");
        if (savedChats) {
            setChats(JSON.parse(savedChats));
        }
    }, []);

    const handleNewChat = () => {
        setChats([]);
        localStorage.setItem("chats", JSON.stringify([]));
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            const newChats = [input, ...chats];
            setChats(newChats);
            localStorage.setItem("chats", JSON.stringify(newChats));
            setInput("");
        }
    };

    return (
        // <Layout>
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 p-4 text-white flex flex-col">
                    <button
                        className="bg-gray-600 p-3 rounded-lg w-full mb-4"
                        onClick={handleNewChat}
                    >
                        + New Chat
                    </button>
                    <div className="flex flex-col space-y-2 overflow-y-auto">
                        {chats.map((chat, index) => (
                            <div key={index} className="bg-gray-700 p-2 rounded-lg">
                                {chat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold text-white">Hello!</h1>
                    <p className="text-2xl text-gray-400 mt-2">How can I assist you today?</p>
                    <div className="mt-6 flex space-x-4">
                        <button className="bg-gray-700 p-4 rounded-lg text-white">Affirmations</button>
                        <button className="bg-gray-700 p-4 rounded-lg text-white">Mindfulness</button>
                        <button className="bg-gray-700 p-4 rounded-lg text-white">Stories</button>
                        <button className="bg-gray-700 p-4 rounded-lg text-white">Quiz & Games</button>
                    </div>
                    <div className="mt-8 w-full max-w-lg flex items-center border border-gray-600 rounded-lg p-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type something positive..."
                            className="flex-1 bg-transparent text-white outline-none p-2"
                        />
                        <button onClick={handleSendMessage} className="bg-gray-600 p-2 rounded-lg">
                            &#10148;
                        </button>
                    </div>
                    <p className="mt-4 text-gray-500 text-sm">"Hope: Your Gateway to Wellness and Stories."</p>
                </div>
            </div>
        // </Layout>
    );
}
