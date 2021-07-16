import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getContestsThunk, getGamesThunk } from '../GamesPageReduxSlice';
import { resetData, setStageFIlter } from '../GamesPageReduxSlice';

import { getContestsData, getFiltredGamesData, getStageFilterValue } from '../GamesPageReduxSelectors';
import { getGamesCount, getIsDataPending } from '../GamesPageReduxSelectors';

import GamesPage from './GamesPage';

const GamesPageContainer: React.FC = () => {
    const ContestsData = useSelector(getContestsData);
    const GamesData = useSelector(getFiltredGamesData);
    const IsDataPending = useSelector(getIsDataPending);
    const GamesCount = useSelector(getGamesCount);
    const StageFilterValue = useSelector(getStageFilterValue);

    const dispatch = useDispatch();

    const [SelectedContest, setSelectedContest] = useState(-1);

    useEffect(() => {
        dispatch(getContestsThunk());

        return () => {
            dispatch(resetData());
        };
    }, []);

    useEffect(() => {
        if (ContestsData.length !== 0 && SelectedContest === -1) {
            setSelectedContest(ContestsData[ContestsData.length - 1]);
        }
    }, [ContestsData]);

    useEffect(() => {
        if (SelectedContest !== -1) {
            dispatch(getGamesThunk({ contest: SelectedContest }));
        }
    }, [SelectedContest]);

    const handleSelectedContestChange = useCallback((contestNum: number) => {
        setSelectedContest(contestNum);
    }, []);

    const handleGamesStageFilterChange = useCallback((stage: Parameters<typeof setStageFIlter>[0]) => {
        dispatch(setStageFIlter(stage));
    }, []);

    return (
        <GamesPage
            {...{ ContestsData, GamesData, IsDataPending, GamesCount }}
            {...{ SelectedContest, handleSelectedContestChange }}
            {...{ StageFilterValue, handleGamesStageFilterChange }}
        />
    );
};

export default GamesPageContainer;
