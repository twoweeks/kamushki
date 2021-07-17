import React from 'react';

type PropsTyp = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string | JSX.Element;
    isLabelHidden?: boolean;
    extraText?: string | JSX.Element;
    inputStyle?: React.CSSProperties;
};

export const TextInput: React.FC<PropsTyp> = props => {
    const { className, id } = props;
    const { label, isLabelHidden, extraText } = props;
    const { type = 'text', placeholder, maxLength } = props;
    const { defaultValue, value } = props;
    const { required, readOnly } = props;
    const { inputStyle } = props;

    return (
        <div className={className ? ` ${className} ${className}--${type}` : void 0} data-required={required ? '' : null}>
            <div className={className ? `${className}__label` : void 0} hidden={isLabelHidden ? true : void 0}>
                <label htmlFor={id}>{label}</label>
            </div>
            <div className={className ? `${className}__input` : void 0}>
                {type === 'textarea' ? (
                    <textarea name={id} style={inputStyle} {...{ id, placeholder, maxLength, required }} />
                ) : (
                    <input
                        name={id}
                        style={inputStyle}
                        {...{ id, type, placeholder, maxLength }}
                        {...{ defaultValue, value }}
                        {...{ required, readOnly }}
                    />
                )}
            </div>
            {extraText ? <div className={`${className}__extraText`}>{extraText}</div> : null}
        </div>
    );
};
