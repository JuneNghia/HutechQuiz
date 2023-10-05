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
import warningImg from '../../assets/warning.svg'
import ReportService from '../../services/report.service'

const PracticeTest = ({ id, quantity, title, time, subTitle }) => {
  const location = useLocation()

  const { user } = useAuth()
  const navigate = useNavigate()
  const [isPaid, setIsPaid] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [reported, setReported] = useState({})
  const [isReporting, setIsReporting] = useState({})
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

  // const testData = [
  //   {
  //     id: '8288e6b7-0f9c-498b-a17e-ce6bf7a5269a',
  //     question: 'Với MS-Word, có thể nhấn phím nào để hiện các Key Tips cho phép truy cập lệnh từ bàn phím',
  //     answer: 'Alt',
  //     choices: ['Ctrl', 'Alt', 'Shift', 'Esc'],
  //     categoryId: 'b8a7db65-f25d-478d-9a7c-c85868737bad'
  //   },
  //   {
  //     id: 'bb3f8905-5fde-4d42-9853-fcba4bce935c',
  //     question: 'Với MS-Word, có bao nhiêu kiểu hiển thị tài liệu',
  //     answer: 'Trên 3',
  //     choices: ['1', '2', '3', 'Trên 3'],
  //     categoryId: 'b8a7db65-f25d-478d-9a7c-c85868737bad'
  //   }
  // ]

  useEffect(() => {
    setIsLoading(true)
    setIsPaid(false)
    setSaved(false)
  }, [location.pathname])

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

  const handleReport = (quesId) => {
    setIsReporting((prevReporting) => ({
      ...prevReporting,
      [quesId]: true
    }))

    const data = {
      id: quesId,
      userId: user.id,
      userPhone: user.phone,
      userEmail: user.email,
      userName: user.name
    }
    ReportService.question(data)
      .then(() => {
        const updatedReport = {
          isReported: true,
          id: quesId
        }

        setReported((prevReported) => ({
          ...prevReported,
          [quesId]: updatedReport
        }))

        setIsReporting((prevReporting) => ({
          ...prevReporting,
          [quesId]: false
        }))
      })
      .catch(() => {
        Swal.fire('Thất bại', 'Đã xảy ra lỗi, vui lòng thử lại sau', 'error')
      })
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
    return <InfoExam title={title} quantity={quantity} price={1000} handleSubmit={handlePaid} time={time} />
  }

  if (isLoading) {
    return <PageLoader height='80vh' text='Đang tải dữ liệu' />
  }

  return (
    <>
      <StepTitle
        title={`Kiểm tra: ${subTitle}`}
        timeInSeconds={time}
        onSubmit={handleTimeOut}
        showTimer={true}
        isSubmitted={saved}
      />
      {/* {saved && (
        <Typography className='!bg-yellow-300 !mb-3 rounded-md p-2'>
          <span className=''>
            <span className='font-bold'>Lời nhắc: </span>
            <span>
              Do hệ thống đang phát triển nên sẽ có sai sót khi hiển thị đáp án câu hỏi, với các câu hỏi không hiển thị
              ra đáp án (được hightlight nền vàng), các bạn vui lòng nhấn vào nút{' '}
              <span className='font-bold'>Báo Cáo</span> tương ứng ở các câu hỏi. Mỗi câu hỏi báo cáo thành công được
              ghi nhận hợp lệ sẽ được thưởng <span className='font-bold'>500đ</span> vào tài khoản thưởng. Cám ơn các
              bạn đã ủng hộ{' '}
            </span>

            <span className='text-blue-700 font-bold'>Hutech</span>
            <span className='text-red-700 font-bold'> Quiz</span>
          </span>
        </Typography>
      )} */}
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
          } outline mb-4 relative`}
        >
          {/* {saved && (
            <Button
              disabled={reported[ques.id]?.isReported || isReporting[ques.id]}
              onClick={() => handleReport(ques.id)}
              variant='contained'
              className={`!ml-2 !p-0 !px-2 !text-[15px] ${
                reported[ques.id]?.isReported ? '!bg-green-600 !text-white' : '!bg-white'
              } !text-black hover:!bg-red-600 hover:!text-white !absolute top-3 right-5`}
            >
              <img src={warningImg} width='15px' className='mr-2' />
              {isReporting[ques.id] ? 'Đang báo cáo' : reported[ques.id]?.isReported ? 'Đã báo cáo' : 'Báo cáo'}
            </Button>
          )} */}
          <CardHeader
            title={
              <div className='flex justify-between items-center'>
                <span style={{ lineHeight: 1.5 }}>
                  Câu {index + 1}: {ques.question}
                </span>
              </div>
            }
            titleTypographyProps={{ fontSize: '1rem' }}
          />
          <CardContent>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name={`row-radio-buttons-group-${ques.id}`}
            >
              <Grid container>
                {ques.choices.map((choice) => (
                  <Grid className='xs:mb-2 xs:first:mt-1 lg:mb-0 last:mb-0' key={choice} lg={6} xs={12}>
                    <FormControlLabel
                      className='!items-start px-3 py-3'
                      value={choice}
                      control={
                        <Radio
                          className='!p-0 xs:!mt-[2px] !mt-[1px]'
                          checked={selectedAnswers[ques.id] === choice}
                          onChange={() => handleAnswerChange(ques.id, choice)}
                          id={`radio-${ques.id}-${choice}`}
                        />
                      }
                      label={<Typography className='!ml-2'>{choice}</Typography>}
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
