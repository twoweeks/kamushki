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
