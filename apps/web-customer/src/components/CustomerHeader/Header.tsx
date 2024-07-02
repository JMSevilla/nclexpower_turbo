import React, { useEffect, useState } from 'react'
import NCLEXLogo from '../../assets/NCLEXPowerLogo.png'
import Image from 'next/image';

export const Header = () => {

    const headerList = [
        { label: "Home" },
        { label: "About" },
        { label: "Contact Us" },
        { label: "Login" },
    ]

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed z-50 w-full transition-colors duration-300 shadow-md font-['Poppins'] ${isScrolled ? 'bg-[#002442]' : 'bg-black bg-opacity-30'}`}>
            <div className="p-4 flex justify-between items-center">
                <Image className='w-28' src={NCLEXLogo} alt="NCLEXLogo" />
                <div className="flex gap-8 px-5">
                    {headerList.length > 0 && headerList.map((item) => (
                        <button className="text-white">{item.label}</button>
                    ))}

                </div>
            </div>
        </div>
    )
}
