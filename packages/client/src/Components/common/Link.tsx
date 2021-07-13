import React from 'react';

type PropsType = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<PropsType> = props => {
    const { href, target = '_blank', children } = props;

    return (
        <a href={href} target={target} rel="nofollow noopener noreferrer">
            {children}
        </a>
    );
};

export default Link;
