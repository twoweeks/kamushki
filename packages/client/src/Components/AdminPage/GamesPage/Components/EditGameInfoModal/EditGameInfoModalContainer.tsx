import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { editGameInfoThunk } from '../../GamesPageReduxSlice';
import { resetEditableGameID } from '../../GamesPageReduxSlice';

import { getEditableGameInfo } from '../../GamesPageReduxSelectors';

import EditGameInfoModal from './EditGameInfoModal';

const EditGameInfoModalContainer: React.FC = () => {
    const EditableGameInfo = useSelector(getEditableGameInfo);

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
        dispatch(resetEditableGameID());
    }, []);

    const handleFormData = useCallback((data: Parameters<typeof editGameInfoThunk>[0]) => {
        dispatch(editGameInfoThunk(data));
    }, []);

    return EditableGameInfo && IsVisible && NodeRef.current
        ? createPortal(<EditGameInfoModal {...{ EditableGameInfo }} {...{ handleFormData }} {...{ handleModalClose }} />, NodeRef.current)
        : null;
};

export default EditGameInfoModalContainer;
