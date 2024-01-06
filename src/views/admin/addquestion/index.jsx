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

  const [data, setData] = useState([
    {
      question: '',
      answer: '',
      choices: ['', '', '', '']
    }
  ])

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

  const handleSubmit = () => {
    if (data.length === 0) {
      Swal.fire('', 'Vui lòng thêm ít nhất 1 câu hỏi', 'error')
    } else {
      Swal.fire({
        icon: 'warning',
        html: `Pé có chắc chắn muốn thêm <b>${data.length}</b> câu hỏi cho <br/><b>${selectedCategory.title}</b> của môn học <b>${selectedSubject.title}</b>?`,
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

  return (
    <>
      {user.role === 'USER' ? (
        <Error />
      ) : (
        <>
          <Helmet>
            <title>Thêm câu hỏi</title>
          </Helmet>
          <StepTitle title={'Thêm câu hỏi mới'}/>
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
              {data.map((dataQues, quesIndex) => (
                <Card key={`dataQues_${quesIndex}`} className='mb-4'>
                  <CardHeader
                    title={
                      <>
                        <div className='flex justify-end mb-3'>
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
                      <div className='md:w-[8%] xs:w-[10%] font-bold'>CÂU {quesIndex + 1}: </div>

                      <InputEditor value={dataQues.question} handleChange={(e) => handleQuestionChange(quesIndex, e)} />
                    </div>
                    <div className='flex items-center'>
                      <div className='md:w-[8%] xs:w-[10%]  font-bold'>Đáp án: </div>{' '}
                      <InputEditor value={dataQues.answer} handleChange={(e) => handleAnswerChange(quesIndex, e)} />
                    </div>

                    {dataQues.choices.map((choice, choiceIndex) => (
                      <div key={`$dataQues_${quesIndex}_choices_${choiceIndex}`}>
                        <div className='flex items-center mt-3'>
                          <div className='md:w-[8%] xs:w-[10%]'>Lựa chọn {choiceIndex + 1}: </div>{' '}
                          <InputEditor
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
