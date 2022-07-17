import React from 'react';

import './footer.scss';

const Footer = () => {

    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-contact'>
                    <span>Contact us</span><br></br><br></br>
                    <a className="footer-links" href="https://github.com/1g2g">1g2g</a>
                    &nbsp; | &nbsp;
                    <a className="footer-links" href="https://github.com/SShinMJ">SShinMJ</a>
                </div>
                <div className='content-vertical-line'></div>
                <div className="footer-copyright">
                    Copyright ©  2022 &nbsp;
                    <a className="footer-links" href="https://github.com/Team-KyunYoung">Team-KyunYoung</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;