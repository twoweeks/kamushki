import type { SendFormTimesType, GameStageType } from '../types.js';

const getGameStage = (times: SendFormTimesType): GameStageType | undefined => {
    let stage: GameStageType | undefined = undefined;

    const Now = new Date().getTime();

    const DemoFormStart = new Date(times.demo_end).getTime() - times.open_before * 1000;
    const DemoFormEnd = new Date(times.demo_end).getTime() + times.open_after * 1000;

    const FinalFormStart = new Date(times.final_end).getTime() - times.open_before * 1000;
    const FinalFormEnd = new Date(times.final_end).getTime() + times.open_after * 1000;

    if (DemoFormStart <= Now && Now <= DemoFormEnd) {
        stage = 'demo';
    }

    if (FinalFormStart <= Now && Now <= FinalFormEnd) {
        stage = 'final';
    }

    return stage;
};

export default getGameStage;
