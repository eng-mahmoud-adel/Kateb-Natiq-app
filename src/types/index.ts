export interface IWord {
    text: string;
    start: number;
    end: number;
    confidence: number;
}

export interface IKatebResponse {
    total_duration: number;
    words: IWord[];
}

export interface INatiqResponse {
    durations: [string, number, number];
    wave: string;
}

export interface IKatebParams {
    audioData: Blob;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setKatebData: React.Dispatch<React.SetStateAction<IKatebResponse>>;
    sendToNatiqService: ({ text, setNatiqData }: INatiqParams) => void;
    setNatiqData: React.Dispatch<React.SetStateAction<INatiqResponse>>;
}

export interface INatiqParams {
    text: string;
    setNatiqData: React.Dispatch<React.SetStateAction<INatiqResponse>>;
}
