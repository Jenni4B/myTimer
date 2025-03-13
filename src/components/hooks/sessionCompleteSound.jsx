const playSessionCompleteSound = () => {
    const audio = new Audio("/alarm-clock.mp3")
    audio.play().catch(error => console.error("Error playing sound: ", error));
};

export default playSessionCompleteSound;