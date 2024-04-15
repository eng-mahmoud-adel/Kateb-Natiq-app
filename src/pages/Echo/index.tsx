import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { IKatebResponse, INatiqResponse, IWord } from "../../types";
import AudioPlayer from "../../components/AudioPlayer";
import { sendToNatiqService } from "../../api/natiqService";
import { sendToKatebService } from "../../api/katebService";
import BaseInput from "../../components/Input";
import useAudioRecorder from "../../hooks/useAudioRecorder";

const Echo = () => {
    const [loading, setLoading] = useState(false);
    const [katebData, setKatebData] = useState<IKatebResponse>({} as IKatebResponse);
    const [natiqData, setNatiqData] = useState<INatiqResponse>({} as INatiqResponse);
    const { startRecording, stopRecording, playRecording, clearRecording, isRecording, audioBlob } = useAudioRecorder({
        setLoading,
        setKatebData,
        sendToNatiqService,
        setNatiqData,
    });

    const audioRef = useRef<HTMLAudioElement>(null);
    const [highlightedTextIndex, setHighlightedTextIndex] = useState(-1);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleHighlightedText = () => {
            const currentTime = audio.currentTime;
            const wordIndex = katebData.words.findIndex(
                (word: IWord) => word.start <= currentTime && word.end >= currentTime
            );
            setHighlightedTextIndex(wordIndex);
        };

        const handleEndedAudio = () => {
            setHighlightedTextIndex(-1);
        };

        audio.addEventListener("timeupdate", handleHighlightedText);
        audio.addEventListener("ended", handleEndedAudio);

        return () => {
            audio.removeEventListener("timeupdate", handleHighlightedText);
            audio.removeEventListener("ended", handleEndedAudio);
        };
    }, [natiqData.durations?.length]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                const buffer = event.target.result as ArrayBuffer;
                const blob = new Blob([buffer], { type: `${file.type};codecs=opus` });

                sendToKatebService({ audioData: blob, setLoading, setKatebData, sendToNatiqService, setNatiqData });
            }
        };

        reader.onerror = (error) => {
            console.error("error", error);
        };

        reader.readAsArrayBuffer(file);
    };

    if (loading) {
        return <p className={styles.loading}>loading...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.fileContainer}>
                <BaseInput type="file" name="file" id="file" onChange={handleFileChange} />

                {katebData?.words?.length && natiqData?.wave?.length ? (
                    <div className={styles.playerContainer}>
                        <AudioPlayer urlsafe_b64={natiqData.wave} audioRef={audioRef} />

                        <div className={styles.words}>
                            {katebData.words.map((word: IWord, index) => (
                                <p
                                    key={`${word}_${index}`}
                                    className={highlightedTextIndex === index ? styles.highlightedText : ""}
                                >
                                    {word.text}
                                </p>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>

            <hr />

            <div className={styles.recording_buttons_container}>
                <button className={styles.recording_button} onClick={startRecording} disabled={isRecording}>
                    Start Recording
                </button>
                <button className={styles.recording_button} onClick={stopRecording} disabled={!isRecording}>
                    Stop Recording
                </button>
                <button className={styles.recording_button} onClick={playRecording} disabled={!audioBlob}>
                    Play Recording
                </button>
                <button className={styles.recording_button} onClick={clearRecording} disabled={!audioBlob}>
                    Clear Recording
                </button>
            </div>
        </div>
    );
};

export default Echo;
