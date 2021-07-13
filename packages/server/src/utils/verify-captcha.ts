import { fetch } from 'cross-fetch';

const verifyCaptcha = async (clientSecret: string, captchaToken: string): Promise<boolean> => {
    const Token = captchaToken.replace('&', '').replace('?', '');

    return fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${clientSecret}&response=${Token}`)
        .then(r => r.json())
        .then(data => {
            return data.success;
        })
        .catch(err => {
            console.warn(err);
            return false;
        });
};

export default verifyCaptcha;
