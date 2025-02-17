"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BarChart2, FileText, Send, DollarSign, PieChart, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge" // Import Badge component

interface ChatInputProps {
    onSend: (message: string, attachments?: File[]) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
    const [message, setMessage] = useState("")
    const [attachments, setAttachments] = useState<File[]>([])

    const quickPrompts = [
        { icon: BarChart2, label: "Market Analysis", prompt: "Analyze current market conditions" },
        { icon: DollarSign, label: "Investment Advice", prompt: "Recommend investment strategies" },
        { icon: PieChart, label: "Portfolio Review", prompt: "Review my portfolio performance" },
        { icon: TrendingUp, label: "Stock Prediction", prompt: "Predict stock market trends" },
    ]

    return (
        <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
                <TooltipProvider>
                    {quickPrompts.map((item) => (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => setMessage(item.prompt)}>
                                    <item.icon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>

            <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => document.getElementById("file-upload")?.click()}>
                    <FileText className="h-4 w-4" />
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => {
                            if (e.target.files) {
                                setAttachments(Array.from(e.target.files))
                            }
                        }}
                    />
                </Button>
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about investments, market analysis, or financial advice..."
                    className="min-h-[80px]"
                />
                <Button
                    onClick={() => {
                        if (message.trim()) {
                            onSend(message, attachments)
                            setMessage("")
                            setAttachments([])
                        }
                    }}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>

            {attachments.length > 0 && (
                <div className="flex gap-2">
                    {attachments.map((file) => (
                        <Badge key={file.name} variant="secondary">
                            {file.name}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}

