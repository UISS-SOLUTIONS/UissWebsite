'use client'
import React from 'react'

interface props {
    className: string;
    name: string;
}

const CallToAction = ({className, name}:props) => {
  return (
    <button className={`${className}`}>
        {name}
    </button>
  )
}

export default CallToAction