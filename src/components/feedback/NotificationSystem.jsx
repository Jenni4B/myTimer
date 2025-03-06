const Notification = () => {

    // Request notification permission when component mounts
        if ("Notification" in window && Notification.permission !== "granted") {
          Notification.requestPermission();
        }
    
      // Function to show notification
      const showNotification = (title, message) => {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(title, { body: message });
        }
      };
}

export default Notification;