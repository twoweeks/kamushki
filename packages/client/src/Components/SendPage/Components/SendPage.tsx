import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { ReCaptchaV2 as ReCaptcha, EReCaptchaV2Size } from 'react-recaptcha-x';

import * as CONSTS from '@twoweeks/twg20-web-server/src/consts';

import CONFIG from '../../../config';

import type { SendEntryQueryParamsType } from '../../../api/services/sensFormService/types';
import type { SendPageStateType, FormDataStorageItemType } from '../SendPageTypes';

import { TextInput, CheckboxInput, Link } from '../../common';
import './SendPage.scss';

type PropsType = Pick<SendPageStateType, 'FormStatus' | 'IsFormStatusPending'> & {
    formDataHandler: (data: SendEntryQueryParamsType) => void;
    getFormDataStorageItemValue: (field: keyof FormDataStorageItemType['gameInfo']) => string;
};

const SendPage: React.FC<PropsType> = props => {
    const { FormStatus, IsFormStatusPending } = props;
    const { formDataHandler } = props;
    const { getFormDataStorageItemValue } = props;

    // why "ready" is an array in formik?
    // cause fcku u ¯\_(ツ)_/¯

    const FormInitialValues = useRef<SendEntryQueryParamsType & { ready?: ('on' | 'off')[] }>({
        email: '',
        comment: '',
        gameInfo: {
            title: getFormDataStorageItemValue('title'),
            genre: getFormDataStorageItemValue('genre'),
            description: getFormDataStorageItemValue('description'),
            tools: getFormDataStorageItemValue('tools'),
            archive: '',
            screenshot: '',
        },
        captcha: '',
        ready: ['off'],
    });

    const FormInstance = useFormik({
        initialValues: FormInitialValues.current,
        onSubmit: values => {
            if (!values.ready || (values.ready && values.ready.includes('off'))) {
                alert('Не прочтён регламент конкурса');
                return;
            }

            if (!values.captcha) {
                alert('Не пройдена капча');
                return;
            }

            if (!values.email || !values.gameInfo.title || !values.gameInfo.archive || !values.gameInfo.screenshot) {
                alert('Не заполнены обязательные поля');
                return;
            }

            delete values.ready;

            formDataHandler(values);
        },
    });

    const BaseClassName = useRef('sendPage');
    const BaseInputClassName = useRef(`${BaseClassName.current}__formItem`);

    if (IsFormStatusPending) {
        return (
            <div className={BaseClassName.current}>
                <div className={`${BaseClassName.current}__text`}>загрузка...</div>
            </div>
        );
    }

    if (FormStatus === 'closed') {
        return (
            <div className={BaseClassName.current}>
                <div className={`${BaseClassName.current}__text`}>Форма закрыта</div>
            </div>
        );
    }

    if (!FormStatus) {
        return (
            <div className={BaseClassName.current}>
                <div className={`${BaseClassName.current}__text`}>Не удалось соединиться с сервером</div>
            </div>
        );
    }

    return (
        <div className={BaseClassName.current}>
            <form className={`${BaseClassName.current}__form`} onSubmit={FormInstance.handleSubmit}>
                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="gameInfo.title"
                    label="Название игры"
                    value={FormInstance.values.gameInfo.title}
                    onChange={FormInstance.handleChange}
                    placeholder="Ограбитель караванов 4"
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
                    placeholder="kirillsupergamedev@yandex.ru"
                    extraText={`Укажите почту, через которую с вами можно будет связаться. Максимум ${CONSTS.ENTRY_EMAIL_MAX_LENGTH} символов`}
                    maxLength={CONSTS.ENTRY_EMAIL_MAX_LENGTH}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="gameInfo.genre"
                    label="Жанр"
                    value={FormInstance.values.gameInfo.genre}
                    onChange={FormInstance.handleChange}
                    placeholder="Адвенчура"
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
                    placeholder="Пользователь может играть лесными эльфами, охраной дворца и злодеем. И если пользователь играет эльфами то эльфы в лесу, домики деревяные набигают солдаты дворца и злодеи. Можно грабить корованы..."
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
                    placeholder="Unity, Blender, Paint"
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
                    placeholder="https://yadi.sk"
                    extraText={`Рекомендуется использовать Яндекс.Диск, Google Drive или Microsoft OneDrive. Максимум ${CONSTS.ENTRY_GAME_ARCHIVE_LINK_MAX_LENGTH} символов`}
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
                    placeholder="https://i.imgur.com"
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
                    placeholder="пыщь пыщь"
                    extraText={`Будет виден только организатору. Максимум ${CONSTS.ENTRY_COMMENT_MAX_LENGTH} символов, без переносов на новую строку`}
                    maxLength={CONSTS.ENTRY_COMMENT_MAX_LENGTH}
                    inputStyle={{ height: 100 }}
                />

                <CheckboxInput
                    required
                    className={BaseInputClassName.current}
                    value={FormInstance.values.ready}
                    onChange={FormInstance.handleChange}
                    id="ready"
                    label={
                        <>
                            Я прочитал(а/о) <Link href={CONFIG.links.rules}>регламент</Link> и готов(а/о) отправить игру
                        </>
                    }
                />

                <div className={`${BaseClassName.current}__captchaInput`}>
                    <ReCaptcha
                        size={EReCaptchaV2Size.Normal}
                        callback={token => {
                            FormInstance.setFieldValue('captcha', typeof token === 'string' ? token : '');
                        }}
                    />
                </div>

                <TextInput id="captcha" value={FormInstance.values.captcha} readOnly hidden required />

                <div className={`${BaseClassName.current}__submitButton`}>
                    <button
                        type="submit"
                        disabled={
                            FormInstance.values.captcha === '' ||
                            !FormInstance.values.ready ||
                            (FormInstance.values.ready && FormInstance.values.ready.includes('off'))
                        }>
                        Отправить игру
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendPage;
