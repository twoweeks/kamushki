import { parse as parseCookie } from '@tinyhttp/cookie';

import CONFIG from '../config.js';

export const getIsAuth = (cookes = ''): boolean => {
    const Cookies = parseCookie(cookes || '') as { auth_key?: typeof CONFIG.auth_key };

    return 'auth_key' in Cookies && Cookies.auth_key === CONFIG.auth_key;
};
