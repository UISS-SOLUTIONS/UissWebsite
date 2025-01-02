import React from 'react'
import TabHeader from '../../Components/header'


const WebMaintenance = () => {

  return (
    <TabHeader title='Landing Page'>
          <form className='flex justify-center gap-2'>
            <div className='flex flex-col w-[90%] '>
            <label htmlFor="LandTitle" className='text-xl font-bold pt-5'>Hero Page Title:</label>
            <input type="text" name="LandTitle" id="" className='py-1 px-2 text-lg focus:outline-none' placeholder='Uiss club' />
            <label htmlFor="Description" className='text-xl font-bold pt-3'>Hero Page Description:</label>
            <textarea name="Description" id="" className='p-2 resize-none focus:outline-none' rows={6}/>
            <button type="submit" className='text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-5 items-end'>Submit</button>
            </div>
          </form>
          <span className='flex text-4xl font-bold pb-2 border-b-2 border-black/20 pt-10'>Section One</span>
          <form className='flex justify-center gap-2'>
            <div className='flex flex-col w-[90%]'>
            <label htmlFor="SectionOneTitle" className='text-xl font-bold pt-5'>Section One Title:</label>
            <input type="text" name="SectionOneTitle" id="" className='py-1 px-2 text-lg focus:outline-none' placeholder='It Starts With You' />
            <label htmlFor="Description" className='text-xl font-bold pt-3'>Section One Description:</label>
            <textarea name="Description" id="" className='p-2 resize-none focus:outline-none' rows={6}/>
            <button type="submit" className='text-xl px-4 py-1 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-5 items-end'>Submit</button>
            </div>
          </form>
    </TabHeader>
  )
}

export default WebMaintenance