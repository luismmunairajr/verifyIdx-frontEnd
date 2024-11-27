import { MessagesSquare, ChevronDown, Send } from "lucide-react"
import React, { useState, useRef, useEffect } from 'react'

type Message = {
    text: string
    isUser: boolean
}

export default function SupportButton() {
    const [isExpanded, setIsExpanded] = useState(true)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! How can I assist you today?", isUser: false }
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const botResponses = [
        "That's interesting! Can you tell me more?",
        "I see. What do you think we should do about that?",
        "That's a great point. Have you considered any alternatives?",
        "I'm here to help. Is there anything specific you'd like to know?"
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() === '') return

        const userMessage = { text: input, isUser: true }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        setTimeout(() => {
            const botMessage = { text: botResponses[Math.floor(Math.random() * botResponses.length)], isUser: false }
            setMessages(prev => [...prev, botMessage])
        }, 1000)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <div>
            {isExpanded ? (
                <div className="p-4 bg-blue-800 rounded-full absolute bottom-10 right-10 hover:-translate-y-2 duration-200 transition ease-in-out dark:bg-zinc-700">
                    <MessagesSquare className="text-white" strokeWidth={1} onClick={toggleExpand} />
                </div>
            ) : (
                <div className="right-10 bottom-10 absolute rounded-xl border bg-white text-card-foreground shadow h-[450px] w-[350px] duration-500 transition ease-in-out flex flex-col space-y-2 dark:bg-black">
                    <div className="w-full flex justify-between bg-blue-800 p-3 text-white  rounded-t-xl dark:bg-zinc-800">
                        <p>Chatbot</p>
                        <ChevronDown strokeWidth={2} onClick={toggleExpand} className="cursor-pointer" />
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'
                                    }`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${message.isUser
                                        ? 'bg-blue-800 text-sm text-white dark:bg-zinc-800'
                                        : 'bg-zinc-200 text-sm text-black dark:bg-white'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <form className="flex w-full space-x-1 p-3" onSubmit={handleSubmit}>
                        <textarea placeholder="Type your message" className="w-full border border-zinc-500 rind rounded placeholder:text-sm p-1 outline-none h-10" value={input} onChange={(e) => setInput(e.target.value)}/>
                        <button className="bg-blue-800 dark:bg-zinc-800 text-white rounded p-1" type="submit"><Send/></button>
                    </form>
                </div>
            )
            }
        </div>
    )
}