import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetSendedGameStatus } from '../../SendPageReduxSlice';

import { getSendedEntryStatus } from '../../SendPageReduxSelectors';

import StatusModal from './StatusModal';

const StatusModalContainer: React.FC = () => {
    const SendedEntryStatus = useSelector(getSendedEntryStatus);

    const dispatch = useDispatch();

    const NodeRef = useRef<HTMLElement>();

    const [IsVisible, setIsVisible] = useState(false);

    useEffect(() => {
        NodeRef.current = document.createElement('div');

        NodeRef.current.classList.add('modal__root');

        document.body.appendChild(NodeRef.current);

        document.body.dataset.modalView = '';

        setIsVisible(true);

        return () => {
            delete document.body.dataset.modalView;

            if (NodeRef.current) {
                NodeRef.current?.remove();
            }
        };
    }, []);

    const handleModalClose = useCallback(() => {
        dispatch(resetSendedGameStatus());
    }, []);

    return IsVisible && NodeRef.current ? createPortal(<StatusModal {...{ SendedEntryStatus }} {...{ handleModalClose }} />, NodeRef.current) : null;
};

export default StatusModalContainer;
