import React from 'react';

type PropsTyp = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string | JSX.Element;
    isLabelHidden?: boolean;
};

export const CheckboxInput: React.FC<PropsTyp> = props => {
    const { className, id } = props;
    const { label, isLabelHidden } = props;
    const { defaultChecked, checked, defaultValue, value } = props;
    const { onChange } = props;
    const { required, readOnly, disabled, hidden } = props;

    return (
        <div className={className ? `${className}` : void 0} data-type="checkbox" data-required={required ? '' : null} hidden={hidden}>
            <input
                type="checkbox"
                name={id}
                className={className ? `${className}__input` : void 0}
                {...{ id }}
                {...{ defaultChecked, checked, defaultValue, value }}
                {...{ onChange }}
                {...{ required, readOnly, disabled, hidden }}
            />

            {label ? (
                <label htmlFor={id} className={className ? `${className}__label` : void 0} hidden={isLabelHidden}>
                    {label}
                </label>
            ) : null}
        </div>
    );
};
