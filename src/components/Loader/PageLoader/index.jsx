import { Typography } from '@mui/material'
import { PropagateLoader } from 'react-spinners'

const PageLoader = ({ height, text, variant }) => {
  return (
    <div style={{ height: height || '100vh' }} className='flex flex-col justify-center items-center'>
      <Typography fontWeight={600} variant={variant || 'h4'} className='pb-4'>
        {text || 'Đang tải'}
      </Typography>
      <PropagateLoader color='#0063cc' size={15} speedMultiplier={0.7} />
    </div>
  )
}

export default PageLoader
