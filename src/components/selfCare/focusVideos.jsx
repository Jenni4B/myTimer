import { useState } from "react";

const FocusVideos = () => {
  const [videoLinks, setVideoLinks] = useState([
    "https://www.youtube.com/embed/VIDEO_ID_1",
    "https://www.youtube.com/embed/VIDEO_ID_2",
    "https://www.youtube.com/embed/VIDEO_ID_3"
  ]);

  const [newVideo, setNewVideo] = useState("");

  const handleAddVideo = () => {
    if (newVideo.trim()) {
      setVideoLinks([...videoLinks, newVideo]);
      setNewVideo("");
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
