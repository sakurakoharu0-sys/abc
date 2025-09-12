import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import LoadingSpinner from './LoadingSpinner';

interface ChatPracticeProps {
  languageName: string;
  levelName: string;
  topic: string;
  onFinish: () => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const ChatPractice: React.FC<ChatPracticeProps> = ({ languageName, levelName, topic, onFinish }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
        setIsLoading(true);
        const systemInstruction = `You are 'Yui', a friendly and encouraging AI language tutor from a futuristic anime world. Your personality is gentle, patient, and positive.
        You are having a conversation with a student learning ${languageName}. Their level is ${levelName}.
        Keep your responses concise and at their learning level. The topic of conversation is "${topic}".
        Start the conversation with a friendly greeting and a question about the topic.`;
        
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction },
        });

        setChat(newChat);

        try {
            const initialResponse = await newChat.sendMessageStream({ message: "Hello!" });
            let responseText = '';
            for await (const chunk of initialResponse) {
                responseText += chunk.text;
                setMessages([{ role: 'model', text: responseText }]);
            }
        } catch (error) {
            console.error("Failed to start chat:", error);
            setMessages([{ role: 'model', text: 'Sorry, I had trouble starting our chat. Please try again!'}]);
        } finally {
            setIsLoading(false);
        }
    };
    initChat();
  }, [languageName, levelName, topic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage = userInput;
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
        const stream = await chat.sendMessageStream({ message: userMessage });
        let currentResponse = '';
        for await (const chunk of stream) {
            currentResponse += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'model', text: currentResponse };
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Error sending message:", error);
         setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: 'Oops! I ran into a little problem. Could you repeat that?' };
            return newMessages;
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 flex flex-col h-[75vh] animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-accent)]">Chat with Yui-sensei</h2>
          <button onClick={onFinish} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">&times; End Chat</button>
        </div>
      
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-lg flex-shrink-0">🔮</div>}
                    <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[var(--color-accent-secondary)]/80 text-white rounded-br-none' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-bl-none'}`}>
                       <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                </div>
            ))}
            {isLoading && messages[messages.length-1]?.role === 'user' && (
                 <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-lg flex-shrink-0">🔮</div>
                    <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-bl-none">
                       <LoadingSpinner />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-grow w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                className="px-6 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform"
            >
                Send
            </button>
        </form>
    </section>
  );
};

export default ChatPractice;
