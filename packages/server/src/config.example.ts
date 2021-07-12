const TimeZone = '+03:00'; // Moscow/Europe

export default {
    contest: {
        number: 20,
    },

    times: {
        // время окончания приёма демок
        demo_end: new Date('2021-07-17' + 'T' + '00:00' + TimeZone),

        // время окончания приёма финалок
        final_end: new Date('2021-07-14' + 'T' + '00:00' + TimeZone),

        // период (в секундах), в который будет работать форма приёма игр до времени окончания
        open_before: 2 * 24 * 60 * 60,

        // период (в секундах), в который будет работать форма приёма игр после времени окончания
        open_after: 2 * 60 * 60,
    },

    db: {
        hostname: '127.0.0.1',
        name: '',
        username: '',
        password: '',
    },

    API_KEYS: {
        recaptcha: '',
        twitch: {
            client_id: '',
            client_secret: '',
        },
    },
};
