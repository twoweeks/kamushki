import dotenv from 'dotenv';

import type { SendFormTimesType } from './types.js';

dotenv.config();

const TimeZone = '+03:00'; // Moscow/Europe

const SendFormTimes: SendFormTimesType = {
    // время окончания приёма демок
    demo_end: new Date('2021-07-25' + 'T' + '00:00' + TimeZone),

    // время окончания приёма финалок
    final_end: new Date('2021-08-02' + 'T' + '00:00' + TimeZone),

    // период (в секундах), в который будет открыта форма отправки игр, до времени окончания приёма
    open_before: 3 * 24 * 60 * 60,

    // период (в секундах), в который форма будет работать после окончания времени приёма
    open_after: 2 * 60 * 60,
};

const DEFAULT_SERVER_PORT = 3001;
const DEFAULT_SERVER_HOST = '127.0.0.1';

export default {
    contest: {
        number: 20,

        site: 'https://20.twg.host',
    },

    auth_key: process.env.SERVER_AUTH_KEY ?? String(Math.random()),

    send_form_times: SendFormTimes,

    server: {
        host: process.env.APP_IP ?? DEFAULT_SERVER_HOST,

        port: Number(process.env.APP_PORT ?? DEFAULT_SERVER_PORT),

        db_connection_string: process.env.DB_CONNECTION_STRING ?? 'mongodb://localhost:27017',

        db_name: process.env.DBNAME,
    },

    API_KEYS: {
        recaptcha: process.env.API_RECAPTCHA_SERVER_KEY ?? '',

        twitch: {
            client_id: process.env.API_TWITCH_CLIENT_ID ?? '',
            client_secret: process.env.API_TWITCH_CLIENT_SECRET ?? '',
        },
    },
};
