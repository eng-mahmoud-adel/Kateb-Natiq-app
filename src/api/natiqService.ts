import { SERVICE_LINK } from "../enum";
import { INatiqParams } from "../types";

export const sendToNatiqService = ({ text, setNatiqData }: INatiqParams) => {
    fetch(`${SERVICE_LINK.NATIQ_LINK}`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((result) => {
            setNatiqData(result);
        })
        .catch((error) => console.error("error", error));
};
