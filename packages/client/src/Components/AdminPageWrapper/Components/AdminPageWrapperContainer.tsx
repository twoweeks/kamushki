import React from 'react';
import { compose } from '@reduxjs/toolkit';

import withAuthRedirect from '../../../HOC/withAuthRedirect';

import AdminPageWrapper from './AdminPageWrapper';

const AdminPageWrapperContainer: React.FC = props => {
    return <AdminPageWrapper />;
};

export default compose<typeof AdminPageWrapperContainer>(withAuthRedirect)(AdminPageWrapperContainer);
