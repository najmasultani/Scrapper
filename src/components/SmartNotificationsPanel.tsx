
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Bell } from "lucide-react";

// Accept notifications array as prop
interface SmartNotificationsPanelProps {
  notifications: { id: number; text: string }[];
}

const SmartNotificationsPanel: React.FC<SmartNotificationsPanelProps> = ({
  notifications,
}) => {
  const handleReminder = (message: string) => {
    toast({ title: "Reminder Sent", description: message });
  };

  if (!notifications || notifications.length === 0) {
    // Show empty state gracefully when no notifications exist
    return (
      <div className="rounded-lg border bg-white p-4 mb-6">
        <div className="flex items-center mb-2 gap-2 text-green-800 font-bold">
          <Bell className="w-5 h-5" />
          Smart Notifications
        </div>
        <div className="text-gray-500 italic">No notifications found.</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-4 mb-6">
      <div className="flex items-center mb-2 gap-2 text-green-800 font-bold">
        <Bell className="w-5 h-5" />
        Smart Notifications
      </div>
      <ul className="space-y-2">
        {notifications.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-amber-50 px-3 py-2 rounded"
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
