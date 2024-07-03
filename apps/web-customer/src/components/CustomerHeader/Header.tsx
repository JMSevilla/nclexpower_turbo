import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { NCLEXLogo } from 'core-library/globalAssets';
import { NavigationType } from 'core-library/types/navigation';
import { useScroll } from 'core-library';

interface Props {
    menu: NavigationType[]
}

export const Header: React.FC<Props> = ({ menu }) => {
    const { isScrolled } = useScroll()

    return (
        <div className={`fixed z-50 w-full transition-colors duration-300 shadow-md font-['Poppins'] ${isScrolled ? 'bg-[#002442]' : 'bg-black bg-opacity-30'}`}>
            <div className="p-4 flex justify-between items-center">
                <Image className='w-28' src={NCLEXLogo} alt="NCLEXLogo" />
                <div className="flex gap-8 px-5">
                    {menu ? menu.length > 0 && menu.map((item, index) => (
                        <button key={index} className="text-white">{item.label}</button>
                    )) : null}
                </div>
            </div>
        </div>
    )
}
