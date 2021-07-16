import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const SendPage = React.lazy(() => import('../../SendPage/Components/SendPageContainer'));
const AdminLogin = React.lazy(() => import('../../AdminLogin/Components/AdminLoginContainer'));
const AdminPage = React.lazy(() => import('../../AdminPage/Components/AdminPageContainer'));

const App: React.FC = () => {
    const { pathname: LocationPathname } = useLocation();

    if (!['send', 'admin', 'adminlogin'].includes(LocationPathname.substr(1))) {
        return <Navigate to="/send" />;
    }

    return (
        <Routes>
            <Route path="/send">
                <React.Suspense fallback="Загрузка...">
                    <SendPage />
                </React.Suspense>
            </Route>
            <Route path="/adminlogin">
                <React.Suspense fallback="Загрузка...">
                    <AdminLogin />
                </React.Suspense>
            </Route>
            <Route path="/admin">
                <React.Suspense fallback="Загрузка...">
                    <AdminPage />
                </React.Suspense>
            </Route>
        </Routes>
    );
};

export default App;
