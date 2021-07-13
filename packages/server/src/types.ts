export type SendFormStatusResponseType = {
    status: 'open' | 'closed';
    stage: 'demo' | 'final';
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
    stage: SendFormStatusResponseType['stage'];
    title: string;
    email: string;
    genre: string;
    description: string;
    tools: string;
    archive: string;
    screenshot: string;
    date: string;
};

export type SendFormQueryParamsType = Partial<Omit<GameItemType, '_id' | 'contest' | 'stage' | 'date'> & { captcha: string }>;
