import type { SendFormStatusResponseType, SendFormTimesType } from '../types.js';

const getSendFormStatus = (times: SendFormTimesType): SendFormStatusResponseType => {
    const Status: SendFormStatusResponseType = {
        status: 'closed',
        stage: 'demo',
    };

    const Now = new Date().getTime();

    const DemoFormStart = new Date(times.demo_end).getTime() - times.open_after * 1000;
    const DemoFormEnd = new Date(times.demo_end).getTime() + times.open_before * 1000;

    const FinalFormStart = new Date(times.final_end).getTime() - times.open_after * 1000;
    const FinalFormEnd = new Date(times.final_end).getTime() + times.open_before * 1000;

    if (DemoFormStart <= Now && Now <= DemoFormEnd) {
        Status.status = 'open';
        Status.stage = 'demo';
    }

    if (FinalFormStart <= Now && Now <= FinalFormEnd) {
        Status.status = 'open';
        Status.stage = 'final';
    }

    return Status;
};

export default getSendFormStatus;
