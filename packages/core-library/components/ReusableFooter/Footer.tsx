import Image from 'next/image'
import { CoreZigmaLogo } from '../../globalAssets'
import { FooterProps } from '../../types/global'
import { useMemo } from 'react'
import { Box } from '@mui/material'


export const Footer: React.FC<FooterProps> = (props) => {
    const yearData = new Date().getFullYear()
    const memoYear = useMemo(() => yearData, [yearData])

    return (
        <Box width={1} sx={{
            padding: " 2.5rem",
            color: "white",
            fontFamily: 'Poppins',
            backgroundColor: "#002442"
        }}>
            <Box width={1} sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 5
            }} >
                <Image style={{ width: 50 }} src={CoreZigmaLogo} alt="CoreZigmaLogo" />
                <div>
                    <p className='font-semibold text-3xl'>NCLEX POWER</p>
                    <p className='italic text-xs'>Powered by : Core-Zigma System</p>
                </div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    alignItems: 'center',
                    borderBottom: 2,
                    borderColor: 'white',
                    paddingY: '2.5rem',
                    marginBottom: 2
                }}
            >
                {props.footerList.length > 0 && props.footerList.map((list, index) => (
                    <div key={index} className="w-1/3 h-fit flex flex-col items-center text-left">
                        <p className="font-semibold pb-2">{list.title}</p>
                        <ul className="flex flex-col gap-2 text-xs">
                            {props.footerList.length > 0 && list.items.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Box>
            <p className='w-full text-center pt-4'>© {memoYear} NCLEXPower ™. All rights reserved.</p>
        </Box>
    )
}
