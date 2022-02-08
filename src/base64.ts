const base64Encode = (...parts: string[]) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
            const offset = reader.result?.indexOf(",") + 1;
            resolve(reader.result?.slice(offset));
        };
        reader.readAsDataURL(new Blob(parts));
    });
}

const base64Decode = (text: string, charset: string) => {
    return fetch(`data:text/plain;charset=${charset};base64,` + text).then(response => response.text());
}

export {base64Decode, base64Encode}