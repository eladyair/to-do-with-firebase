import React from 'react';

// Styles
import './custom-button.styles.scss';

const CustomButton = ({ children, socialLogin, inverted, ...otherProps }) => {
    let socialLoginType = null;

    if (socialLogin === 'google') {
        socialLoginType = 'google-sign-in';
    } else if (socialLogin === 'facebook') {
        socialLoginType = 'facebook-sign-in';
    }

    return (
        <button className={`${inverted ? 'inverted' : ''} ${socialLoginType} custom-button`} {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;
