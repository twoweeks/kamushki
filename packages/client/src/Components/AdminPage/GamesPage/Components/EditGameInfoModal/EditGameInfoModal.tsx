import React, { useRef, useCallback } from 'react';

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

    const formSubmitHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const SendFormData = Object.fromEntries(new FormData(event.target as HTMLFormElement)) as EditEntryInfoQueryParamsType['gameInfo'] & {
                _id: EditEntryInfoQueryParamsType['_id'];
                email: EditEntryInfoQueryParamsType['email'];
                comment: EditEntryInfoQueryParamsType['comment'];
            };

            if (!SendFormData.title || !SendFormData.email || !SendFormData.archive || !SendFormData.screenshot) {
                alert('Не заполнены обязательные поля');
                return;
            }

            handleFormData({
                _id: SendFormData._id,
                email: SendFormData.email,
                gameInfo: {
                    title: SendFormData.title,
                    genre: SendFormData.genre,
                    description: SendFormData.description,
                    tools: SendFormData.tools,
                    archive: SendFormData.archive,
                    screenshot: SendFormData.screenshot,
                },
                comment: SendFormData.comment,
            });

            handleModalClose();
        },
        [handleFormData]
    );

    return (
        <>
            <div className="modal__backdrop" onClick={handleModalClose} />
            <div className={`modal__content ${BaseClassName.current}`}>
                <form onSubmit={formSubmitHandler}>
                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="title"
                        label="Название игры"
                        defaultValue={EditableEntryData.gameInfo.title}
                        extraText="Максимум 100 символов"
                        maxLength={100}
                    />

                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="email"
                        type="email"
                        label="Почта"
                        defaultValue={EditableEntryData.email}
                        extraText="Максимум 50 символов"
                        maxLength={50}
                    />

                    <TextInput
                        readOnly
                        className={BaseInputClassName.current}
                        id="date"
                        type="text"
                        label="Дата отправки"
                        defaultValue={EditableEntryData.date}
                        extraText="Не редактируется, для информации"
                        maxLength={50}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="genre"
                        type="text"
                        label="Жанр"
                        defaultValue={EditableEntryData.gameInfo.genre}
                        extraText="Максимум 50 символов"
                        maxLength={50}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="description"
                        type="textarea"
                        label="Описание игры"
                        defaultValue={EditableEntryData.gameInfo.description}
                        extraText="Максимум 200 символов, без переносов на новую строку"
                        maxLength={200}
                        inputStyle={{ height: 100 }}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="tools"
                        type="textarea"
                        label="Инструменты"
                        defaultValue={EditableEntryData.gameInfo.tools}
                        extraText="Максимум 100 символов, без переносов на новую строку"
                        maxLength={100}
                    />

                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="archive"
                        type="url"
                        label="Архив с игрой"
                        defaultValue={EditableEntryData.gameInfo.archive}
                        extraText="Максимум 100 символов"
                        maxLength={100}
                    />

                    <TextInput
                        required
                        className={BaseInputClassName.current}
                        id="screenshot"
                        type="url"
                        label="Скриншот/логотип игры"
                        defaultValue={EditableEntryData.gameInfo.screenshot}
                        extraText="Максимум 100 символов"
                        maxLength={100}
                    />

                    <TextInput
                        className={BaseInputClassName.current}
                        id="comment"
                        type="textarea"
                        label="Комментарий для организатора"
                        defaultValue={EditableEntryData.comment}
                        extraText="Максимум 200 символов, без переносов на новую строку"
                        maxLength={200}
                        inputStyle={{ height: 100 }}
                    />

                    <TextInput id="_id" value={EditableEntryData._id} readOnly hidden required />

                    <div className={`${BaseClassName.current}__button`}>
                        <button type="submit">Сохранить изменения</button>
                    </div>

                    <div className={`${BaseClassName.current}__button`}>
                        <button type="reset" onClick={handleModalClose}>
                            Закрыть без сохранения изменений
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditGameInfoModal;
