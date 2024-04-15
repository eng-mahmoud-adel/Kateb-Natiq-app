// this function is used to convert from urlsafe_b64 to regular base64

export const getRegularBase64 = (urlsafe_b64: string) => {
    const regularBase64String = urlsafe_b64.replace(/-/g, "+").replace(/_/g, "/");
    return regularBase64String;
};
