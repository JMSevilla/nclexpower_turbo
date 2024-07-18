import { Card, ReactTable } from 'core-library/components';
import withAuth from "core-library/core/utils/withAuth";
import React from "react";
import { DashboardCards } from '@/core/constant/DashboardCard';
import { Box, Typography } from '@mui/material';

interface Props { }

const HubOverview: React.FC<Props> = (props) => {
  return (
    <div className="w-full h-screen bg-cover font-['Poppins'] bg-gradient-to-b from-slate-200 to-white px-5">
      <div className='w-full flex gap-5 py-5 items-center justify-center px-5 lg:flex-row md:flex-col sm:flex-col xs:flex-col'>
        <span className='flex w-full gap-5 leading-4 '>
          {DashboardCards && DashboardCards.map((card, index) => (
            <Card sx={{ padding: 0, bgcolor: card?.bgColor, color: card?.textColor, width: .25, display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }} key={index}>
              <div className='w-full h-fit flex items-center px-5 gap-5 '>
                <p className='scale-125'>{card?.icon}</p>
                <Box sx={{ width: .77 }} className='flex flex-col'>
                  <Typography sx={{ fontWeight: 700, fontSize: '.87rem', lineHeight: 1 }} >{card?.title}</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: 1 }} >{card?.cardValue}</Typography>
                </Box>
              </div>
            </Card>
          ))}
        </span>
      </div>
      <div className='flex w-full gap-5'>
        <div className='w-2/3 flex flex-col gap-2 grow'>
          <p className='w-full font-semibold bg-white rounded-md py-2 px-5 text-lg shadow-md text-slate-500'>Overall Data</p>
          <ReactTable data={[]} columns={[]} initPageSize={5} isLoading={false} />
        </div>
      </div>
    </div>
  )
}


export default withAuth(HubOverview);
