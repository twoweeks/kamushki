export default {
    links: {
        rules: 'https://20.twg.host/pages/rules/',
    },

    API_KEYS: {
        recaptcha: String(import.meta.env.VITE_API_RECAPTCHA_CLIENT_KEY ?? ''),
    },
};
