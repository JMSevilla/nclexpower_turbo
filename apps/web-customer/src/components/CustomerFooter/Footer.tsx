import Image from 'next/image'
import CoreZigma from '../../../../../packages/core-library/components/Header/asset/CoreZigma.png'
// import CoreZigma from '@repo/core-library/components/Header/asset/CoreZigma.png'

const lists = [
    {
        title: "Company",
        items: [
            { label: "About Us", path: "/about_us" },
            { label: "Careers", path: "/careers" },
            { label: "Press", path: "/press" },
            { label: "Blog", path: "/blog" },
            { label: "Contact", path: "/contact" },
        ],
    },
    {
        title: "Support",
        items: [
            { label: "Help Center", path: "/help_center" },
            { label: "FAQs", path: "/faqs" },
            { label: "Terms of Service", path: "/terms_of_service" },
            { label: "Privacy Policy", path: "/privacy_policy" },
            { label: "Accessibility", path: "/accessibility" },
        ],
    },
    {
        title: "Follow Us",
        items: [
            { label: "Facebook", path: "/facebook" },
            { label: "Twitter", path: "/twitter" },
            { label: "Instagram", path: "/instagram" },
            { label: "LinkedIn", path: "/linkedin" },
            { label: "YouTube", path: "/youtube" },
        ],
    },
];


export const Footer = () => {
    return (
        <div className="w-full bg-[#002442] text-white p-10 font-['Poppins']">
            <div className='w-full flex items-center gap-5'>
                <Image className='w-16 aspect-square' src={CoreZigma} alt="CoreZigmaLogo" />
                <div>
                    <p className='font-semibold text-3xl'>NCLEX POWER</p>
                    <p className='italic text-xs'>Powered by : Core-Zigma System</p>
                </div>
            </div>
            <div className='h-fit flex justify-evenly items-start py-10 w-full border-b'>
                {lists.map((list, index) => (
                    <div key={index} className="w-1/3 h-fit flex flex-col items-center text-left">
                        <p className="font-semibold pb-2">{list.title}</p>
                        <ul className="flex flex-col gap-2 text-xs">
                            {lists.length > 0 && list.items.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <p className='w-full text-center pt-4'>© 2024 NCLEXPower ™. All rights reserved.</p>
        </div>
    )
}
