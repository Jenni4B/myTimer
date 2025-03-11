// Helper function to show notifications
const showNotification = (title, message, enabled) => {
    if (enabled && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, { 
        body: message,
        icon: '/favicon.ico' // Optional: Add your app icon
      });
    }
  };
  
  export default showNotification;