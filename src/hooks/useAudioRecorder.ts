import { useState, useRef } from "react";
import { sendToKatebService } from "../api/katebService";
import { IKatebResponse, INatiqParams, INatiqResponse } from "../types";
import { getWaveBlob } from "webm-to-wav-converter";

interface IProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setKatebData: React.Dispatch<React.SetStateAction<IKatebResponse>>;
    setNatiqData: React.Dispatch<React.SetStateAction<INatiqResponse>>;
    sendToNatiqService: ({ text, setNatiqData }: INatiqParams) => void;
}

const useAudioRecorder = ({ setLoading, setKatebData, setNatiqData, sendToNatiqService }: IProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                chunksRef.current = [];
                mediaRecorderRef.current = new MediaRecorder(stream);

                mediaRecorderRef.current.start();
                setIsRecording(true);

                mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                    chunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = async () => {
                    const blob = new Blob(chunksRef.current, {
                        type: chunksRef.current[0].type,
                    });

                    const wavBlob = await getWaveBlob(blob, true);

                    setAudioBlob(wavBlob);

                    sendToKatebService({
                        audioData: wavBlob,
                        setLoading,
                        setKatebData,
                        sendToNatiqService,
                        setNatiqData,
                    });
                };
            })
            .catch((error) => console.log("Error accessing microphone:", error));
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const playRecording = () => {
        if (audioBlob) {
            const audioURL = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioURL);
            audio.play();
        }
    };

    const clearRecording = () => {
        setAudioBlob(null);
    };

    return { startRecording, stopRecording, playRecording, clearRecording, isRecording, audioBlob };
};

export default useAudioRecorder;
