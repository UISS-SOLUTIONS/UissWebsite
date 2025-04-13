import React from 'react'
import TableComponent from '../../Components/table'
import { fetchData } from '@/app/actions'

const LeadersPage = async () => {
    const {data} = await fetchData(`${process.env.NEXT_PUBLIC_API_ROUTE}/leaders`)
  return (
    <div className="my-[3vh]">
    <TableComponent title="Leaders" values={data} />
  </div>
  )
}

export default LeadersPage