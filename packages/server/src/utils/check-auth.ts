import { FastifyRequest } from 'fastify';

import CONFIG from '../config.js';

export const getIsAuth = (cookes: FastifyRequest['cookies']): boolean => {
    return 'auth_key' in cookes && cookes.auth_key === CONFIG.auth_key;
};
