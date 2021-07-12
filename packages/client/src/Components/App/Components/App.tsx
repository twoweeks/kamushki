import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const SendPage = React.lazy(() => import('../../SendPage/Components/SendPageContainer'));

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/send">
                <React.Suspense fallback="Загрузка...">
                    <SendPage />
                </React.Suspense>
            </Route>
            <Route path="/admin">
                <>admin</>
            </Route>
            <Route>
                <Navigate to="/send" />
            </Route>
        </Routes>
    );
};

export default App;
