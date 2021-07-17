import React, { useState, useCallback } from 'react';
import { ReCaptchaV2 as ReCaptcha, EReCaptchaV2Size } from 'react-recaptcha-x';

import type { LoginQueryParamsType } from '../../../api/types/authTypes';
import type { AdminLoginStateType } from '../AdminLoginTypes';

import { TextInput } from '../../common';

import './AdminLogin.scss';

type PropsType = Pick<AdminLoginStateType, 'IsLoginPending' | 'IsLogihError'> & {
    formDataHandler: (data: LoginQueryParamsType) => void;
};

const AdminLogin: React.FC<PropsType> = props => {
    const { IsLoginPending, IsLogihError } = props;
    const { formDataHandler } = props;

    const [ReCaptchaToken, setReCaptchaToken] = useState<string>('');

    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const SendFormData = Object.fromEntries(new FormData(event.target as HTMLFormElement)) as LoginQueryParamsType & {
            'g-recaptcha-response'?: string;
        };

        delete SendFormData['g-recaptcha-response'];

        if (!SendFormData.captcha) {
            alert('Не пройдена капча');
            return;
        }

        if (!SendFormData.auth_key) {
            alert('Пароль не введён');
            return;
        }

        formDataHandler(SendFormData);
    }, []);

    return (
        <div className="adminLogin">
            <h1>Авторизация</h1>

            <form className="adminLogin__form" onSubmit={formSubmitHandler}>
                <TextInput id="auth_key" type="password" className="adminLogin__input" label="Введите пароль" isLabelHidden required />

                <div className="adminLogin__captchaInput">
                    <ReCaptcha
                        size={EReCaptchaV2Size.Normal}
                        callback={token => {
                            setReCaptchaToken(typeof token === 'string' ? token : '');
                        }}
                    />

                    <input type="password" id="captcha" name="captcha" value={ReCaptchaToken} readOnly hidden />
                </div>

                <div className="adminLogin__submitButton">
                    <button type="submit" disabled={IsLoginPending}>
                        Войти
                    </button>
                </div>
            </form>

            {IsLogihError ? <div className="adminLogin__error">ошибка авторизации</div> : null}
        </div>
    );
};

export default AdminLogin;
