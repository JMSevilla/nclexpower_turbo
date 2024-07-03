import React from 'react'

interface CardProps {
  textColor: string
  bgColor: string
  title: string
  cardValue: string
}

const Card = ({ textColor, bgColor, title, cardValue }: CardProps) => {
  return (
    <div className={`w-1/4 grow h-28 bg-[${bgColor}] rounded-md shadow-md flex items-center px-5 gap-5 text-[${textColor}]`}>
      <div className={`w-14 h-14 bg-[${bgColor}] rounded-full`} />
      <div className='flex flex-col'>
        <p className='font-bold'>{title}</p>
        <p className='font-semibold text-2xl'>{cardValue}</p>
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="w-full h-screen bg-pricing bg-cover font-['Poppins']">
      <div className='w-full flex gap-5 py-5 items-center justify-center px-5 lg:flex-row md:flex-col sm:flex-col xs:flex-col'>
        <span className='flex w-5/6 gap-5 leading-4 '>

          <Card bgColor="#e3f2fd" textColor="#80c3f7" title="Total Users" cardValue="60,892" />
          <Card bgColor="#dbf5e1" textColor="#6cc283" title="PN Subscriber" cardValue="30,192" />
          <Card bgColor="#faf1d6" textColor="#fbf2dc" title="RN Subscriber" cardValue="30,700" />
          <Card bgColor="#e7e8f2" textColor="#8486bc" title="Subscriber This Month" cardValue="60,892" />

        </span>
      </div>
    </div>
  )
}

export default Dashboard
