import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '../routes';

const SendPage = React.lazy(() => import('../../SendPage/Components/SendPageContainer'));
const AdminLogin = React.lazy(() => import('../../AdminLogin/Components/AdminLoginContainer'));
const AdminPageWrapper = React.lazy(() => import('../../AdminPageWrapper/Components/AdminPageWrapperContainer'));

const App: React.FC = () => {
    return (
        <Routes>
            <Route
                path={ROUTES.SEND_PAGE_ROUTE}
                element={
                    <React.Suspense fallback="Загрузка...">
                        <SendPage />
                    </React.Suspense>
                }
            />

            <Route
                path={ROUTES.ADMIN_LOGIN_ROUTE}
                element={
                    <React.Suspense fallback="Загрузка...">
                        <AdminLogin />
                    </React.Suspense>
                }
            />

            <Route path={ROUTES.ADMIN_PAGE_ROUTE}>
                <Navigate to={ROUTES.ADMIN_PAGE_DEFAULT_ROUTE} />
            </Route>

            <Route
                path={`${ROUTES.ADMIN_PAGE_ROUTE}/*`}
                element={
                    <React.Suspense fallback="Загрузка...">
                        <AdminPageWrapper />
                    </React.Suspense>
                }
            />
        </Routes>
    );
};

export default App;
