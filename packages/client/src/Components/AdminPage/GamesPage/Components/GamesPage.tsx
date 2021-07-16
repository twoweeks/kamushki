import React, { useState, useCallback } from 'react';

import type { AdminGamesPageStateType, GamesCountObjectType } from '../GamesPageTypes';

import Link from '../../../common/Link';

import './GamesPage.scss';

type PropsType = Pick<AdminGamesPageStateType['Data'], 'ContestsData' | 'GamesData'> & {
    IsDataPending: boolean;
    GamesCount: GamesCountObjectType;
    SelectedContest: number;
    StageFilterValue: AdminGamesPageStateType['Filters']['Stage'];
    handleSelectedContestChange: (consestNum: number) => void;
    handleGamesStageFilterChange: (stage: AdminGamesPageStateType['Filters']['Stage']) => void;
    handleDeleteGamesButtonClick: (gamesID: string[]) => void;
};

const GamesPage: React.FC<PropsType> = props => {
    const { GamesData, ContestsData, IsDataPending, GamesCount } = props;
    const { SelectedContest, handleSelectedContestChange } = props;
    const { StageFilterValue, handleGamesStageFilterChange } = props;
    const { handleDeleteGamesButtonClick } = props;

    const [RemovableGamesList, setRemovableGamesList] = useState<string[]>([]);

    const hadleGameCheckboxClick = useCallback(
        (gameID: string) => {
            let removableGamesListCopy = [...RemovableGamesList];

            if (removableGamesListCopy.includes(gameID)) {
                removableGamesListCopy = removableGamesListCopy.filter(GameID => GameID !== gameID);
            } else {
                removableGamesListCopy.push(gameID);
            }

            setRemovableGamesList(removableGamesListCopy);
        },
        [handleDeleteGamesButtonClick, RemovableGamesList]
    );

    console.log(RemovableGamesList);

    const parseLink = useCallback((linkText: string) => {
        let text = <></>;

        try {
            const LinkURL = new URL(linkText);

            text = (
                <>
                    <Link href={linkText}>ссылка</Link> ({LinkURL.hostname})
                </>
            );
        } catch (e) {
            text = (
                <span style={{ color: 'red' }} title={linkText}>
                    !!! wrong !!!
                </span>
            );
        }

        return text;
    }, []);

    const commonFormSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    return (
        <div className="adminGamesPage">
            <div className="adminGamesPage__filters">
                <form onSubmit={commonFormSubmitHandler}>
                    <label htmlFor="contest_filter">№ конкурса</label>
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
                    <label htmlFor="stage_filter">Показать</label>
                    <select
                        style={{ marginLeft: '.25em' }}
                        id="stage_filter"
                        value={StageFilterValue}
                        onChange={event => handleGamesStageFilterChange(event.target.value as typeof StageFilterValue)}>
                        <option value="all">все игры ({GamesCount.all})</option>
                        <option value="demo">только демоверсии ({GamesCount.demo})</option>
                        <option value="final">только финальные версии ({GamesCount.final})</option>
                    </select>
                </form>
                <form onSubmit={commonFormSubmitHandler}>
                    <button style={{ padding: '2.5px 5px' }} onClick={() => handleDeleteGamesButtonClick(RemovableGamesList)}>
                        Массовое удаление игр{RemovableGamesList.length !== 0 ? ` (${RemovableGamesList.length})` : ''}
                    </button>
                </form>
            </div>
            <table className="adminGamesPage__table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Название</th>
                        <th>Почта автора</th>
                        <th>Стадия</th>
                        <th>Дата</th>
                        <th>Описание</th>
                        <th>Инструменты</th>
                        <th>Cкриншот/логотип</th>
                        <th>Архив</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {GamesData.map(GameInfo => (
                        <tr key={GameInfo._id}>
                            <td>
                                <input type="checkbox" onChange={() => hadleGameCheckboxClick(GameInfo._id)} />
                            </td>
                            <td>{GameInfo.title}</td>
                            <td>{GameInfo.email}</td>
                            <td>{GameInfo.stage}</td>
                            <td>{GameInfo.date}</td>
                            <td>{GameInfo.description ?? '—'}</td>
                            <td>{GameInfo.genre ?? '—'}</td>
                            <td>{parseLink(GameInfo.screenshot)}</td>
                            <td>{parseLink(GameInfo.archive)}</td>
                            <td>
                                <button onClick={() => handleDeleteGamesButtonClick([GameInfo._id])}>🗑️</button>
                                <button>✍️</button>
                            </td>
                        </tr>
                    ))}

                    {IsDataPending ? (
                        <tr>
                            <td colSpan={10}>загрузка...</td>
                        </tr>
                    ) : null}

                    {!IsDataPending && GamesData.length === 0 ? (
                        <tr>
                            <td colSpan={10}>Игр нет :(</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default GamesPage;
