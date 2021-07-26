export const prepareString = (text: string): string => {
    return text.replaceAll('\r', '').replaceAll('\n', ' ').trim();
};
