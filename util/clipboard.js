import clipboard from "clipboardy";

export async function writeToClipboard(text) {
    await clipboard.write(text);
}