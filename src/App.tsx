import "./App.css";
import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

const App = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    useEffect(() => {
        setTextToCopy(transcript);
    }, [transcript])

    const resetHandler = () => {
        resetTranscript(); // Clear transcript
        SpeechRecognition.stopListening(); // Stop listening
        startListening(); // Start listening again
    }

    const copyHandler = () => {
        if (!transcript){
            alert("Nothing to copy")
            return
        }
        setCopied();
    }

    return (
        <div className="container">
            <h2>Speech to Text Converter</h2>
            <br/>
            <div className="main-content">
                {transcript}
            </div>
            <div className="btn-style">
                <button onClick={copyHandler}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetHandler}>Reset</button>
            </div>
        </div>
    );
};

export default App;
