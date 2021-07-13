import React from 'react';

type PropsTyp = {
    className: string;
    id: string;
    label: string | JSX.Element;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'required'>;

const CheckboxInput: React.FC<PropsTyp> = props => {
    const { className, id } = props;
    const { label } = props;
    const { required } = props;

    return (
        <div className={`${className} ${className}--checkbox`} data-required={required ? '' : null}>
            <div className={`${className}__input`}>
                <input type="checkbox" name={id} {...{ id, required }} />
            </div>
            <div className={`${className}__label`}>
                <label htmlFor={id}>{label}</label>
            </div>
        </div>
    );
};

export default CheckboxInput;
