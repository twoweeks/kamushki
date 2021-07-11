import fetch from 'cross-fetch';

type StreamItemType = {
    service: 'twitch' | 'wasd';
    login: string;
    title: string;
    viewers: number;
    image: string;
};

export const getTwitchLiveStreams = async (usersID: number[], clientID: string): Promise<StreamItemType[]> => {
    const TwitchApiURL = 'https://api.twitch.tv/helix';

    const RequestURLParams = new URLSearchParams();

    usersID.forEach(userID => RequestURLParams.append('user_id', String(userID)));

    const RequestURL = `${TwitchApiURL}/users?${RequestURLParams.toString()}`;

    console.log(RequestURL);

    return fetch(RequestURL, {
        method: 'GET',
        headers: {
            'Client-Id': 'oh6nwjvwyo1bqbikb3gmkarytzmxhv',
            Authorization: `Bearer ${clientID}`,
        },
    })
        .then(r => r.json())
        .then(data => {
            console.log(data);

            return [];
        });
};
