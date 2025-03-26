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
    if (videoLinks.length > 0) {
      localStorage.setItem("videoLinks", JSON.stringify(videoLinks));
    }
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

    if (!embedUrl) {
      alert("Invalid YouTube link. Please use a valid YouTube video URL.");
      return;
    }

    // Prevent duplicate entries
    if (videoLinks.includes(embedUrl)) {
      alert("This video is already in the list.");
      return;
    }

    setVideoLinks((prevVideos) => {
      const updatedVideos = [...prevVideos, embedUrl];
      localStorage.setItem("videoLinks", JSON.stringify(updatedVideos));
      return updatedVideos;
    });

    setNewVideo(""); // Clear input field
  };

  // Handles deleting a video from the list
  const handleDeleteVideo = (videoUrl) => {
    setVideoLinks((prevVideos) => {
      const updatedVideos = prevVideos.filter((video) => video !== videoUrl);
      localStorage.setItem("videoLinks", JSON.stringify(updatedVideos));
      return updatedVideos;
    });
  };

  return (
    <div className="focus-videos-container">
      <h3>Focus Videos</h3>
      
      {/* Input Section */}
      <div className="video-input">
        <input
          type="text"
          placeholder="Enter a YouTube link..."
          value={newVideo}
          onChange={(e) => setNewVideo(e.target.value)}
        />
        <button onClick={handleAddVideo}>➕ Add Video</button>
      </div>

      {/* Video List */}
      <div className="video-grid">
        {videoLinks.length === 0 ? (
          <p>No videos added yet.</p>
        ) : (
          videoLinks.map((video, index) => (
            <div key={index} className="video-item">
              <iframe
                src={video}
                title={`Focus Video ${index + 1}`}
                allowFullScreen
              />
              <button onClick={() => handleDeleteVideo(video)}>❌ Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FocusVideos;
