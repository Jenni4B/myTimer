import { useState, useEffect } from "react";

const NotificationSystem = ({ enabled, setEnabled }) => {
  const [permission, setPermission] = useState("default");

  // Check notification permission on mount
  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Request notification permission
  const requestPermission = async () => {
    if ("Notification" in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        
        if (result === "granted") {
          setEnabled(true);
        } else {
          setEnabled(false);
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  };

  return (
    <div className="notification-settings p-4 border border-gray-700 rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-3">Notifications</h3>
      
      {!("Notification" in window) ? (
        <p className="text-yellow-500">Your browser does not support notifications.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notificationToggle"
              checked={enabled && permission === "granted"}
              onChange={() => {
                if (permission !== "granted") {
                  requestPermission();
                } else {
                  setEnabled(!enabled);
                }
              }}
              className="h-4 w-4"
            />
            <label htmlFor="notificationToggle">Enable notifications when timer ends</label>
          </div>
          
          {permission === "denied" && (
            <p className="text-red-500 text-sm">
              Notification permission denied. Please enable notifications in your browser settings.
            </p>
          )}
          
          {permission === "default" && (
            <p className="text-yellow-500 text-sm">
              You'll need to allow notifications for this feature to work.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;