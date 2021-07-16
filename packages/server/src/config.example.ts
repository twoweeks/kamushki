import type { SendFormTimesType } from './types.js';

const TimeZone = '+03:00'; // Moscow/Europe

const SendFormTimes: SendFormTimesType = {
    // время окончания приёма демок
    demo_end: new Date('2021-07-17' + 'T' + '00:00' + TimeZone),

    // время окончания приёма финалок
    final_end: new Date('2021-07-17' + 'T' + '00:00' + TimeZone),

    // период (в секундах), в который будет открыта форма отправки игр, до времени окончания приёма
    open_before: 2 * 24 * 60 * 60,

    // период (в секундах), в который форма будет работать после окончания времени приёма
    open_after: 2 * 60 * 60,
};

export default {
    contest: {
        number: 20,
        site: 'https://20.twg.host',
    },

    auth_key: '',

    send_form_times: SendFormTimes,

    server: {
        port: 3001,

        db: {
            hostname: '127.0.0.1',
            name: '',
            username: '',
            password: '',
        },
    },

    API_KEYS: {
        recaptcha: '', // v2
        twitch: {
            client_id: '',
            client_secret: '',
        },
    },
};
