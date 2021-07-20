import React, { useState, useRef, useCallback } from 'react';
import { ReCaptchaV2 as ReCaptcha, EReCaptchaV2Size } from 'react-recaptcha-x';

import CONFIG from '../../../config';

import type { SendFormQueryParamsType } from '../../../api/types/sendFormTypes';
import type { SendPageStateType, FormDataStorageItemType } from '../SendPageTypes';

import { TextInput, CheckboxInput, Link } from '../../common';
import './SendPage.scss';

type PropsType = Pick<SendPageStateType, 'FormStatus' | 'IsFormStatusPending'> & {
    formDataHandler: (data: SendFormQueryParamsType) => void;
    getFormDataStorageItemValue: (field: keyof FormDataStorageItemType) => string | undefined;
};

const SendPage: React.FC<PropsType> = props => {
    const { FormStatus, IsFormStatusPending } = props;
    const { formDataHandler } = props;
    const { getFormDataStorageItemValue } = props;

    const [ReCaptchaToken, setReCaptchaToken] = useState<string>('');

    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const _formData = new FormData(event.target as HTMLFormElement);
        const SendFormData = Object.fromEntries(_formData) as SendFormQueryParamsType['gameInfo'] & {
            captcha?: SendFormQueryParamsType['captcha'];
            ready?: 'on' | 'off';
        };

        if (!SendFormData.ready || SendFormData.ready !== 'on') {
            alert('Не прочтён регламент конкурса');
            return;
        }

        if (!SendFormData.captcha) {
            alert('Не пройдена капча');
            return;
        }

        const GameInfo = { ...SendFormData };

        // удаляем лишние поля (мало ли)

        const RequiredFields: (keyof SendFormQueryParamsType['gameInfo'])[] = [
            'title',
            'email',
            'genre',
            'description',
            'tools',
            'archive',
            'screenshot',
        ];

        Object.keys(GameInfo).forEach(_key => {
            const key = _key as keyof SendFormQueryParamsType['gameInfo'];
            if (!RequiredFields.includes(key)) delete GameInfo[key];
        });

        if (!GameInfo.title || !GameInfo.email || !GameInfo.archive || !GameInfo.screenshot) {
            alert('Не заполнены обязательные поля');
            return;
        }

        formDataHandler({ gameInfo: GameInfo, captcha: SendFormData.captcha });
    }, []);

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
            <form className={`${BaseClassName.current}__form`} onSubmit={formSubmitHandler}>
                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="title"
                    label="Название игры"
                    placeholder="Ограбитель караванов 4"
                    extraText="Максимум 100 символов"
                    defaultValue={getFormDataStorageItemValue('title')}
                    maxLength={100}
                />

                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="email"
                    type="email"
                    label="Почта"
                    placeholder="kirillsupergamedev@yandex.ru"
                    extraText="Укажите почту, через которую с вами можно будет связаться. Максимум 50 символов"
                    defaultValue={getFormDataStorageItemValue('email')}
                    maxLength={50}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="description"
                    label="Жанр"
                    placeholder="Адвенчура"
                    extraText="Максимум 50 символов"
                    defaultValue={getFormDataStorageItemValue('description')}
                    maxLength={50}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="genre"
                    type="textarea"
                    label="Описание игры"
                    placeholder="Пользователь может играть лесными эльфами, охраной дворца и злодеем. И если пользователь играет эльфами то эльфы в лесу, домики деревяные набигают солдаты дворца и злодеи. Можно грабить корованы..."
                    extraText="Максимум 200 символов, без переносов на новую строку"
                    defaultValue={getFormDataStorageItemValue('genre')}
                    maxLength={200}
                    inputStyle={{ height: 100 }}
                />

                <TextInput
                    className={BaseInputClassName.current}
                    id="tools"
                    type="textarea"
                    label="Инструменты"
                    placeholder="Unity, Blender, Paint"
                    extraText="Максимум 100 символов, без переносов на новую строку"
                    defaultValue={getFormDataStorageItemValue('tools')}
                    maxLength={100}
                />

                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="archive"
                    type="url"
                    label="Архив с игрой"
                    placeholder="https://yadi.sk"
                    extraText="Рекомендуется использовать Яндекс.Диск, Google Drive или Microsoft OneDrive. Максимум 100 символов"
                    maxLength={100}
                />

                <TextInput
                    required
                    className={BaseInputClassName.current}
                    id="screenshot"
                    type="url"
                    label="Скриншот/логотип игры"
                    placeholder="https://i.imgur.com"
                    extraText="Рекомендуется использовать Imgur или VK. Максимум 100 символов"
                    maxLength={100}
                />

                <CheckboxInput
                    required
                    className={BaseInputClassName.current}
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
                            setReCaptchaToken(typeof token === 'string' ? token : '');
                        }}
                    />
                </div>

                <TextInput id="captcha" value={ReCaptchaToken} readOnly hidden required />

                <div className={`${BaseClassName.current}__submitButton`}>
                    <button type="submit" disabled={ReCaptchaToken === ''}>
                        Отправить игру
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendPage;
