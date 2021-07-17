import React, { useRef, useCallback } from 'react';

import type { EditGameInfoQueryParamsType } from '../../../../../api/types/gamesTypes';
import type { AdminGamesPageStateType } from '../../GamesPageTypes';

import { TextInput } from '../../../../common';

import './EditGameInfoModal.scss';

type PropsType = {
    EditableGameInfo: AdminGamesPageStateType['Data']['GamesData'][0];
    handleFormData: (data: EditGameInfoQueryParamsType) => void;
    handleModalClose: () => void;
};

const EditGameInfoModal: React.FC<PropsType> = props => {
    const { EditableGameInfo } = props;
    const { handleFormData } = props;
    const { handleModalClose } = props;

    const BaseClassName = useRef('adminGamesPage__editGameInfoModal');
    const BaseInputClassName = useRef(`${BaseClassName.current}__input`);

    const formSubmitHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const SendFormData = Object.fromEntries(new FormData(event.target as HTMLFormElement)) as EditGameInfoQueryParamsType;

            if (!SendFormData.title || !SendFormData.email || !SendFormData.archive || !SendFormData.screenshot) {
                alert('Не заполнены обязательные поля');
                return;
            }

            console.log(SendFormData);

            handleFormData(SendFormData);
        },
        [handleFormData]
    );

    return (
        <div className={`modal__content ${BaseClassName.current}`}>
            <form onSubmit={formSubmitHandler}>
                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="title"
                    label="Название игры"
                    defaultValue={EditableGameInfo.title}
                    extraText="Максимум 100 символов"
                    maxLength={100}
                />

                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="email"
                    type="email"
                    label="Почта"
                    defaultValue={EditableGameInfo.email}
                    extraText="Максимум 50 символов"
                    maxLength={50}
                />

                <TextInput
                    readOnly
                    className={BaseInputClassName.current}
                    id="date"
                    type="text"
                    label="Дата отправки"
                    defaultValue={EditableGameInfo.date}
                    extraText="Не редактируется, для информации"
                    maxLength={50}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="description"
                    type="text"
                    label="Жанр"
                    defaultValue={EditableGameInfo.genre}
                    extraText="Максимум 50 символов"
                    maxLength={50}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="genre"
                    type="textarea"
                    label="Описание игры"
                    defaultValue={EditableGameInfo.description}
                    extraText="Максимум 200 символов, без переносов на новую строку"
                    maxLength={200}
                    inputStyle={{ height: 100 }}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="tools"
                    type="textarea"
                    label="Инструменты"
                    defaultValue={EditableGameInfo.tools}
                    extraText="Максимум 100 символов, без переносов на новую строку"
                    maxLength={100}
                />

                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="archive"
                    type="url"
                    label="Архив с игрой"
                    defaultValue={EditableGameInfo.archive}
                    extraText="Максимум 100 символов"
                    maxLength={100}
                />

                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="screenshot"
                    type="url"
                    label="Скриншот/логотип игры"
                    defaultValue={EditableGameInfo.screenshot}
                    extraText="Максимум 100 символов"
                    maxLength={100}
                />

                <input id="_id" name="_id" value={EditableGameInfo._id} readOnly hidden />

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
    );
};

export default EditGameInfoModal;
