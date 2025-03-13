// Updated ShowNotification.jsx
const showNotification = (title, message, enabled) => {
  try {
    if (enabled && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, { 
        body: message,
        icon: '/butterCat.png',
      });
    } else {
      console.log("Notification not sent: permission not granted or notifications disabled");
    }
  } catch (error) {
    console.error("Error showing notification:", error);
  }
};
  
export default showNotification;