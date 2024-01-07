import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SubjectService from '../../../services/subject.service'
import Swal from 'sweetalert2'
import CategoryService from '../../../services/category.service'
import useAuth from '../../../hooks/useAuth'
import Error from '../../errors'
import StepTitle from '../../../components/StepTitle'
import InputEditor from '../../../components/Input/ReactQuill'
import Radio from '@mui/material/Radio'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import Tooltip from '@mui/material/Tooltip'

export const textFieldStyle = {
  '& .MuiInputBase-root': {
    '& input': {
      padding: 1
    }
  }
}

const AddQuestion = () => {
  const { user } = useAuth()
  const [listSubject, setListSubject] = useState([])
  const [selectedSubject, setSelectedSubject] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [listCategory, setListCategory] = useState()
  const [isNotSelectedAnswer, setIsNotSelectedAnswer] = useState(false)
  const [listNotAnswer, setListNotAnswer] = useState([])
  const defaultData = [
    {
      question: '',
      answer: '',
      choices: ['', '', '', '']
    }
  ]
  const dataLocal = localStorage.getItem('questionData') ? JSON.parse(localStorage.getItem('questionData')) : undefined
  const [hasLocalData, setHasLocalData] = useState(false)

  const [data, setData] = useState()

  useEffect(() => {
    SubjectService.getAllSubject().then((res) => {
      setListSubject(res.data.data)
    })
  }, [])

  const handleSubjectChange = (event) => {
    const selected = event.target.value
    setSelectedSubject(selected)
    setSelectedCategory(null)

    const selectedSubject = listSubject.find((subject) => subject.id === selected.id)

    if (selectedSubject) {
      setListCategory(selectedSubject.category)
    } else {
      setListCategory([])
    }
  }

  const handleCategoryChange = (event) => {
    const selected = event.target.value
    setSelectedCategory(selected)
  }

  const handleQuestionChange = (index, newQuestion) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[index].question = newQuestion
      return newData
    })
  }

  const handleAnswerChange = (index, newAnswer) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[index].answer = newAnswer
      return newData
    })
  }

  const handleChoiceChange = (questionIndex, choiceIndex, newChoice) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[questionIndex].choices[choiceIndex] = newChoice
      return newData
    })
  }

  const handleAddQuestion = () => {
    setData([
      ...data,
      {
        question: '',
        answer: '',
        choices: ['', '', '', '']
      }
    ])
  }

  const handleDeleteQuestion = (indexToDelete) => {
    setData((prevData) => {
      const newData = prevData.filter((_, index) => index !== indexToDelete)
      return newData
    })
  }

  const handleAddChoice = (quesIndex) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[quesIndex].choices.push('')
      return newData
    })
  }

  const handleDeleteChoice = (quesIndex, choiceIndex) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[quesIndex].choices = newData[quesIndex].choices.filter((_, index) => index !== choiceIndex)
      return newData
    })
  }

  const handleSubmit = () => {
    if (isNotSelectedAnswer) {
      Swal.fire(
        'LẠY MẸ',
        `Câu hỏi <b>${listNotAnswer.map((data) => (data + 1).toString().split(', '))}</b> chưa chọn đáp án`,
        'warning'
      )
    } else if (data.length === 0) {
      Swal.fire('', 'Vui lòng thêm ít nhất 1 câu hỏi', 'error')
    } else {
      Swal.fire({
        icon: 'warning',
        html: `Bạn có chắc chắn muốn thêm <b>${data.length}</b> câu hỏi cho <br/><b>${selectedCategory.title}</b> của môn học <b>${selectedSubject.title}</b>?`,
        showCancelButton: true,
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Thêm',
        preConfirm: () => {
          Swal.update({
            showCancelButton: false,
            showConfirmButton: false,
            icon: 'info',
            html: 'Đang xử lý...<br/> Vui lòng không tắt trang hoặc trình duyệt'
          })

          CategoryService.addTest(selectedCategory.id, data)
            .then(() => {
              setTimeout(() => {
                Swal.update({
                  icon: 'success',
                  html: `Thêm thành công <b>${data.length}</b> câu hỏi cho <br/><b>${selectedCategory.title}</b> của môn học <b>${selectedSubject.title}</b>`,
                  showConfirmButton: false,
                  showCancelButton: true,
                  cancelButtonText: 'Xác nhận',
                  cancelButtonColor: 'green'
                })
              }, 1000)
            })
            .catch(() => {
              Swal.update({
                icon: 'error',
                html: `Thêm câu hỏi thất bại`,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Xác nhận',
                cancelButtonColor: '#0000cd'
              })
            })

          return false
        }
      })
    }
  }

  useEffect(() => {
    if (data) {
      const questionsWithoutAnswerIndexes = data
        .map((question, index) => (!question.answer || question.answer === '' ? index : -1))
        .filter((index) => index !== -1)
      setListNotAnswer(questionsWithoutAnswerIndexes)

      const isNotSelectedAnswerValue = questionsWithoutAnswerIndexes.length > 0
      setIsNotSelectedAnswer(isNotSelectedAnswerValue)

      localStorage.setItem('questionData', JSON.stringify(data))
    }
  }, [data])

  useEffect(() => {
    if (dataLocal !== undefined && JSON.stringify(dataLocal) !== JSON.stringify(defaultData)) {
      setHasLocalData(true)
    } else {
      setHasLocalData(false)
      setData(defaultData)
    }
  }, [])

  useEffect(() => {
    if (hasLocalData) {
      Swal.fire({
        title: 'Khôi phục dữ liệu',
        html: `Bạn có muốn khôi phục dữ liệu câu hỏi trước đó không ?<br/>Nếu chọn không, toàn bộ dữ liệu trước đó sẽ bị xoá`,
        icon: 'question',
        cancelButtonText: 'Huỷ',
        showCancelButton: true,
        confirmButtonColor: 'green',
        confirmButtonText: 'Khôi phục',
        cancelButtonColor: 'red'
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          setData(dataLocal)
        } else {
          setData(defaultData)
        }
      })
    }
  }, [hasLocalData])

  return (
    <>
      {user.role === 'USER' ? (
        <Error />
      ) : (
        <>
          <Helmet>
            <title>Thêm câu hỏi</title>
          </Helmet>
          <StepTitle title={'Thêm câu hỏi mới'} />
          <Paper className='mb-4 p-4'>
            <FormGroup>
              <FormControl margin='normal'>
                <InputLabel id='label-select-method'>Chọn môn học</InputLabel>
                <Select
                  name='method'
                  labelId='label-select-method'
                  id='select-method'
                  onChange={handleSubjectChange}
                  onLoad={() => <div>Đang tải dữ liệu</div>}
                  label='Chọn môn học'
                  MenuProps={{
                    style: {
                      height: '500px'
                    }
                  }}
                >
                  {listSubject.map((subject) => (
                    <MenuItem key={subject.id} defaultValue={subject} value={subject}>
                      {subject.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
            {selectedSubject && (
              <FormGroup>
                <FormControl margin='normal'>
                  <InputLabel id='label-select-subject'>Chọn phần</InputLabel>
                  <Select
                    onChange={handleCategoryChange}
                    labelId='label-select-subject'
                    id='select-subject'
                    onLoad={() => <div>Đang tải dữ liệu</div>}
                    label='Chọn phần'
                    MenuProps={{
                      style: {
                        height: '500px'
                      }
                    }}
                  >
                    {listCategory.map((category) => (
                      <MenuItem key={category.id} defaultValue={category} value={category}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            )}
          </Paper>

          {selectedCategory && (
            <>
              {data?.map((dataQues, quesIndex) => (
                <Card key={`dataQues_${quesIndex}`} className='mb-4'>
                  <CardHeader
                    title={
                      <>
                        <div className='flex justify-end mb-3 gap-3'>
                          <Button
                            color='info'
                            variant='contained'
                            size='small'
                            onClick={() => handleAddChoice(quesIndex)}
                          >
                            <CheckBoxOutlinedIcon className='mr-2' /> Thêm lựa chọn
                          </Button>
                          <Button
                            color='error'
                            variant='contained'
                            size='small'
                            onClick={() => handleDeleteQuestion(quesIndex)}
                          >
                            <DeleteOutlineOutlinedIcon className='mr-2' /> Xoá câu hỏi
                          </Button>
                        </div>
                      </>
                    }
                  />
                  <CardContent>
                    <div className='flex items-center mb-3'>
                      <div className='md:w-[6%] xs:w-[12%] font-bold'>CÂU {quesIndex + 1}: </div>
                      <div className='w-[45px] h-[43px]'></div>
                      <InputEditor
                        placeholder={'Chưa có nội dung'}
                        value={dataQues.question}
                        handleChange={(e) => handleQuestionChange(quesIndex, e)}
                      />
                    </div>

                    {dataQues.choices.map((choice, choiceIndex) => (
                      <div key={`$dataQues_${quesIndex}_choices_${choiceIndex}`}>
                        <div className='flex items-center mt-3'>
                          <div className='md:w-[6%] xs:w-[12%] flex flex-col'>
                            Chọn {choiceIndex + 1}:{' '}
                            <Button
                              className='!m-0 !p-0 w-fit'
                              color='error'
                              variant='contained'
                              size='small'
                              onClick={() => handleDeleteChoice(quesIndex, choiceIndex)}
                            >
                              Xoá
                            </Button>
                          </div>{' '}
                          <Tooltip title={!choice ? 'Nhập nội dung đáp án trước' : undefined}>
                            <Radio
                              checked={choice && dataQues.answer === choice}
                              name='choice'
                              onChange={(e) => handleAnswerChange(quesIndex, e.target.value)}
                              value={choice}
                            />
                          </Tooltip>
                          <InputEditor
                            placeholder='Chưa có đáp án'
                            value={choice}
                            handleChange={(e) => handleChoiceChange(quesIndex, choiceIndex, e)}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <Button onClick={handleAddQuestion} className='!mt-3' variant='contained'>
                Thêm câu hỏi
              </Button>
            </>
          )}
          {selectedCategory && (
            <div className='fixed top-[1.5%] left-[50%] z-[1000] flex items-center justify-center'>
              <Button variant='contained' color='success' onClick={handleSubmit}>
                Hoàn thành
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default AddQuestion
