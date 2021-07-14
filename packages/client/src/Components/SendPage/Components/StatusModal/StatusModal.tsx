import React from 'react';

import { SendPageStateType } from '../../SendPageTypes';

import './StatusModal.scss';

type PropsType = Pick<SendPageStateType, 'SendedGameStatus'> & {
    handleModalClose: () => void;
};

const StatusModal: React.FC<PropsType> = props => {
    const { SendedGameStatus } = props;
    const { handleModalClose } = props;

    return (
        <div className="sendPage__statusModal__modal">
            {SendedGameStatus === 'success' ? (
                <>
                    <p>
                        <strong>Игра успешно отправлена</strong>
                    </p>
                    <p>Ура! 🤗</p>
                    <div className="sendPage__statusModal__modal__button">
                        <button onClick={handleModalClose}>закрыть</button>
                    </div>
                </>
            ) : null}

            {SendedGameStatus === 'wrong_captcha' ? (
                <>
                    <p>
                        <strong>Капча не пройдена</strong>
                    </p>
                    <p>Печаль! 😟</p>
                    <div className="sendPage__statusModal__modal__button">
                        <button onClick={handleModalClose}>попробовать снова</button>
                    </div>
                </>
            ) : null}

            {SendedGameStatus === 'wrong_data' ? (
                <>
                    <p>
                        <strong>Неправильные данные</strong>
                    </p>
                    <p>Если вы считаете, что всё заполнено верно, то напишите на почту организатору</p>
                    <div className="sendPage__statusModal__modal__button">
                        <button onClick={handleModalClose}>или попробуйте снова</button>
                    </div>
                </>
            ) : null}

            {SendedGameStatus === 'form_closed' ? (
                <>
                    <p>
                        <strong>Форма закрыта</strong>
                    </p>
                    <p>Напишите на почту организатору</p>
                </>
            ) : null}

            {SendedGameStatus === 'unknown' ? (
                <>
                    <p>
                        <strong>Неизвестная ошибка</strong>
                    </p>
                    <p>Если вы считаете, что всё заполнено верно, то напишите на почту организатору</p>
                    <div className="sendPage__statusModal__modal__button">
                        <button onClick={handleModalClose}>или попробуйте снова</button>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default StatusModal;
