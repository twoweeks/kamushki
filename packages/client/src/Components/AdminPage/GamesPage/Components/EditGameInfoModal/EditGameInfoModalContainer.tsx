import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { editEntryInfoThunk } from '../../GamesPageReduxSlice';
import { resetEditableEntryID } from '../../GamesPageReduxSlice';

import { getEditableEntryData } from '../../GamesPageReduxSelectors';

import EditGameInfoModal from './EditGameInfoModal';

const EditGameInfoModalContainer: React.FC = () => {
    const EditableEntryData = useSelector(getEditableEntryData);

    const dispatch = useDispatch();

    const NodeRef = useRef<HTMLElement>();

    const [IsVisible, setIsVisible] = useState(false);

    useEffect(() => {
        NodeRef.current = document.createElement('div');

        NodeRef.current.classList.add('modal');

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
        dispatch(resetEditableEntryID());
    }, []);

    const handleFormData = useCallback((data: Parameters<typeof editEntryInfoThunk>[0]) => {
        dispatch(editEntryInfoThunk(data));
    }, []);

    return EditableEntryData && IsVisible && NodeRef.current
        ? createPortal(<EditGameInfoModal {...{ EditableEntryData }} {...{ handleFormData }} {...{ handleModalClose }} />, NodeRef.current)
        : null;
};

export default EditGameInfoModalContainer;
