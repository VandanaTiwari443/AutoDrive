"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, User, LoaderCircle } from "lucide-react";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "Recommend a family car",
    "Compare BMW X5 and Audi Q7",
    "Which car has better mileage?",
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || loading) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];

    setMessages(updatedMessages);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is missing from .env.local.");
      }

      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get an AI response.");
      }

      if (typeof data.reply !== "string") {
        throw new Error("The server returned an invalid AI response.");
      }

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-white">
            <Bot size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            AutoDrive AI Assistant
          </h1>

          <p className="mt-3 text-gray-600">
            Your personal assistant for finding the right car.
          </p>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-200 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Car Assistant</h2>
              <p className="text-sm text-gray-500">
                Ask about cars, features, and comparisons
              </p>
            </div>
          </div>

          <div className="min-h-80 space-y-5 px-5 py-6">
            {messages.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <Bot size={32} className="text-gray-500" />

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  How can I help you?
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Ask me to compare cars, explore family-friendly options, or
                  understand the cars in our showroom.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={loading}
                      onClick={() => setMessage(suggestion)}
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-gray-900 hover:bg-gray-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`flex gap-3 ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {item.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Bot size={20} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-word rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.role === "user"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.content}
                  </div>

                  {item.role === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))
            )}

            {loading && (
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Bot size={22} />
                <LoaderCircle size={18} className="animate-spin" />
                Thinking...
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-4"
          >
            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-2 focus-within:border-gray-900">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask something about cars..."
                aria-label="Your message"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-gray-900 outline-none"
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
