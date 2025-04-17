import React from 'react'
import TableComponent from '../../Components/table'
import { fetchData } from '@/app/actions'
import { ILeader } from '@/app/(pages)/types'

const LeadersPage = async () => {
    const {data} = await fetchData<ILeader[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}/leaders`)
  return (
    <div className="my-[3vh]">
    <TableComponent title="Leaders" values={data} />
  </div>
  )
}

export default LeadersPage