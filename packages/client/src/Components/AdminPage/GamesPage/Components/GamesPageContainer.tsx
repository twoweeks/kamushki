import React, { useState, useEffect, useCallback } from 'react';
import { renderToString } from 'react-dom/server';

import { useSelector, useDispatch } from 'react-redux';

import { getContestsThunk, getEntriesThunk, deleteEntriesThunk } from '../GamesPageReduxSlice';
import { setStageFIlter, setEditableEntryID, resetState } from '../GamesPageReduxSlice';

import { getContestsData, getFiltredEntriesData, getStageFilterValue } from '../GamesPageReduxSelectors';
import { getEntriesCount, getIsDataPending, getEditableEntryID } from '../GamesPageReduxSelectors';

import GamesPage from './GamesPage';
import EditGameInfoModal from './EditGameInfoModal/EditGameInfoModalContainer';

const GamesPageContainer: React.FC = () => {
    const ContestsData = useSelector(getContestsData);
    const EntriesData = useSelector(getFiltredEntriesData);
    const IsDataPending = useSelector(getIsDataPending);
    const EntriesCount = useSelector(getEntriesCount);
    const StageFilterValue = useSelector(getStageFilterValue);
    const EditableEntryID = useSelector(getEditableEntryID);

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
            dispatch(getEntriesThunk({ contest: SelectedContest }));
        }
    }, [SelectedContest]);

    const handleSelectedContestChange = useCallback((contestNum: number) => {
        setSelectedContest(contestNum);
    }, []);

    const handleGamesStageFilterChange = useCallback((stage: Parameters<typeof setStageFIlter>[0]) => {
        dispatch(setStageFIlter(stage));
    }, []);

    const handleGamesEditButtonClick = useCallback((entryID: Parameters<typeof setEditableEntryID>[0]) => {
        dispatch(setEditableEntryID(entryID));
    }, []);

    const handleDeleteGamesButtonClick = useCallback((entriesED: string[]) => {
        const IsConfirmed = confirm('Вы уверены?');
        if (IsConfirmed) {
            dispatch(deleteEntriesThunk(entriesED));
        }
    }, []);

    const handleExport = useCallback(() => {
        const DataString = JSON.stringify(
            [...EntriesData].sort((a, b) => +new Date(a.date) - +new Date(b.date)).map(EntryData => EntryData.gameInfo),
            null,
            '  '
        );

        const NewWindow = window.open('about:blank', 'games', 'width=600,height=600');

        if (NewWindow) {
            NewWindow.document.body.innerHTML = renderToString(
                <textarea
                    style={{
                        width: '100%',
                        height: '100%',
                        resize: 'none',
                    }}
                    defaultValue={DataString}
                />
            );
        }
    }, [EntriesData]);

    return (
        <>
            <GamesPage
                {...{ ContestsData, EntriesData, IsDataPending, EntriesCount }}
                {...{ SelectedContest, handleSelectedContestChange }}
                {...{ StageFilterValue, handleGamesStageFilterChange }}
                {...{ handleGamesEditButtonClick, handleDeleteGamesButtonClick }}
                {...{ handleExport }}
            />
            {EditableEntryID !== '' ? <EditGameInfoModal /> : null}
        </>
    );
};

export default GamesPageContainer;
