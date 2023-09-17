import React, { useEffect, useState } from 'react'

const style = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px',
  borderRadius: '5px',
  zIndex: 999
}

const StepTitle = ({ title, timeInSeconds, onSubmit }) => {
  const [timer, setTimer] = useState(timeInSeconds)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
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
  }, [timer])

  const hours = Math.floor(timer / 3600)
  const minutes = Math.floor((timer % 3600) / 60)
  const seconds = timer % 60

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`

  return (
    <>
      <div className='relative' style={{ zIndex: 999 }}>
        <div className='fixed top-[12px]'>
          <div className='text-xl w-max font-bold text-[white] z-10 absolute top-2 left-0'>{title}</div>
        </div>
      </div>
      {timer && (
        <div
          style={{
            ...style,
            backgroundColor: warning ? 'pink' : 'white',
            color: warning ? 'white' : 'black'
          }}
          className={warning ? 'flashing' : ''}
        >
          <span className='text-xl w-max font-bold'>{timer === 0 ? 'HẾT GIỜ' : formattedTime}</span>
        </div>
      )}
    </>
  )
}

export default StepTitle
