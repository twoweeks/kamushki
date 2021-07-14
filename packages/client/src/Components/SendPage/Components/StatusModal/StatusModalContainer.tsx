import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetSendedGameStatus } from '../../SendPageReduxSlice';

import { getSendedGameStatus } from '../../SendPageReduxSelectors';

import StatusModal from './StatusModal';

const StatusModalContainer: React.FC = () => {
    const SendedGameStatus = useSelector(getSendedGameStatus);

    const dispatch = useDispatch();

    const NodeRef = useRef<HTMLElement>();

    const [IsVisible, setIsVisible] = useState(false);

    useEffect(() => {
        NodeRef.current = document.createElement('div');

        NodeRef.current.classList.add('sendPage__statusModal__container');

        document.body.appendChild(NodeRef.current);

        setIsVisible(true);

        return () => {
            if (NodeRef.current) {
                NodeRef.current?.remove();
            }
        };
    }, []);

    const handleModalClose = useCallback(() => {
        dispatch(resetSendedGameStatus());
    }, []);

    return IsVisible && NodeRef.current ? createPortal(<StatusModal {...{ SendedGameStatus }} {...{ handleModalClose }} />, NodeRef.current) : null;
};

export default StatusModalContainer;
