import React from 'react'
import EventCard from '../HomeComponents/EventCard'

const Programmes = () => {
  return (
    <div className="bg-black flex justify-center items-center py-20 text-black">
      <div className="w-[75%]">
        <span className=" flex text-4xl cursor-pointer font-semibold border-b-[1px] border-white/30  pb-4 mb-4 text-white">
          Explore our programmes
        </span>
        <div className="bg-white w-full h-[50vh] mt-20 relative">
            <div className='flex justify-around gap-10 w-[90%] absolute top-[-70px] left-16 text-black'>
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Programmes