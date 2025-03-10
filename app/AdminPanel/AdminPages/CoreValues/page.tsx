import React from 'react'
import TableComponent from '../../Components/table'
import { fetchData } from '@/app/actions';

const CoreValues = async () => {
  let data: any[] = [];
  try {
    const response =  await fetchData("http://localhost:3000/api/coreValues")
    if(response.success){
      data = response.data;
    }
  } catch (e){
    throw new Error((e as Error).message)
  }

  return (
    <TableComponent title="Core Values" values={data} action/>
  )
}

export default CoreValues