
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Bell } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    text: "Hey Cafe Verde, it’s been 5 days since your last listing—do you have compost today? 🏷️",
  },
  {
    id: 2,
    text: "Nearby farmer Anna just requested citrus scraps—want to offer some? 🍋",
  },
];

const SmartNotificationsPanel = () => {
  const handleReminder = (message: string) => {
    toast({ title: "Reminder Sent", description: message });
  };

  return (
    <div className="rounded-lg border bg-white p-4 mb-6 animate-fade-in">
      <div className="flex items-center mb-2 gap-2 text-green-800 font-bold">
        <Bell className="w-5 h-5" />
        Smart Notifications
      </div>
      <ul className="space-y-2">
        {mockNotifications.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-amber-50 px-3 py-2 rounded hover-scale"
          >
            <span className="text-green-900">{note.text}</span>
            <button
              className="text-xs bg-emerald-500 text-white rounded px-3 py-1 ml-4 hover:bg-emerald-700 transition"
              onClick={() => handleReminder(note.text)}
            >
              Send reminder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartNotificationsPanel;
