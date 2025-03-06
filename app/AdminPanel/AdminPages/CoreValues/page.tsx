import React from 'react'
import TableComponent from '../../Components/table'

const CoreValues = () => {
  return (
    <TableComponent title="Core Values" endpoint='http://localhost:3000/api/coreValues' action/>
  )
}

export default CoreValues