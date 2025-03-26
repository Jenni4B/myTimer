const DataDownload = () => {
  const downloadUserData = () => {
    // Collect all relevant data from localStorage
    const localStorageData = {
      focusSessions: JSON.parse(localStorage.getItem('focusSessions') || '[]'),
      breakSessions: JSON.parse(localStorage.getItem('breakSessions') || '[]'),
      settings: {
        notifications: JSON.parse(localStorage.getItem('notificationsEnabled') || 'false'),
        customTimes: JSON.parse(localStorage.getItem('customTimes') || '{}')
      }
    };

    // Convert data to JSON string
    const dataStr = JSON.stringify(localStorageData, null, 2);
    
    // Create a blob with the data
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    // Create a link element, use it to download the blob, and remove it
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `focus_app_data_${new Date().toISOString().split('T')[0]}.json`;
    
    // Append to the body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="settings-box data-download">
      <h3>Export User Data</h3>
      <button 
        className="download-button" 
        onClick={downloadUserData}
      >
        Download My Data
      </button>
    </div>
  );
};

export default DataDownload;