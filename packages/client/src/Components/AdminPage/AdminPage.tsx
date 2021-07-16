import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import * as ROUTES from '../App/routes';

import './AdminPage.scss';

const AdminPage: React.FC = () => {
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
                    <Route path={ROUTES.ADMIN_PAGE_GAMES_ROUTE} />

                    <Route path={ROUTES.ADMIN_PAGE_STREAMS_ROUTE} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminPage;
