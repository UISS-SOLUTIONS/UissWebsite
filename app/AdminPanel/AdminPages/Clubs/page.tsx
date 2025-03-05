import React from 'react'
import TableComponent from '../../Components/table'

const Clubs = () => {
  return (
    <TableComponent title="Clubs" endpoint='http://localhost:3000/api/clubs'/>
  )
}

export default Clubs