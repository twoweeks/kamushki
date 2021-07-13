import type { SendFormStatusResponseType, SendFormTimesType } from '../types.js';

import getGameStage from './get-game-stage.js';

const getSendFormStatus = (times: SendFormTimesType): SendFormStatusResponseType => {
    const CurrentGameStage = getGameStage(times);

    return {
        status: CurrentGameStage ? 'open' : 'open',
        stage: CurrentGameStage ?? 'demo',
    };
};

export default getSendFormStatus;
