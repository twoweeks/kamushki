import React, { useState, useCallback } from 'react';

import type { DeleteGamesQueryParamsType } from '../../../../api/types/gamesTypes';
import type { AdminGamesPageStateType, GamesCountObjectType } from '../GamesPageTypes';

import { Link } from '../../../common';

import './GamesPage.scss';

type PropsType = Pick<AdminGamesPageStateType['Data'], 'ContestsData' | 'GamesData'> & {
    IsDataPending: boolean;
    GamesCount: GamesCountObjectType;
    SelectedContest: number;
    StageFilterValue: AdminGamesPageStateType['Filters']['Stage'];
    handleSelectedContestChange: (consestNum: number) => void;
    handleGamesStageFilterChange: (stage: AdminGamesPageStateType['Filters']['Stage']) => void;
    handleGamesEditButtonClick: (gameID: AdminGamesPageStateType['EditableGameID']) => void;
    handleDeleteGamesButtonClick: (gamesID: DeleteGamesQueryParamsType) => void;
    handleExport: () => void;
};

const GamesPage: React.FC<PropsType> = props => {
    const { GamesData, ContestsData, IsDataPending, GamesCount } = props;
    const { SelectedContest, handleSelectedContestChange } = props;
    const { StageFilterValue, handleGamesStageFilterChange } = props;
    const { handleGamesEditButtonClick, handleDeleteGamesButtonClick } = props;
    const { handleExport } = props;

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

                    <button style={{ padding: '2.5px 5px', marginLeft: 10 }} onClick={handleExport}>
                        Экспорт текущих данных
                    </button>
                </form>
            </div>
            <table className="adminGamesPage__table">
                <thead>
                    <tr>
                        <th className={getColumnClassName('checkbox')}></th>
                        <th>Название</th>
                        <th className={getColumnClassName('email')}>Почта автора</th>
                        <th>Стадия</th>
                        <th>Дата</th>
                        <th>Жанр</th>
                        <th>Описание</th>
                        <th>Инструменты</th>
                        <th>Ссылки</th>
                        <th className={getColumnClassName('options')}>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {GamesData.map(GameInfo => (
                        <tr key={GameInfo._id}>
                            <td className={getColumnClassName('checkbox')}>
                                <form onSubmit={commonFormSubmitHandler}>
                                    <label htmlFor="delete" hidden>
                                        Пометить игру <q>{GameInfo.title}</q> на массовое удаление
                                    </label>
                                    <input id="delete" type="checkbox" onChange={() => hadleGameCheckboxClick(GameInfo._id)} />
                                </form>
                            </td>
                            <td>{GameInfo.title}</td>
                            <td className={getColumnClassName('email')}>{parseEmail(GameInfo.email)}</td>
                            <td>{GameInfo.stage}</td>
                            <td>{parseDate(GameInfo.date)}</td>
                            <td>{GameInfo.genre}</td>
                            <td>{GameInfo.description}</td>
                            <td>{GameInfo.tools}</td>
                            <td>
                                {parseLink(GameInfo.archive, 'архив')}
                                <br />
                                {parseLink(GameInfo.screenshot, 'скриншот')}
                            </td>
                            <td className={getColumnClassName('options')}>
                                <form onSubmit={commonFormSubmitHandler} className="adminGamesPage__options">
                                    <button onClick={() => handleGamesEditButtonClick(GameInfo._id)} title="Отредактировать информацию об игре">
                                        📝
                                    </button>
                                    <button onClick={() => handleDeleteGamesButtonClick([GameInfo._id])} title="Удалить игру">
                                        🗑️
                                    </button>
                                </form>
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
