import React, { useRef } from 'react';

import { SendPageStateType } from '../../SendPageTypes';

import './StatusModal.scss';

type PropsType = Pick<SendPageStateType, 'SendedEntryStatus'> & {
    handleModalClose: () => void;
};

const StatusModal: React.FC<PropsType> = props => {
    const { SendedEntryStatus } = props;
    const { handleModalClose } = props;

    const BaseClassName = useRef('sendPage__statusModal');
    const BaseButtonClassName = useRef(`${BaseClassName.current}__button`);

    return (
        <>
            <div className="modal__backdrop" onClick={handleModalClose} />
            <div className={`modal__content ${BaseClassName.current}`}>
                {SendedEntryStatus === 'success' ? (
                    <>
                        <p>
                            <strong>Игра успешно отправлена</strong>
                        </p>
                        <p>Ура! 🤗</p>
                        <div className={BaseButtonClassName.current}>
                            <button onClick={handleModalClose}>скрыть</button>
                        </div>
                    </>
                ) : null}

                {SendedEntryStatus === 'wrong_captcha' ? (
                    <>
                        <p>
                            <strong>Капча не пройдена</strong>
                        </p>
                        <p>Печаль! 😟</p>
                        <div className={BaseButtonClassName.current}>
                            <button onClick={handleModalClose}>попробовать снова</button>
                        </div>
                    </>
                ) : null}

                {SendedEntryStatus === 'wrong_data' ? (
                    <>
                        <p>
                            <strong>Неправильные данные</strong>
                        </p>
                        <p>Если вы считаете, что всё заполнено верно, то напишите на почту организатору</p>
                        <div className={BaseButtonClassName.current}>
                            <button onClick={handleModalClose}>или попробуйте снова</button>
                        </div>
                    </>
                ) : null}

                {SendedEntryStatus === 'form_closed' ? (
                    <>
                        <p>
                            <strong>Форма закрыта</strong>
                        </p>
                        <p>Напишите на почту организатору</p>
                        <div className={BaseButtonClassName.current}>
                            <button onClick={handleModalClose}>скрыть</button>
                        </div>
                    </>
                ) : null}

                {SendedEntryStatus === 'unknown' ? (
                    <>
                        <p>
                            <strong>Неизвестная ошибка</strong>
                        </p>
                        <p>Если вы считаете, что всё заполнено верно, то напишите на почту организатору</p>
                        <div className={BaseButtonClassName.current}>
                            <button onClick={handleModalClose}>или попробуйте снова</button>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default StatusModal;
