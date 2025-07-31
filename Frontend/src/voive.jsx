import React, { useState } from "react";

const VoiceInput = () => {
  const [transcript, setTranscript] = useState(
    "Transcript will appear here..."
  );

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = () => {
      setTranscript("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(`📝 You said: "${spoken}"`);
    };

    recognition.onerror = (event) => {
      setTranscript(`❌ Error: ${event.error}`);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>🎤 Speak Something</h2>
      <button
        onClick={startListening}
        style={{ padding: "10px 20px", fontSize: "1rem", cursor: "pointer" }}
      >
        Start Listening
      </button>
      <p style={{ fontSize: "1.5rem", marginTop: "20px", color: "#333" }}>
        {transcript}
      </p>
    </div>
  );
};

export default VoiceInput;
