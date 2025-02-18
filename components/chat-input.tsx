"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BarChart2, FileText, Send, DollarSign, PieChart, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface ChatInputProps {
    onSend: (content: string, attachments?: File[]) => Promise<void>;
    disabled?: boolean;  // Changed back to disabled to match standard prop naming
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [message, setMessage] = useState("")
    const [attachments, setAttachments] = useState<File[]>([])

    const handleSubmit = async () => {
        if (message.trim() && !disabled) {
            try {
                await onSend(message, attachments)
                setMessage("")
                setAttachments([])
            } catch (error) {
                console.error('Error sending message:', error)
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
                <div className="flex gap-1 overflow-x-auto pb-1">
                    <TooltipProvider>
                        {[
                            { icon: BarChart2, label: "Market Analysis", prompt: "Analyze current market conditions" },
                            { icon: DollarSign, label: "Investment Advice", prompt: "Recommend investment strategies" },
                            { icon: PieChart, label: "Portfolio Review", prompt: "Review my portfolio performance" },
                            { icon: TrendingUp, label: "Stock Prediction", prompt: "Predict stock market trends" },
                        ].map((item) => (
                            <Tooltip key={item.label}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setMessage(item.prompt)}
                                        disabled={disabled}
                                    >
                                        <item.icon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p className="text-sm">{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        disabled={disabled}
                    >
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
                            disabled={disabled}
                        />
                    </Button>
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about investments, market analysis, or financial advice..."
                        className="min-h-[60px] max-h-[180px] resize-none"
                        disabled={disabled}
                    />
                    <Button
                        className="h-9 px-3"
                        onClick={handleSubmit}
                        disabled={!message.trim() || disabled}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>

                {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {attachments.map((file) => (
                            <Badge key={file.name} variant="secondary" className="text-xs">
                                {file.name}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

