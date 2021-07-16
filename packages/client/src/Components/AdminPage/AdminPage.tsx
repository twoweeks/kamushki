import React, { useCallback } from 'react';
import { compose } from '@reduxjs/toolkit';
import { Routes, Route, NavLink } from 'react-router-dom';

import withAuthRedirect from '../../HOC/withAuthRedirect';

import * as ROUTES from '../App/routes';

const GamesPage = React.lazy(() => import('./GamesPage/Components/GamesPageContainer'));

import './AdminPage.scss';

const AdminPage: React.FC = () => {
    const filterRoutePath = useCallback((routePath: string) => routePath.replace(ROUTES.ADMIN_PAGE_ROUTE, ''), []);

    return (
        <div className="adminPage">
            <header className="adminPage__header">
                <h1 className="adminPage__header__title">TWG Control Center</h1>
                <nav className="adminPage__header__navigaton">
                    <ul>
                        <li>
                            <NavLink to={ROUTES.ADMIN_PAGE_GAMES_ROUTE}>Игры</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.ADMIN_PAGE_STREAMS_ROUTE}>Стримы</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="adminPage__content">
                <Routes>
                    <Route
                        path={filterRoutePath(ROUTES.ADMIN_PAGE_GAMES_ROUTE)}
                        element={
                            <React.Suspense fallback="Загрузка...">
                                <GamesPage />
                            </React.Suspense>
                        }
                    />

                    <Route path={filterRoutePath(ROUTES.ADMIN_PAGE_STREAMS_ROUTE)} />
                </Routes>
            </main>
        </div>
    );
};

export default compose<typeof AdminPage>(withAuthRedirect)(AdminPage);
