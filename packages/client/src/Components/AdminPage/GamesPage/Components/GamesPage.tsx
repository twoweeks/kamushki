import React, { useState, useCallback, useEffect } from 'react';

import type { DeleteEntriesQueryParamsType } from '../../../../api/services/gamesService/types';
import type { AdminGamesPageStateType, GamesCountObjectType } from '../GamesPageTypes';

import { Link } from '../../../common';

import './GamesPage.scss';

type PropsType = Pick<AdminGamesPageStateType['Data'], 'ContestsData' | 'EntriesData'> & {
    IsDataPending: boolean;
    EntriesCount: GamesCountObjectType;
    SelectedContest: number;
    StageFilterValue: AdminGamesPageStateType['Filters']['Stage'];
    handleSelectedContestChange: (consestNum: number) => void;
    handleGamesStageFilterChange: (stage: AdminGamesPageStateType['Filters']['Stage']) => void;
    handleGamesEditButtonClick: (entryID: AdminGamesPageStateType['EditableEntryID']) => void;
    handleDeleteGamesButtonClick: (entriesID: DeleteEntriesQueryParamsType) => void;
    handleExport: () => void;
};

const GamesPage: React.FC<PropsType> = props => {
    const { EntriesData, ContestsData, IsDataPending, EntriesCount } = props;
    const { SelectedContest, handleSelectedContestChange } = props;
    const { StageFilterValue, handleGamesStageFilterChange } = props;
    const { handleGamesEditButtonClick, handleDeleteGamesButtonClick } = props;
    const { handleExport } = props;

    const [RemovableGamesList, setRemovableGamesList] = useState<string[]>([]);

    const hadleGameCheckboxClick = useCallback(
        (entryID: string) => {
            let removableGamesListCopy = [...RemovableGamesList];

            if (removableGamesListCopy.includes(entryID)) {
                removableGamesListCopy = removableGamesListCopy.filter(GameID => GameID !== entryID);
            } else {
                removableGamesListCopy.push(entryID);
            }

            setRemovableGamesList(removableGamesListCopy);
        },
        [handleDeleteGamesButtonClick, RemovableGamesList]
    );

    useEffect(() => {
        setRemovableGamesList([]);
    }, [EntriesData]);

    const parseLink = useCallback((linkHref: string, linkText: string) => {
        let text = <></>;

        try {
            const LinkURL = new URL(linkHref);

            text = (
                <>
                    <Link href={linkHref}>{linkText}</Link> <span title={linkHref}>({LinkURL.hostname})</span>
                </>
            );
        } catch (e) {
            text = (
                <span style={{ color: 'red' }} title={linkHref}>
                    !!! {linkText} !!!
                </span>
            );
        }

        return text;
    }, []);

    const parseEmail = useCallback((emailText: string) => {
        const EmailTextSplitted = emailText.split('@');

        return EmailTextSplitted.length === 2 ? (
            <>
                <span>{EmailTextSplitted[0]}</span>@{EmailTextSplitted[1]}
            </>
        ) : (
            <span style={{ color: 'red' }} title={emailText}>
                !!! error !!!
            </span>
        );
    }, []);

    const parseDate = useCallback((dateText: string) => {
        return new Date(dateText).toLocaleDateString('ru', { hour: 'numeric', minute: 'numeric' });
    }, []);

    const commonFormSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    const getColumnClassName = useCallback((columnName: string) => {
        return `adminGamesPage__table__column${columnName ? ` adminGamesPage__table__column--${columnName}` : ''}`;
    }, []);

    return (
        <div className="adminGamesPage">
            <div className="adminGamesPage__filters">
                <form onSubmit={commonFormSubmitHandler}>
                    <label htmlFor="contest_filter">??? ????????????????</label>
                    <select
                        style={{ marginLeft: '.25em' }}
                        id="contest_filter"
                        value={SelectedContest}
                        onChange={event => handleSelectedContestChange(Number(event.target.value))}>
                        {ContestsData.map(contestNum => (
                            <option key={contestNum} value={contestNum}>
                                {contestNum}
                            </option>
                        ))}
                    </select>
                </form>
                <form onSubmit={commonFormSubmitHandler}>
                    <label htmlFor="stage_filter">????????????????</label>
                    <select
                        style={{ marginLeft: '.25em' }}
                        id="stage_filter"
                        value={StageFilterValue}
                        onChange={event => handleGamesStageFilterChange(event.target.value as typeof StageFilterValue)}>
                        <option value="all">?????? ???????? ({EntriesCount.all})</option>
                        <option value="demo">???????????? ???????????????????? ({EntriesCount.demo})</option>
                        <option value="final">???????????? ?????????????????? ???????????? ({EntriesCount.final})</option>
                    </select>
                </form>
                <form onSubmit={commonFormSubmitHandler}>
                    <button style={{ padding: '2.5px 5px' }} onClick={() => handleDeleteGamesButtonClick(RemovableGamesList)}>
                        ???????????????? ???????????????? ??????{RemovableGamesList.length !== 0 ? ` (${RemovableGamesList.length})` : ''}
                    </button>

                    <button style={{ padding: '2.5px 5px', marginLeft: 10 }} onClick={handleExport}>
                        ?????????????? ?????????????? ????????????
                    </button>
                </form>
            </div>
            <table className="adminGamesPage__table">
                <thead>
                    <tr>
                        <th className={getColumnClassName('checkbox')}></th>
                        <th>????????????????</th>
                        <th className={getColumnClassName('email')}>?????????? ??????????????????</th>
                        <th>????????????</th>
                        <th>????????</th>
                        <th>????????????</th>
                        <th>??????????????????????</th>
                        <th>????????????</th>
                        <th className={getColumnClassName('options')}>??????????</th>
                    </tr>
                </thead>
                <tbody>
                    {EntriesData.map(EntryData => (
                        <tr key={EntryData._id}>
                            <td className={getColumnClassName('checkbox')}>
                                <form onSubmit={commonFormSubmitHandler}>
                                    <label htmlFor="delete" hidden>
                                        ???????????????? ???????? <q>{EntryData.gameInfo.title}</q> ???? ???????????????? ????????????????
                                    </label>
                                    <input
                                        id="delete"
                                        type="checkbox"
                                        checked={RemovableGamesList.includes(EntryData._id)}
                                        onChange={() => hadleGameCheckboxClick(EntryData._id)}
                                    />
                                </form>
                            </td>
                            <td>{EntryData.gameInfo.title}</td>
                            <td className={getColumnClassName('email')}>{parseEmail(EntryData.email)}</td>
                            <td>{EntryData.stage}</td>
                            <td>{parseDate(EntryData.date)}</td>
                            <td>
                                ????????: {EntryData.gameInfo.genre}
                                <br />
                                ????????????????: {EntryData.gameInfo.description}
                                <br />
                                ??????????????????????: {EntryData.gameInfo.tools}
                            </td>
                            <td>{EntryData.comment}</td>
                            <td>
                                {parseLink(EntryData.gameInfo.archive, '??????????')}
                                <br />
                                {parseLink(EntryData.gameInfo.screenshot, '????????????????')}
                            </td>
                            <td className={getColumnClassName('options')}>
                                <form onSubmit={commonFormSubmitHandler} className="adminGamesPage__options">
                                    <button onClick={() => handleGamesEditButtonClick(EntryData._id)} title="?????????????????????????????? ???????????????????? ???? ????????">
                                        ????
                                    </button>
                                    <button onClick={() => handleDeleteGamesButtonClick([EntryData._id])} title="?????????????? ????????">
                                        ???????
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}

                    {IsDataPending ? (
                        <tr>
                            <td colSpan={9}>????????????????...</td>
                        </tr>
                    ) : null}

                    {!IsDataPending && EntriesData.length === 0 ? (
                        <tr>
                            <td colSpan={9}>?????? ?????? :(</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default GamesPage;
