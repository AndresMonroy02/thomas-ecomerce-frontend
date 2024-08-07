import React from 'react';

const FooterComponent: React.FC = () => {
    return (
        <div>
            <footer className='footer'>
                <span>Andres Monroy | ; {new Date().getFullYear()} </span>
            </footer>
        </div>
    );
}

export default FooterComponent;
