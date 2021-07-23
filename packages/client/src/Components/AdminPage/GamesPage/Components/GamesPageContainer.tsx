import React, { useState, useEffect, useCallback } from 'react';
import { renderToString } from 'react-dom/server';

import { useSelector, useDispatch } from 'react-redux';

import { getContestsThunk, getGamesThunk, deleteGamesThunk } from '../GamesPageReduxSlice';
import { setStageFIlter, setEditableGameID, resetState } from '../GamesPageReduxSlice';

import { getContestsData, getFiltredGamesData, getStageFilterValue } from '../GamesPageReduxSelectors';
import { getGamesCount, getIsDataPending, getEditableGameID } from '../GamesPageReduxSelectors';

import GamesPage from './GamesPage';
import EditGameInfoModal from './EditGameInfoModal/EditGameInfoModalContainer';

const GamesPageContainer: React.FC = () => {
    const ContestsData = useSelector(getContestsData);
    const GamesData = useSelector(getFiltredGamesData);
    const IsDataPending = useSelector(getIsDataPending);
    const GamesCount = useSelector(getGamesCount);
    const StageFilterValue = useSelector(getStageFilterValue);
    const EditableGameID = useSelector(getEditableGameID);

    const dispatch = useDispatch();

    const [SelectedContest, setSelectedContest] = useState(-1);

    useEffect(() => {
        dispatch(getContestsThunk());

        return () => {
            dispatch(resetState());
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

    const handleGamesEditButtonClick = useCallback((gameID: Parameters<typeof setEditableGameID>[0]) => {
        dispatch(setEditableGameID(gameID));
    }, []);

    const handleDeleteGamesButtonClick = useCallback((gamesID: string[]) => {
        const IsConfirmed = confirm('Вы уверены?');
        if (IsConfirmed) {
            dispatch(deleteGamesThunk(gamesID));
        }
    }, []);

    const handleExport = useCallback(() => {
        const DataString = JSON.stringify(
            GamesData.map(GameInfo => ({
                title: GameInfo.title,
                genre: GameInfo.genre,
                description: GameInfo.description,
                tools: GameInfo.tools,
                archive: GameInfo.archive,
                screenshot: GameInfo.screenshot,
            })),
            null,
            '  '
        );

        const NewWindow = window.open('about:blank', 'games', 'width=600,height=600');

        if (NewWindow) {
            NewWindow.document.body.innerHTML = renderToString(
                <textarea
                    style={{
                        width: 550,
                        height: 550,
                        resize: 'none',
                    }}
                    defaultValue={DataString}
                />
            );
        }
    }, [GamesData]);

    return (
        <>
            <GamesPage
                {...{ ContestsData, GamesData, IsDataPending, GamesCount }}
                {...{ SelectedContest, handleSelectedContestChange }}
                {...{ StageFilterValue, handleGamesStageFilterChange }}
                {...{ handleGamesEditButtonClick, handleDeleteGamesButtonClick }}
                {...{ handleExport }}
            />
            {EditableGameID !== '' ? <EditGameInfoModal /> : null}
        </>
    );
};

export default GamesPageContainer;
