import React from 'react';
import { compose } from '@reduxjs/toolkit';

import withAuthRedirect from '../../../../HOC/withAuthRedirect';

import Wrapper from './Wrapper';

const WrapperContainer: React.FC = () => {
    return <Wrapper />;
};

export default compose<typeof WrapperContainer>(withAuthRedirect)(WrapperContainer);
