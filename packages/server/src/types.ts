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

export type GameType = {
    title: string;
    genre: string;
    description: string;
    tools: string;
    archive: string;
    screenshot: string;
};

export type GameEntryType = {
    _id: string;
    contest: number;
    stage: GameStageType;
    email: string;
    gameInfo: GameType;
    comment: string;
    date: string;
};

export type SendEntryQueryParamsType = Pick<GameEntryType, 'email' | 'gameInfo' | 'comment'> & {
    captcha: string;
};

export type SendEntryFormStatusType = 'success' | 'form_closed' | 'wrong_captcha';

export type SendEntryQueryResponseType = {
    status: SendEntryFormStatusType;
};

export type LoginQueryParamsType = {
    auth_key: string;
    captcha: string;
};

export type ContestsQueryResponseType = number[];

export type EntriesQueryParamsType = {
    contest?: number;
};

export type EntriesQueryResponseType = GameEntryType[];

export type EditEntryInfoQueryParamsType = Pick<GameEntryType, '_id' | 'email' | 'gameInfo' | 'comment'>;

export type DeleteEntriesQueryParamsType = string[];
