export type GameStageType = 'demo' | 'final';

export type SendFormStatusResponseType = {
    status: 'open' | 'closed';
    stage: GameStageType;
};

export type SendFormTimesType = {
    demo_end: Date;
    final_end: Date;
    open_before: number;
    open_after: number;
};

export type GameItemType = {
    _id: string;
    contest: number;
    stage: GameStageType;
    title: string;
    email: string;
    genre: string;
    description: string;
    tools: string;
    archive: string;
    screenshot: string;
    date: string;
};

export type SendFormQueryParamsType = {
    gameInfo: Omit<GameItemType, '_id' | 'contest' | 'stage' | 'date'>;
    captcha: string;
};

export type SendedGameStatusType = 'success' | 'form_closed' | 'wrong_captcha';

export type SendFormResponseType = {
    status: SendedGameStatusType;
};

export type LoginQueryParamsType = {
    auth_key: string;
    captcha: string;
};

export type ContestsQueryResponseType = number[];

export type GamesQueryParamsType = {
    contest?: number;
};

export type GamesQueryResponseType = GameItemType[];

export type EditGameInfoQueryParamsType = Omit<GameItemType, 'contest' | 'stage' | 'date'>;

export type DeleteGamesQueryParamsType = string[];
