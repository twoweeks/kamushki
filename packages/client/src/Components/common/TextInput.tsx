import React from 'react';

type PropsTyp = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string | JSX.Element;
    isLabelHidden?: boolean;
    extraText?: string | JSX.Element;
    inputStyle?: React.CSSProperties;
} & {
    onTextareaChange?: React.HTMLAttributes<HTMLTextAreaElement>['onChange'];
};

export const TextInput: React.FC<PropsTyp> = props => {
    const { className, id } = props;
    const { label, isLabelHidden, extraText } = props;
    const { type = 'text', placeholder, maxLength } = props;
    const { defaultValue, value } = props;
    const { onChange, onTextareaChange } = props;
    const { required, readOnly, disabled, hidden } = props;
    const { inputStyle } = props;

    const UniversalInputProps = {
        name: id,
        style: inputStyle,
        className: className ? `${className}__input` : void 0,
        ...{ id, type, placeholder, maxLength },
        ...{ defaultValue, value },
        ...{ required, readOnly, disabled, hidden },
    };

    return (
        <div className={className ? ` ${className}` : void 0} data-type={type} data-required={required ? '' : null} hidden={hidden}>
            {label ? (
                <label htmlFor={id} className={className ? `${className}__label` : void 0} hidden={isLabelHidden}>
                    {label}
                </label>
            ) : null}

            {type === 'textarea' ? (
                <textarea {...UniversalInputProps} onChange={onTextareaChange} />
            ) : (
                <input {...UniversalInputProps} {...{ onChange }} />
            )}

            {extraText ? <div className={`${className}__extraText`}>{extraText}</div> : null}
        </div>
    );
};
