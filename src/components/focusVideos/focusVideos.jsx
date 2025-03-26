import { useState, useEffect } from "react";

const FocusVideos = () => {
  // State for storing video links
  const [videoLinks, setVideoLinks] = useState([]);
  
  // State for handling input from the user
  const [newVideo, setNewVideo] = useState("");

  /* ----------------- Load & Save Videos to Local Storage ----------------- */

  // Load saved videos from local storage when the component mounts
  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem("videoLinks")) || [];
    setVideoLinks(savedVideos);
  }, []);

  // Save updated video list to local storage whenever videoLinks change
  useEffect(() => {
    localStorage.setItem("videoLinks", JSON.stringify(videoLinks));
  }, [videoLinks]);

  /* ----------------- Helper Functions ----------------- */

  // Extracts YouTube Video ID and creates an embeddable URL
  const getEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  /* ----------------- Event Handlers ----------------- */

  // Handles adding a new video to the list
  const handleAddVideo = () => {
    const embedUrl = getEmbedUrl(newVideo);
    
    if (embedUrl) {
      const updatedVideos = [...videoLinks, embedUrl];
      setVideoLinks(updatedVideos);
      setNewVideo("");

      // Save updated list to local storage
      localStorage.setItem("videoLinks", JSON.stringify(updatedVideos));
    } else {
      alert("Invalid YouTube link. Please use a valid YouTube video URL.");
    }
  };

  // Handles deleting a video from the list
  const handleDeleteVideo = (videoUrl) => {
    const updatedVideos = videoLinks.filter((video) => video !== videoUrl);
    setVideoLinks(updatedVideos);

    // Update local storage
    localStorage.setItem("videoLinks", JSON.stringify(updatedVideos));
  };

  /* ----------------- Render UI ----------------- */
  return (
    <div className="focus-videos-container">
      
      {/* Video Input Section */}
      <div className="video-input">
        <input
          type="text"
          placeholder="Enter a YouTube link..."
          value={newVideo}
          onChange={(e) => setNewVideo(e.target.value)}
        />
        <button onClick={handleAddVideo}>Submit</button>
      </div>

      {/* Video Display Section */}
      <div className="video-grid">
        {videoLinks.map((videoUrl, index) => (
          <div key={index} className="video-item">
            
            {/* Embedded YouTube Video */}
            <iframe 
              src={videoUrl} 
              title={`Focus Video ${index + 1}`} 
              allowFullScreen 
            />
            
            {/* Delete Button */}
            <button 
              className="delete-button" 
              onClick={() => handleDeleteVideo(videoUrl)}
            >
              ❌
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusVideos;
