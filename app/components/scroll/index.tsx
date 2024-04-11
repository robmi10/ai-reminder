import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

const CustomLink = ({ href, children }: any) => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div onClick={handleClick} >
            {children}
        </div>
    );
};

export default CustomLink;
