import React from 'react';

type PropsTyp = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string | JSX.Element;
    isLabelHidden?: boolean;
};

export const CheckboxInput: React.FC<PropsTyp> = props => {
    const { className, id } = props;
    const { label, isLabelHidden } = props;
    const { required } = props;

    return (
        <div className={className ? `${className} ${className}--checkbox` : void 0} data-required={required ? '' : null}>
            <div className={className ? `${className}__input` : void 0} hidden={isLabelHidden ? true : void 0}>
                <input type="checkbox" name={id} {...{ id, required }} />
            </div>
            <div className={className ? `${className}__label` : void 0}>
                <label htmlFor={id}>{label}</label>
            </div>
        </div>
    );
};
