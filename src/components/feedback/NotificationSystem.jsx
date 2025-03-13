import { useState } from "react";
import playSessionCompleteSound from "../hooks/sessionCompleteSound";

const NotificationSystem = ({ enabled, setEnabled }) => {
  const [permission, setPermission] = useState("default");

  // Check if notifications are enabled in local storage
  const testNotification = () => {
    if ("Notification" in window && Notification.permission === "granted" && enabled) {
      new Notification("Test Notification", {
        body: "Your notifications are working correctly!",
        icon: '/butterCat.png'
      });
      playSessionCompleteSound(); // Play sound when the session is complete
    } else {
      alert("Notifications are not enabled or permission is not granted.");
    }
  };

  // Request notification permission
  const requestPermission = async () => {
    if ("Notification" in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        
        if (result === "granted") {
          setEnabled(true);
          localStorage.setItem("notificationsEnabled", "true");
          // Show a test notification to confirm it's working
          new Notification("Notifications Enabled", { 
            body: "You'll be notified when your timer completes."
          });
        } else {
          setEnabled(false);
          localStorage.setItem("notificationsEnabled", "false");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  };

  // 3/12/2025: Moved the if statement to it's own const declaration
  const permissionGranted = async () => {
    if (permission !== "granted") {
      requestPermission();
    } else {
      setEnabled(!enabled);
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
              onChange={permissionGranted}
              checked={enabled && permission === "granted"}
              className="h-4 w-4"
            />
            <label htmlFor="notificationToggle">Enable notifications when timer ends</label>
          </div>
          
          {/* if the user has denied permission, they should see a message alerting them*/}
          {permission === "denied" && (
            <p className="text-red-500 text-sm">
              Notification permission denied. Please enable notifications in your browser settings.
            </p>
          )}
          
          {/* if the user hasn't granted permission yet, they should see a check to do so */}
          {permission === "default" && (
            <p className="text-yellow-500 text-sm">
              You'll need to allow notifications for this feature to work.
            </p>
          )}

          {/* if notifications are enabled, the test should work for the user */}
          {permission === "granted" && (
            <button onClick={testNotification} className="btn btn-primary">
              Test notification
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;