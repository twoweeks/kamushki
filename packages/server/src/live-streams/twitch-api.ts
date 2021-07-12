import fetch from 'cross-fetch';
import { join } from 'path';
import { writeFile, readFile } from 'fs/promises';

import type { StreamItemType } from './types.js';
import type { TwitchAuthResponseType, TwitchTokenFormatInFSType } from './twitch-api.types.js';

const TWITCH_TOKEN_FILE = 'twitch_token.json';
const TWITCH_STREAMS_LIST_FILE = 'twitch_streams_list.json';

export const getTwitchAuthToken = async (clientID: string, clientSecret: string): Promise<TwitchAuthResponseType> => {
    const TwitchApiAuthURL = 'https://id.twitch.tv/oauth2/token';

    const RequestURLParams = new URLSearchParams();

    // https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-client-credentials-flow

    RequestURLParams.append('client_id', clientID);
    RequestURLParams.append('client_secret', clientSecret);
    RequestURLParams.append('grant_type', 'client_credentials');

    const RequestURL = `${TwitchApiAuthURL}?${RequestURLParams.toString()}`;

    return fetch(RequestURL, { method: 'POST' })
        .then(r => r.json())
        .then(data => data);
};

export const writeTwitchTokenFile = async (staticDir: string, tokenResponse: TwitchAuthResponseType): Promise<void> => {
    const TokenContent: TwitchTokenFormatInFSType = {
        access_token: tokenResponse.access_token,
        expires_date: new Date().getTime() + tokenResponse.expires_in * 1000,
    };

    const FilePath = join(staticDir, TWITCH_TOKEN_FILE);
    return writeFile(FilePath, JSON.stringify(TokenContent), 'utf-8');
};

export const readTwitchTokenFile = async (staticDir: string): Promise<string> => {
    const FilePath = join(staticDir, TWITCH_TOKEN_FILE);

    return readFile(FilePath, 'utf-8').then(data => {
        const JsonData = JSON.parse(data) as TwitchTokenFormatInFSType;

        if (JsonData.expires_date > new Date().getTime()) {
            throw 'Token expires';
        }

        return JsonData.access_token;
    });
};

export const getTwitchAuthTokenFlow = async (staticDir: string, clientID: string, clientSecret: string): Promise<string> => {
    let token = '';

    try {
        token = await readTwitchTokenFile(staticDir);
    } catch (e) {
        console.warn('Twitch token not found in the file system, trying to get', '/', new Date().toISOString());
    }

    if (token !== '') return token;

    let twitchAuthResponse: TwitchAuthResponseType | null = null;

    try {
        twitchAuthResponse = await getTwitchAuthToken(clientID, clientSecret);
    } catch (e) {
        console.warn('Failed to get twitch token, please check cridentials', '/', new Date().toISOString());
    }

    if (twitchAuthResponse) {
        await writeTwitchTokenFile(staticDir, twitchAuthResponse);
        token = twitchAuthResponse.access_token;
    }

    if (token === '') throw 'Failed to get twitch token';

    return token;
};

export const getTwitchLiveStreams = async (userLogins: string[], clientID: string, clientSecret: string): Promise<StreamItemType[]> => {
    const TwitchApiURL = 'https://api.twitch.tv/helix';

    const RequestURLParams = new URLSearchParams();

    userLogins.forEach(userLogin => RequestURLParams.append('user_login', String(userLogin)));

    // https://dev.twitch.tv/docs/api/reference#get-streams

    const RequestURL = `${TwitchApiURL}/streams?${RequestURLParams.toString()}`;

    return fetch(RequestURL, {
        method: 'GET',
        headers: {
            'Client-Id': clientID,
            Authorization: `Bearer ${clientSecret}`,
        },
    })
        .then(r => r.json())
        .then(data => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return data.data.map((streamInfo: any) => ({
                login: streamInfo.user_login,
                title: streamInfo.title,
                viewers: streamInfo.viewer_count,
                image: streamInfo.thumbnail_url.replace('{width}', '640').replace('{height}', '360'),
            }));
        });
};

export const writeTwitchStreamsListFile = async (staticDir: string, streamsList: StreamItemType[]): Promise<void> => {
    const FilePath = join(staticDir, TWITCH_STREAMS_LIST_FILE);
    return writeFile(FilePath, JSON.stringify(streamsList), 'utf-8');
};

export const getTwitchStreamsListFilePath = (staticDir: string): string => {
    return join(staticDir, TWITCH_STREAMS_LIST_FILE);
};
