import { getRegularBase64 } from "../../utils/base64Converter";

interface IProps {
    urlsafe_b64: string;
    audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPlayer = ({ urlsafe_b64, audioRef }: IProps) => {
    const regularBase64 = getRegularBase64(urlsafe_b64 || "");

    return (
        <audio controls ref={audioRef}>
            <source src={`data:audio/mpeg;base64,${regularBase64}`} type="audio/mpeg" />
        </audio>
    );
};

export default AudioPlayer;
