"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Bell,
    MessageSquare,
    Settings,
    User2,
    Wallet,
    LineChart,
    Newspaper,
    Plus,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StockChart } from "@/components/stock-chart";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { NewsFeed } from "@/components/news-feed";
import { ChatInput } from "@/components/chat-input";
import { LoggedInNav } from "@/components/loggedin-nav";
import { ModeToggle } from "@/components/toggle";
// import { UserAccountNav } from "@/components/user-account-nav";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { SiteFooter } from "@/components/site-footer";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    attachments?: string[];
}

interface NewsItem {
    id: string;
    title: string;
    source: string;
    timestamp: Date;
    category: "stocks" | "crypto" | "economy" | "general";
}

interface PortfolioItem {
    symbol: string;
    shares: number;
    avgPrice: number;
    currentPrice: number;
    totalValue: number;
    gain: number;
    gainPercent: number;
}

const mockPortfolio: PortfolioItem[] = [
    {
        symbol: "AAPL",
        shares: 10,
        avgPrice: 150,
        currentPrice: 180,
        totalValue: 1800,
        gain: 300,
        gainPercent: 20,
    },
];

const mockNews: NewsItem[] = [
    {
        id: "1",
        title: "Federal Reserve Announces New Interest Rates",
        source: "Financial Times",
        timestamp: new Date(),
        category: "economy",
    },
];

interface Chat {
    id: string;
    name: string;
    messages: Message[];
}

export default function Chat() {
    const [isClient, setIsClient] = useState(false);
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle client-side hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Load chats from localStorage
    useEffect(() => {
        if (isClient) {
            const savedChats = localStorage.getItem("finlitera-chats");
            if (savedChats) {
                setChats(JSON.parse(savedChats));
            }
        }
    }, [isClient]);

    // Save chats to localStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem("finlitera-chats", JSON.stringify(chats));
        }
    }, [chats, isClient]);

    const createNewChat = () => {
        if (isLoading) return;

        try {
            const newChat: Chat = {
                id: Date.now().toString(),
                name: `Chat ${chats.length + 1}`,
                messages: []
            };

            // Update state immediately
            setChats(prevChats => [...prevChats, newChat]);
            // Set current chat ID immediately after creating
            setCurrentChatId(newChat.id);

            // Save to localStorage
            if (isClient) {
                localStorage.setItem(
                    "finlitera-chats",
                    JSON.stringify([...chats, newChat])
                );
            }

            console.log('New chat created:', newChat);
        } catch (error) {
            console.error('Error creating new chat:', error);
        }
    };

    const geminiAPI = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    const apiKey = "AIzaSyDTric7nxJrrX02GzlzSMVyrsZb19wVqjw";

    const handleSendMessage = async (content: string, attachments?: File[]) => {
        if (!currentChatId || !content.trim()) {
            console.log('No chat selected or empty message');
            return;
        }

        setIsLoading(true);

        try {
            // Create new user message
            const newMessage: Message = {
                id: Date.now().toString(),
                content: content.trim(),
                role: "user",
                timestamp: new Date(),
                attachments: attachments?.map((file) => URL.createObjectURL(file)),
            };

            // Update chats with user message
            const updatedChats = chats.map((chat) => {
                if (chat.id === currentChatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                    };
                }
                return chat;
            });

            setChats(updatedChats);

            // Get conversation context
            const currentChat = updatedChats.find(chat => chat.id === currentChatId);
            const conversationContext = currentChat?.messages
                .slice(-5)
                .map(msg => `${msg.role}: ${msg.content}`)
                .join('\n');

            // Send request to Gemini API
            const response = await axios.post(
                `${geminiAPI}?key=${apiKey}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a financial advisor and investment expert. Previous conversation:\n${conversationContext}\n\nCurrent question: ${content}`
                                }
                            ],
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                const aiResponseContent = response.data.candidates[0].content.parts[0].text;

                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    content: aiResponseContent,
                    role: "assistant",
                    timestamp: new Date(),
                };

                setChats(prevChats =>
                    prevChats.map((chat) => {
                        if (chat.id === currentChatId) {
                            return {
                                ...chat,
                                messages: [...chat.messages, aiResponse],
                            };
                        }
                        return chat;
                    })
                );
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (error: any) {
            console.error('Error in handleSendMessage:', error);

            const errorMessage = error.response?.data?.error?.message ||
                "An error occurred. Please try again later.";

            // Add error message to chat
            setChats(prevChats =>
                prevChats.map((chat) => {
                    if (chat.id === currentChatId) {
                        return {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                {
                                    id: Date.now().toString(),
                                    content: errorMessage,
                                    role: "assistant",
                                    timestamp: new Date(),
                                },
                            ],
                        };
                    }
                    return chat;
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    const deleteChat = (chatId: string) => {
        try {
            setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
            if (currentChatId === chatId) {
                setCurrentChatId(null);
            }
            console.log('Chat deleted:', chatId);
        } catch (error) {
            console.error('Error deleting chat:', error);
        }
    };

    const currentChat = chats.find((chat) => chat.id === currentChatId);

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between p-4">
                    <LoggedInNav />
                    <div className="flex items-center gap-4 mx-2">
                        <ModeToggle />

                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 border-r flex flex-col bg-background">
                    {/* <div className="p-4 border-b">
                        <h1 className="text-2xl font-bold">Finlitera</h1>
                    </div> */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={createNewChat}
                            disabled={isLoading}
                        >
                            <Plus className="h-4 w-4" />
                            New Chat
                        </Button>
                        <div className="space-y-2">
                            {chats.map((chat) => (
                                <div key={chat.id} className="flex items-center gap-2">
                                    <Button
                                        variant={chat.id === currentChatId ? "secondary" : "ghost"}
                                        className="flex-1 justify-start gap-2 truncate"
                                        onClick={() => setCurrentChatId(chat.id)}
                                        disabled={isLoading}
                                    >
                                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">{chat.name}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteChat(chat.id);
                                        }}
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Wallet className="h-4 w-4" />
                                Portfolio
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <LineChart className="h-4 w-4" />
                                Markets
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Newspaper className="h-4 w-4" />
                                News
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <User2 className="h-4 w-4" />
                                Profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Button>
                        </div>
                    </nav>
                </aside>

                {/* Chat Area */}
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    <header className="sticky border-b p-1 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <h2 className="font-semibold">
                            {currentChat ? currentChat.name : "Financial Assistant"}
                        </h2>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="max-w-4xl mx-auto space-y-4">
                            {!currentChat ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Welcome to Finlitera! 💰</CardTitle>
                                        <CardDescription>
                                            Your AI-powered financial advisor
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <StockChart
                                            symbol="DEMO"
                                            data={[100, 120, 115, 130, 140, 135, 150]}
                                            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                                        />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <PortfolioSummary items={mockPortfolio} />
                                            <NewsFeed news={mockNews} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-4">
                                    {currentChat.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg p-4 ${message.role === "user"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-600 prose prose-invert max-w-none"
                                                    }`}
                                            >
                                                {message.role === "user" ? (
                                                    <p>{message.content}</p>
                                                ) : (
                                                    <ReactMarkdown
                                                        components={{
                                                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                                                            h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
                                                            h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                                                            p: ({ children }) => <p className="mb-4">{children}</p>,
                                                            ul: ({ children }) => <ul className="list-disc ml-4 mb-4">{children}</ul>,
                                                            li: ({ children }) => <li className="mb-1">{children}</li>,
                                                            a: ({ href, children }) => (
                                                                <a
                                                                    href={href}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-400 hover:text-blue-300 underline"
                                                                >
                                                                    {children}
                                                                </a>
                                                            ),
                                                        }}
                                                    >
                                                        {message.content}
                                                    </ReactMarkdown>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sticky bottom-0 border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="max-w-4xl mx-auto">
                            <ChatInput
                                onSend={handleSendMessage}
                                disabled={!isClient || isLoading || !currentChatId}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}