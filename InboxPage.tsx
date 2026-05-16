import { useState } from "react";
import { Search, Send, Heart, UserPlus, MessageCircle, AtSign, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<"activity" | "messages">("activity");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-black pb-20 flex flex-col">
        {/* Chat Header */}
        <header className="sticky top-0 bg-black z-40 px-4 py-3 border-b border-gray-800 flex items-center gap-3">
          <button onClick={() => setSelectedChat(null)} className="p-1">
            <span className="text-white text-2xl">←</span>
          </button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-pink-500 text-white">U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-white font-semibold">User</p>
            <p className="text-gray-400 text-xs">Offline</p>
          </div>
        </header>

        {/* Empty Messages */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-sm text-center">No messages yet</p>
          <p className="text-gray-500 text-xs text-center mt-1">Say hello! 👋</p>
        </div>

        {/* Input */}
        <div className="sticky bottom-16 bg-black border-t border-gray-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-gray-800 border-none text-white placeholder-gray-400"
            />
            <button className="p-2">
              <Send className="w-6 h-6 text-pink-500" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-black z-40 border-b border-gray-800">
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search"
              className="w-full bg-gray-800 border-none text-white placeholder-gray-400 pl-10"
            />
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 py-4 text-center font-semibold relative ${
              activeTab === "activity" ? "text-white" : "text-gray-500"
            }`}
          >
            Activity
            {activeTab === "activity" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 py-4 text-center font-semibold relative ${
              activeTab === "messages" ? "text-white" : "text-gray-500"
            }`}
          >
            Messages
            {activeTab === "messages" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white rounded-full"></div>
            )}
          </button>
        </div>
      </header>

      {/* Empty State */}
      <div className="px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          {activeTab === "activity" ? (
            <Heart className="w-10 h-10 text-gray-600" />
          ) : (
            <MessageSquare className="w-10 h-10 text-gray-600" />
          )}
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">
          {activeTab === "activity" ? "No Activity Yet" : "No Messages Yet"}
        </h3>
        <p className="text-gray-400 text-sm text-center">
          {activeTab === "activity" 
            ? "When someone likes or follows you, it'll show up here."
            : "Start a conversation with someone!"}
        </p>
      </div>
    </div>
  );
}