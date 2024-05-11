'use client'
import Rodal from 'rodal';
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import 'rodal/lib/rodal.css';
import { AudioRecorder, useAudioRecorder  } from 'react-audio-voice-recorder';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const { stopRecording } = useAudioRecorder();

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
    stopRecording();
  };
  
  return (
    <main className={styles.main}>
      <button onClick={show}>Record</button>
      <Rodal visible={visible} onClose={hide} >
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
            // autoGainControl: true,
            // channelCount,
            // deviceId,
            // groupId,
            // sampleRate,
            // sampleSize,
          }}
          onNotAllowedOrFound={(err) => console.table(err)}
          downloadOnSavePress={true}
          downloadFileExtension="webm"
          mediaRecorderOptions={{
            audioBitsPerSecond: 128000,
          }}
          showVisualizer={true}
        />
      </Rodal>
    </main>
  );
}
