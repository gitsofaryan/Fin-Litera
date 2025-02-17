"use client"

import { useState, useEffect } from "react"
import { Bell, MessageSquare, Settings, User2, Wallet, LineChart, Newspaper, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ModeToggle } from "@components/toggle"
import { StockChart } from "@/components/stock-chart"
import { PortfolioSummary } from "@/components/portfolio-summary"
import { NewsFeed } from "@/components/news-feed"
import { ChatInput } from "@/components/chat-input"
import { LoggedInNav } from "@/components/loggedin-nav"
import { SiteFooter } from "@/components/site-footer";
import { ModeToggle } from "@/components/toggle"
import { UserAccountNav } from "@/components/user-account-nav"
import axios from "axios"

// import type { Message, NewsItem, PortfolioItem } from "@/utils/types"

// Mock data


interface Message {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
    attachments?: string[]
}

interface NewsItem {
    id: string
    title: string
    source: string
    timestamp: Date
    category: "stocks" | "crypto" | "economy" | "general"
}

interface PortfolioItem {
    symbol: string
    shares: number
    avgPrice: number
    currentPrice: number
    totalValue: number
    gain: number
    gainPercent: number
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
    // Add more mock portfolio items...
]

const mockNews: NewsItem[] = [
    {
        id: "1",
        title: "Federal Reserve Announces New Interest Rates",
        source: "Financial Times",
        timestamp: new Date(),
        category: "economy",
    },
]

interface Chat {
    id: string
    name: string
    messages: Message[]
}

// const [user, setUser] = useState<{ name: string; image: string; email: string } | null>(null);


export default function Chat() {
    const [chats, setChats] = useState<Chat[]>([])
    const [currentChatId, setCurrentChatId] = useState<string | null>(null)

    useEffect(() => {
        const savedChats = localStorage.getItem("finlitera-chats")
        if (savedChats) {
            setChats(JSON.parse(savedChats))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("finlitera-chats", JSON.stringify(chats))
    }, [chats])

    const createNewChat = () => {
        const newChat: Chat = {
            id: Date.now().toString(),
            name: `Chat ${chats.length + 1}`,
            messages: [],
        }
        setChats([...chats, newChat])
        setCurrentChatId(newChat.id)
    }



    const geminiAPI = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    const apiKey = 'AIzaSyAunvZeGoX4jnIBv5_PCGMzzR0z0AicyCQ'; // Your Gemini API key

    const handleSendMessage = async (content: string, attachments?: File[]) => {
        if (!currentChatId) return;

        // Create new user message
        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            role: 'user',
            timestamp: new Date(),
            attachments: attachments?.map((file) => URL.createObjectURL(file)),
        };

        const updatedChats = chats.map((chat) => {
            if (chat.id === currentChatId) {
                return { ...chat, messages: [...chat.messages, newMessage] };
            }
            return chat;
        });

        setChats(updatedChats);

        // Send request to Gemini API
        try {
            const response = await axios.post(
                geminiAPI + `?key=${apiKey}`,
                {
                    contents: [
                        {
                            parts: [
                                { text: content }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
       
            console.log("Response from Gemini API", response.data);

            // Assuming the response contains a field 'generatedContent' for the reply
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: response.data.generatedContent || "Sorry, I couldn't understand that.",
                role: 'Finance assistant',
                timestamp: new Date(),
            };

            const updatedChatsWithAI = updatedChats.map((chat) => {
                if (chat.id === currentChatId) {
                    return { ...chat, messages: [...chat.messages, aiResponse] };
                }
                return chat;
            });

            setChats(updatedChatsWithAI);
        } catch (error) {
            console.error("Error while sending message to Gemini API", error);
            // Optionally handle the error, e.g., send an error message back to the chat
        }
    };


    const currentChat = chats.find((chat) => chat.id === currentChatId)

    return (
    <>
    <div className="flex items-center justify-between p-4 border-b">

            <LoggedInNav/>
               <div className="flex items-center gap-4 mx-2">
                        <ModeToggle />
                        {/* <UserAccountNav
                          user={{
                            name: user.name,
                            image: user.image,
                            email: user.email,
                          }}
                        /> */}
                      </div>


    </div>
        <div className="flex h-screen bg-background">
            {/* Left Sidebar */}
            <div className="w-64 border-r flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold">Finlitera</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={createNewChat}>
                        <Plus className="h-4 w-4" />
                        New Chat
                    </Button>
                    {chats.map((chat) => (
                        <Button
                            key={chat.id}
                            variant={chat.id === currentChatId ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                            onClick={() => setCurrentChatId(chat.id)}
                        >
                            <MessageSquare className="h-4 w-4" />
                            {chat.name}
                        </Button>
                    ))}
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
                </nav>

            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="border-b p-4 flex justify-between items-center">
                    <h2 className="font-semibold">{currentChat ? currentChat.name : "Financial Assistant"}</h2>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                </header>

                <div className="flex-1 p-4 overflow-auto">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {!currentChat ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Welcome to Finlitera! 💰</CardTitle>
                                    <CardDescription>Your AI-powered financial advisor</CardDescription>
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
                                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`max-w-[80%] rounded-lg p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                                }`}
                                        >
                                            <p>{message.content}</p>
                                            {message.attachments?.map((url) => (
                                                <img
                                                    key={url}
                                                    src={url || "/placeholder.svg"}
                                                    alt="Attachment"
                                                    className="mt-2 max-w-xs rounded"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput onSend={handleSendMessage} />
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 border-l">
                <Tabs defaultValue="portfolio" className="h-full flex flex-col">
                    <TabsList className="w-full justify-start px-4 pt-4">
                        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                        <TabsTrigger value="market">Market</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                    </TabsList>
                    <TabsContent value="portfolio" className="flex-1 p-4">
                        <PortfolioSummary items={mockPortfolio} />
                    </TabsContent>
                    <TabsContent value="market" className="flex-1 p-4">
                        <StockChart
                            symbol="MARKET"
                            data={[100, 120, 115, 130, 140, 135, 150]}
                            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                        />
                    </TabsContent>
                    <TabsContent value="news" className="flex-1 p-4">
                        <NewsFeed news={mockNews} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
            <SiteFooter className="border-t" />
    </>
    )
}

