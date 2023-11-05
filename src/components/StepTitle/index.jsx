import React, { useEffect, useState } from 'react'
import warningImg from '../../assets/warning.svg'
import trophyImg from '../../assets/trophy.png'
import clockImg from '../../assets/clock.svg'
import { Helmet } from 'react-helmet'
import { useMediaQuery, useTheme } from '@mui/material'

const style = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px',
  borderRadius: '5px',
  zIndex: 999
}

const StepTitle = ({ title, timeInSeconds, onSubmit, showTimer, isSubmitted }) => {
  const [timer, setTimer] = useState(timeInSeconds)
  const [warning, setWarning] = useState(false)
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  

  useEffect(() => {
    if (isSubmitted) {
      setWarning(false)
    } else {
      if (timer > 0) {
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1)
          if (timer <= 15) {
            setWarning(true)
          }
        }, 1000)

        return () => {
          clearInterval(intervalId)
        }
      } else {
        setWarning(false)
        if (onSubmit) {
          onSubmit()
        }
      }
    }
  }, [timer, isSubmitted])

  const hours = Math.floor(timer / 3600)
  const minutes = Math.floor((timer % 3600) / 60)
  const seconds = timer % 60

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`

  return (
    <>
      {showTimer && (
        <Helmet>
          <title>KIỂM TRA - {formattedTime.toString()}</title>
        </Helmet>
      )}

      <div className={`${isMobile && 'ml-12'} relative`} style={{ zIndex: 999 }}>
        <div className='fixed top-[14px]'>
          <div className='text-xl w-max font-bold text-[white] z-10 absolute top-2 left-0'>{title}</div>
        </div>
      </div>

      {showTimer && (
        <div
          style={{
            ...style,
            backgroundColor: warning ? 'pink' : 'white',
            color: warning ? 'white' : 'black'
          }}
          className={warning ? 'flashing' : ''}
        >
          <span className='text-xl w-max font-bold flex items-center'>
            <img width={'30px'} className='mr-3' src={warning ? warningImg : timer === 0 ? trophyImg : clockImg} />
            {timer === 0 ? 'HẾT GIỜ' : formattedTime}
          </span>
        </div>
      )}
    </>
  )
}

export default StepTitle
