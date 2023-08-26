import { Button, Card, CardContent, CardHeader, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TestService from '../../services/test.service'
import StepTitle from '../../components/StepTitle'
import Swal from 'sweetalert2'
import PageLoader from '../../components/Loader/PageLoader'

const PracticeTest = () => {
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

  useEffect(() => {
    TestService.getExam('46f45600-4554-4040-8bcb-244a0b6d2aff')
      .then((res) => {
        setData(res.data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <PageLoader height='80vh' text='Đang tải dữ liệu' />
  }

  return (
    <>
      <StepTitle title='Kiểm tra Module 1' />
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
                {ques.choices.map((choice, index) => (
                  <Grid key={choice} lg={6} xs={12}>
                    <FormControlLabel
                      value={choice}
                      control={
                        <Radio
                          checked={selectedAnswers[ques.id] === choice}
                          onChange={() => handleAnswerChange(ques.id, choice)}
                          id={`radio-${ques.id}-${choice}`}
                        />
                      }
                      label={choice}
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
      </div>
    </>
  )
}

export default PracticeTest
