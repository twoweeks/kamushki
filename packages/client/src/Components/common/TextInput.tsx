import React from 'react';

type PropsTyp = {
    className: string;
    id: string;
    label: string | JSX.Element;
    isLabelHidden?: boolean;
    extraText?: string | JSX.Element;
    inputStyle?: React.CSSProperties;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'required' | 'maxLength' | 'placeholder'>;

const TextInput: React.FC<PropsTyp> = props => {
    const { className, id } = props;
    const { label, isLabelHidden, extraText } = props;
    const { type = 'text', placeholder, maxLength } = props;
    const { required } = props;
    const { inputStyle } = props;

    return (
        <div className={`${className} ${className}--${type}`} data-required={required ? '' : null}>
            <div className={`${className}__label${isLabelHidden ? ' hidden' : ''}`}>
                <label htmlFor={id}>{label}</label>
            </div>
            <div className={`${className}__input`}>
                {type === 'textarea' ? (
                    <textarea name={id} style={inputStyle} {...{ id, placeholder, maxLength, required }} />
                ) : (
                    <input name={id} style={inputStyle} {...{ id, type, placeholder, maxLength, required }} />
                )}
            </div>
            {extraText ? <div className={`${className}__extraText`}>{extraText}</div> : null}
        </div>
    );
};

export default TextInput;
