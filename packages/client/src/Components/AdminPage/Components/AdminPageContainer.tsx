import React from 'react';
import { compose } from '@reduxjs/toolkit';

import withAuthRedirect from '../../../HOC/withAuthRedirect';

import AdminPage from './AdminPage';

const AdminPageContainer: React.FC = props => {
    return <AdminPage />;
};

export default compose<typeof AdminPageContainer>(withAuthRedirect)(AdminPageContainer);
