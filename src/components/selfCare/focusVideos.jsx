import { useState, useEffect } from "react";

const FocusVideos = () => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [newVideo, setNewVideo] = useState("");

  // Load saved videos from local storage on mount
  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem("videoLinks")) || [];
    setVideoLinks(savedVideos);
  }, []);

  // Save videos to local storage when the list updates
  useEffect(() => {
    localStorage.setItem("videoLinks", JSON.stringify(videoLinks));
  }, [videoLinks]);

  // Extract YouTube Video ID and convert it into an embeddable URL
  const getEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const handleAddVideo = () => {
    const embedUrl = getEmbedUrl(newVideo);
    if (embedUrl) {
      setVideoLinks([...videoLinks, embedUrl]);
      setNewVideo("");
    } else {
      alert("Invalid YouTube link. Please use a valid YouTube video URL.");
    }
  };

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

      {/* Video Grid */}
      <div className="video-grid">
        {videoLinks.map((link, index) => (
          <iframe
            key={index}
            src={link}
            title={`Focus Video ${index + 1}`}
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
};

export default FocusVideos;