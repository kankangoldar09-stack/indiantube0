import { useState } from "react";
import { Heart, UserPlus, MessageCircle, AtSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { notifications } from "../utils/data";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"activity" | "messages">("activity");

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
      case "follow":
        return <UserPlus className="w-5 h-5 text-cyan-400" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-green-400" />;
      case "mention":
        return <AtSign className="w-5 h-5 text-purple-400" />;
      default:
        return <Heart className="w-5 h-5 text-pink-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-black z-40 border-b border-gray-800">
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

      {activeTab === "activity" ? (
        <div className="px-4 py-4">
          <h2 className="text-gray-400 text-sm font-medium mb-3">Today</h2>
          <div className="space-y-3">
            {notifications.slice(0, 4).map((notif) => (
              <div 
                key={notif.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <Avatar className="w-11 h-11">
                  <AvatarImage src={notif.avatar} />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {notif.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">
                    <span className="font-bold">{notif.username}</span>{" "}
                    <span className="text-gray-300">{notif.action}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{notif.time}</p>
                </div>
                {notif.image ? (
                  <div className="w-11 h-11 bg-gray-800 rounded overflow-hidden">
                    <img src={notif.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  getIcon(notif.type)
                )}
              </div>
            ))}
          </div>

          <h2 className="text-gray-400 text-sm font-medium mb-3 mt-6">This week</h2>
          <div className="space-y-3">
            {notifications.slice(4).map((notif) => (
              <div 
                key={notif.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <Avatar className="w-11 h-11">
                  <AvatarImage src={notif.avatar} />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {notif.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">
                    <span className="font-bold">{notif.username}</span>{" "}
                    <span className="text-gray-300">{notif.action}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{notif.time}</p>
                </div>
                {notif.image ? (
                  <div className="w-11 h-11 bg-gray-800 rounded overflow-hidden">
                    <img src={notif.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  getIcon(notif.type)
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">Messages are coming soon</p>
        </div>
      )}
    </div>
  );
}