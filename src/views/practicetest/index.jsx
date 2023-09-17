import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import TestService from '../../services/test.service'
import StepTitle from '../../components/StepTitle'
import Swal from 'sweetalert2'
import PageLoader from '../../components/Loader/PageLoader'
import InfoExam from './InfoExam'
import WalletService from '../../services/wallet.service'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleAlertConfirm } from '../../utils/common/handleAlertConfirm'

const PracticeTest = ({ id, quantity, title, time }) => {
  const location = useLocation()

  useEffect(() => {
    setIsPaid(false)
  }, [location.pathname])

  const { user } = useAuth()
  const navigate = useNavigate()
  const [isPaid, setIsPaid] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [saved, setSaved] = useState(false)
  const handleAnswerChange = (questionId, selectedChoice) => {
    if (!saved) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: selectedChoice
      }))
    }
  }

  const handleTryAgain = () => {
    handleAlertConfirm({
      title: 'Xác nhận thử lại',
      icon: 'question',
      showCancelButton: true,
      html: 'Bạn có chắc chắn muốn thử lại ?'
    })
  }

  const handlePaid = () => {
    try {
      Swal.fire({
        title: 'Xác nhận thanh toán',
        html: 'Số tiền sẽ được trừ từ số dư và tiền thưởng <br/><b>( ưu tiên tiền thưởng )</b>',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Thanh toán ngay',
        confirmButtonColor: 'green',
        allowOutsideClick: false,
        preConfirm: () => {
          Swal.update({
            title: 'Đang thanh toán',
            icon: 'info',
            html: 'Đang xử lý...<br/>Không tắt trang hoặc trình duyệt',
            showCancelButton: false,
            showConfirmButton: false
          })

          const data = {
            phone: user.phone,
            amount: 1000
          }

          WalletService.pay(data)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Thanh toán thành công',
                html: `Khi nhấn nút làm bài dưới đây, vui lòng không tải lại trang hoặc tắt trình duyệt`,
                confirmButtonText: 'Làm bài ngay'
              }).then((confirm) => {
                if (confirm.isConfirmed) {
                  setIsPaid(true)
                  TestService.getExam(id)
                    .then((res) => {
                      setData(res.data.data)
                      setIsLoading(false)
                    })
                    .catch((error) => {
                      console.log(error)
                      setIsLoading(false)
                    })
                }
              })
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Thanh toán thất bại',
                html: `Số dư của bạn không đủ`,
                showConfirmButton: true,
                confirmButtonText: 'Nạp tiền',
                confirmButtonColor: 'blue',
                showCancelButton: true,
                cancelButtonColor: 'red',
                cancelButtonText: 'Thử lại'
              }).then((confirm) => {
                if (confirm.isConfirmed) {
                  navigate('/payment')
                }
              })
            })

          return false
        }
      })
    } catch (error) {}
  }

  const handleTimeOut = () => {
    Swal.fire({
      icon: 'info',
      html: 'Đang xử lý...<br/>Không tắt trang hoặc trình duyệt',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    let correctCount = 0
    data.forEach((ques) => {
      if (selectedAnswers[ques.id] === ques.answer) {
        correctCount++
      }
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          html: `Nộp bài thành công<br/>Số câu làm đúng : <b>${correctCount} / ${data.length}</b>`,
          confirmButtonText: 'Xem đáp án'
        }).then((confirm) => {
          if (confirm.isConfirmed) {
            setSaved(true)
          }
        })
      }, 1200)
    })
  }

  const handleSubmit = () => {
    try {
      Swal.fire({
        html: 'Bạn có chắc chắn muốn nộp bài ?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Nộp bài',
        allowOutsideClick: false,
        preConfirm: () => {
          Swal.update({
            icon: 'info',
            html: 'Đang xử lý...<br/>Không tắt trang hoặc trình duyệt',
            showCancelButton: false,
            showConfirmButton: false
          })

          let correctCount = 0
          data.forEach((ques) => {
            if (selectedAnswers[ques.id] === ques.answer) {
              correctCount++
            }
            setTimeout(() => {
              Swal.fire({
                icon: 'success',
                html: `Nộp bài thành công<br/>Số câu làm đúng : <b>${correctCount} / ${data.length}</b>`,
                confirmButtonText: 'Xem đáp án'
              }).then((confirm) => {
                if (confirm.isConfirmed) {
                  setSaved(true)
                }
              })
            }, 1200)
          })

          return false
        }
      })
    } catch (error) {}
  }

  if (!isPaid) {
    return <InfoExam title={title} quantity={quantity} price={1000} handleSubmit={handlePaid} time={time}/>
  }

  if (isLoading) {
    return <PageLoader height='80vh' text='Đang tải dữ liệu' />
  }

  return (
    <>
      <StepTitle title={title} timeInSeconds={time} onSubmit={handleTimeOut} />
      {data.map((ques, index) => (
        <Card
          key={ques.id}
          component='div'
          className={`${
            saved
              ? selectedAnswers[ques.id] === ques.answer
                ? '!bg-green-100 outline-green-500 outline-2'
                : '!bg-red-100 outline-red-500 outline-2'
              : 'bg-white outline-1'
          } outline mb-4`}
        >
          <CardHeader title={`Câu ${index + 1}: ${ques.question}`} titleTypographyProps={{ fontSize: '1rem' }} />
          <CardContent>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name={`row-radio-buttons-group-${ques.id}`}
            >
              <Grid container>
                {ques.choices.map((choice) => (
                  <Grid className='xs:mb-3 xs:first:mt-1 lg:mb-0 last:mb-0' key={choice} lg={6} xs={12}>
                    <FormControlLabel
                      value={choice}
                      control={
                        <Radio
                          checked={selectedAnswers[ques.id] === choice}
                          onChange={() => handleAnswerChange(ques.id, choice)}
                          id={`radio-${ques.id}-${choice}`}
                        />
                      }
                      label={<Typography>{choice}</Typography>}
                      htmlFor={`radio-${ques.id}-${choice}`}
                      style={{
                        paddingRight: '10px',
                        backgroundColor: (choice === ques.answer && saved && 'yellow') || 'transparent'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <div className='fixed bottom-[20px] right-[20px] z-[1000] flex items-center justify-center'>
        {!saved && !isLoading && (
          <Button onClick={handleSubmit} variant='contained'>
            Nộp bài
          </Button>
        )}
        {saved && !isLoading && (
          <Button onClick={handleTryAgain} variant='contained'>
            Thử lại
          </Button>
        )}
      </div>
    </>
  )
}

export default PracticeTest
