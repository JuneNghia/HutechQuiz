import { Typography } from '@mui/material'
import React from 'react'

const StepTitle = ({ title }) => {
  return (
    <div className='relative' style={{ zIndex: 999 }}>
      <div className=' fixed top-[12px]'>
        <span className='text-xl w-max font-bold text-[white] z-10 absolute top-2 left-0'>{title}</span>
      </div>
    </div>
  )
}

export default StepTitle
