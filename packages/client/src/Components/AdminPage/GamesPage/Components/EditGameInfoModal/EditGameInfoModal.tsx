import React, { useRef } from 'react';
import { useFormik } from 'formik';

import * as CONSTS from '@twoweeks/twg20-web-server/src/consts';

import type { EditEntryInfoQueryParamsType } from '../../../../../api/services/gamesService/types';
import type { AdminGamesPageStateType } from '../../GamesPageTypes';

import { TextInput } from '../../../../common';

import './EditGameInfoModal.scss';

type PropsType = {
    EditableEntryData: AdminGamesPageStateType['Data']['EntriesData'][0];
    handleFormData: (data: EditEntryInfoQueryParamsType) => void;
    handleModalClose: () => void;
};

const EditGameInfoModal: React.FC<PropsType> = props => {
    const { EditableEntryData } = props;
    const { handleFormData } = props;
    const { handleModalClose } = props;

    const BaseClassName = useRef('adminGamesPage__editGameInfoModal');
    const BaseInputClassName = useRef(`${BaseClassName.current}__formItem`);

    const FormInitialValues = useRef<EditEntryInfoQueryParamsType & { date?: string }>({
        _id: EditableEntryData._id,
        email: EditableEntryData.email,
        date: EditableEntryData.date,
        gameInfo: EditableEntryData.gameInfo,
        comment: EditableEntryData.comment,
    });

    const FormInstance = useFormik({
        initialValues: FormInitialValues.current,
        onSubmit: values => {
            if (!values.email || !values.gameInfo.title || !values.gameInfo.archive || !values.gameInfo.screenshot) {
                alert('Не заполнены обязательные поля');
                return;
            }

            delete values.date;

            handleFormData(values);

            handleModalClose();
        },
        onReset: () => {
            handleModalClose();
        },
    });

    return (
        <>
            <div className="modal__backdrop" onClick={FormInstance.handleReset} />
            <div className={`modal__content ${BaseClassName.current}`}>
                <form onSubmit={FormInstance.handleSubmit} onReset={FormInstance.handleReset}>
                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="gameInfo.title"
                        label="Название игры"
                        value={FormInstance.values.gameInfo.title}
                        onChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_GAME_TITLE_MAX_LENGTH} символов`}
                        maxLength={CONSTS.ENTRY_GAME_TITLE_MAX_LENGTH}
                    />

                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="email"
                        type="email"
                        label="Почта"
                        value={FormInstance.values.email}
                        onChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_EMAIL_MAX_LENGTH} символов`}
                        maxLength={CONSTS.ENTRY_EMAIL_MAX_LENGTH}
                    />

                    <TextInput
                        readOnly
                        className={BaseInputClassName.current}
                        id="date"
                        type="text"
                        label="Дата отправки"
                        value={FormInstance.values.date}
                        onChange={FormInstance.handleChange}
                        extraText="Не редактируется, для информации"
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="gameInfo.genre"
                        type="text"
                        label="Жанр"
                        value={FormInstance.values.gameInfo.genre}
                        onChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_GAME_GENRE_MAX_LENGTH} символов`}
                        maxLength={CONSTS.ENTRY_GAME_GENRE_MAX_LENGTH}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="gameInfo.description"
                        type="textarea"
                        label="Описание игры"
                        value={FormInstance.values.gameInfo.description}
                        onTextareaChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_GAME_DESCRIPTION_MAX_LENGTH} символов, без переносов на новую строку`}
                        maxLength={CONSTS.ENTRY_GAME_DESCRIPTION_MAX_LENGTH}
                        inputStyle={{ height: 100 }}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="gameInfo.tools"
                        type="textarea"
                        label="Инструменты"
                        value={FormInstance.values.gameInfo.tools}
                        onTextareaChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_GAME_TOOLS_MAX_LENGTH} символов, без переносов на новую строку`}
                        maxLength={CONSTS.ENTRY_GAME_TOOLS_MAX_LENGTH}
                    />

                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="gameInfo.archive"
                        type="url"
                        label="Архив с игрой"
                        value={FormInstance.values.gameInfo.archive}
                        onChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_GAME_ARCHIVE_LINK_MAX_LENGTH} символов`}
                        maxLength={CONSTS.ENTRY_GAME_ARCHIVE_LINK_MAX_LENGTH}
                    />

                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="gameInfo.screenshot"
                        type="url"
                        label="Скриншот/логотип игры"
                        value={FormInstance.values.gameInfo.screenshot}
                        onChange={FormInstance.handleChange}
                        extraText={`Рекомендуется использовать Imgur или imgBB. Максимум ${CONSTS.ENTRY_GAME_SCREENSHOT_LINK_MAX_LENGTH} символов`}
                        maxLength={CONSTS.ENTRY_GAME_SCREENSHOT_LINK_MAX_LENGTH}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="comment"
                        type="textarea"
                        label="Комментарий для организатора"
                        value={FormInstance.values.comment}
                        onTextareaChange={FormInstance.handleChange}
                        extraText={`Максимум ${CONSTS.ENTRY_COMMENT_MAX_LENGTH} символов, без переносов на новую строку`}
                        maxLength={CONSTS.ENTRY_COMMENT_MAX_LENGTH}
                        inputStyle={{ height: 100 }}
                    />

                    <TextInput id="_id" value={FormInstance.values._id} readOnly hidden required />

                    <div className={`${BaseClassName.current}__button`}>
                        <button type="submit">Сохранить изменения</button>
                    </div>

                    <div className={`${BaseClassName.current}__button`}>
                        <button type="reset">Закрыть без сохранения изменений</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditGameInfoModal;
