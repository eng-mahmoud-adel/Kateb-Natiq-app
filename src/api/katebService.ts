import { SERVICE_LINK } from "../enum";
import { IKatebParams, IWord } from "../types";

export const sendToKatebService = ({
    audioData,
    setLoading,
    setKatebData,
    sendToNatiqService,
    setNatiqData,
}: IKatebParams) => {
    console.log("audioData:", audioData);

    setLoading(true);

    const formdata = new FormData();
    formdata.append("file", audioData);

    fetch(`${SERVICE_LINK.KATEB_LINK}`, {
        method: "POST",
        redirect: "follow",
        body: formdata,
    })
        .then((response) => response.json())
        .then((result) => {
            const {
                total_duration,
                json: { words },
            } = result;

            setKatebData({
                total_duration,
                words,
            });

            // send the text response from kateb service to natiq service
            const text = words?.map((word: IWord) => word.text).join(" ");
            sendToNatiqService({ text, setNatiqData });
        })
        .catch((error) => console.error("error", error))
        .finally(() => setLoading(false));
};
