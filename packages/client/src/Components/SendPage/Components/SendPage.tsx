import React, { useState, useCallback } from 'react';
import { ReCaptchaV2 as ReCaptcha, EReCaptchaV2Size } from 'react-recaptcha-x';

import CONFIG from '../../../config';

import type { SendFormQueryParamsType } from '../../../api/types/sendFormTypes';
import type { SendPageStateType } from '../SendPageTypes';

import TextInput from '../../common/TextInput';
import CheckboxInput from '../../common/CheckboxInput';
import Link from '../../common/Link';

import './SendPage.scss';

type PropsType = Pick<SendPageStateType, 'FormStatus' | 'IsFormStatusPending'> & {
    formDataHandler: (data: SendFormQueryParamsType) => void;
};

const SendPage: React.FC<PropsType> = props => {
    const { FormStatus, IsFormStatusPending } = props;
    const { formDataHandler } = props;

    const [ReCaptchaToken, setReCaptchaToken] = useState<string>('');

    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const SendFormData = Object.fromEntries(new FormData(event.target as HTMLFormElement)) as SendFormQueryParamsType & { ready?: 'on' | 'off' };

        if (!SendFormData.ready || SendFormData.ready !== 'on') {
            alert('Не прочтён регламент конкурса');
            return;
        }

        // удаляем лишние поля (мало ли)

        const NeededFields: (keyof SendFormQueryParamsType)[] = [
            'title',
            'email',
            'genre',
            'description',
            'tools',
            'archive',
            'screenshot',
            'captcha',
        ];

        Object.keys(SendFormData).forEach(_key => {
            const key = _key as keyof SendFormQueryParamsType;
            if (!NeededFields.includes(key)) {
                delete SendFormData[key];
            }
        });

        if (!SendFormData.captcha) {
            alert('Не пройдена капча');
            return;
        }

        if (!SendFormData.title || !SendFormData.email || !SendFormData.archive || !SendFormData.screenshot || !SendFormData.captcha) {
            alert('Не заполнены обязательные поля');
            return;
        }

        formDataHandler(SendFormData);
    }, []);

    if (IsFormStatusPending) {
        return (
            <div className="sendPage">
                <div className="sendPage__text">загрузка...</div>
            </div>
        );
    }

    if (FormStatus === 'closed') {
        return (
            <div className="sendPage">
                <div className="sendPage__text">Форма закрыта</div>
            </div>
        );
    }

    if (!FormStatus) {
        return (
            <div className="sendPage">
                <div className="sendPage__text">Не удалось соединиться с сервером</div>
            </div>
        );
    }

    return (
        <div className="sendPage">
            <form className="sendPage__form" onSubmit={formSubmitHandler}>
                <TextInput
                    required
                    className="sendPage__input"
                    id="title"
                    type="text"
                    label="Название игры"
                    placeholder="Ограбитель караванов 4"
                    extraText="Максимум 100 символов"
                    maxLength={100}
                />

                <TextInput
                    required
                    className="sendPage__input"
                    id="email"
                    type="email"
                    label="Почта"
                    placeholder="kirillsupergamedev@yandex.ru"
                    extraText="Укажите почту, через которую с вами можно будет связаться. Максимум 50 символов"
                    maxLength={50}
                />

                <TextInput
                    className="sendPage__input"
                    id="description"
                    type="text"
                    label="Жанр"
                    placeholder="Адвенчура"
                    extraText="Максимум 50 символов"
                    maxLength={50}
                />

                <TextInput
                    className="sendPage__input"
                    id="genre"
                    type="textarea"
                    label="Описание игры"
                    placeholder="Пользователь может играть лесными эльфами, охраной дворца и злодеем. И если пользователь играет эльфами то эльфы в лесу, домики деревяные набигают солдаты дворца и злодеи. Можно грабить корованы..."
                    extraText="Максимум 200 символов, без переносов на новую строку"
                    maxLength={200}
                    inputStyle={{ height: 100 }}
                />

                <TextInput
                    className="sendPage__input"
                    id="tools"
                    type="textarea"
                    label="Инструменты"
                    placeholder="Unity, Blender, Paint"
                    extraText="Максимум 100 символов, без переносов на новую строку"
                    maxLength={100}
                />

                <TextInput
                    required
                    className="sendPage__input"
                    id="archive"
                    type="url"
                    label="Архив с игрой"
                    placeholder="https://yadi.sk"
                    extraText="Рекомендуется использовать Яндекс.Диск, Google Drive или Microsoft OneDrive. Максимум 100 символов"
                    maxLength={100}
                />

                <TextInput
                    required
                    className="sendPage__input"
                    id="screenshot"
                    type="url"
                    label="Скриншот/логотип игры"
                    placeholder="https://i.imgur.com"
                    extraText="Рекомендуется использовать Imgur или VK. Максимум 100 символов"
                    maxLength={100}
                />

                <CheckboxInput
                    required
                    className="sendPage__input"
                    id="ready"
                    label={
                        <>
                            Я прочитал(а/о) <Link href={CONFIG.links.rules}>регламент</Link> и готов(а/о) отправить игру
                        </>
                    }
                />

                <div className="sendPage__captchaInput">
                    <ReCaptcha
                        size={EReCaptchaV2Size.Normal}
                        callback={token => {
                            setReCaptchaToken(typeof token === 'string' ? token : '');
                        }}
                    />

                    <input type="text" id="captcha" name="captcha" value={ReCaptchaToken} readOnly hidden />
                </div>

                <div className="sendPage__submitButton">
                    <button type="submit" disabled={ReCaptchaToken === ''}>
                        Отправить игру
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendPage;
