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
import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import Error from '../../errors'
import { Helmet } from 'react-helmet'
import SubjectService from '../../../services/subject.service'
import CategoryService from '../../../services/category.service'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InputEditor from '../../../components/Input/ReactQuill'
import StepTitle from '../../../components/StepTitle'
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio'
import Tooltip from '@mui/material/Tooltip'

const QuesManage = () => {
  const { user } = useAuth()
  const [listSubject, setListSubject] = useState([])
  const [selectedSubjectID, setSelectedSubjectID] = useState('')
  const [selectedSubjectName, setSelectedSubjectName] = useState('')
  const [selectedCategoryID, setSelectedCategoryID] = useState()
  const [listCategory, setListCategory] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [listEditQuestion, setListEditQuestion] = useState([])

  const [data, setData] = useState()

  const handleSubjectChange = (event) => {
    const selected = event.target.value
    setSelectedSubjectID(selected)
    setSelectedCategoryID(null)

    const selectedSubjectID = listSubject.find((subject) => subject.id === selected)

    if (selectedSubjectID) {
      setListCategory(selectedSubjectID.category)
      setSelectedSubjectName(selectedSubjectID.title)
    } else {
      setListCategory([])
    }
  }

  console.log(selectedSubjectName)

  const handleCategoryChange = (event) => {
    const selected = event.target.value
    setSelectedCategoryID(selected)
  }

  const handleQuestionChange = (quesId, newQuestion) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === quesId) {
          return { ...item, question: newQuestion }
        }
        return item
      })
    })
  }

  const handleAnswerChange = (quesId, newAnswer) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === quesId) {
          return { ...item, answer: newAnswer }
        }
        return item
      })
    })
  }

  const handleChoiceChange = (quesId, choiceIndex, newChoice) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === quesId) {
          return {
            ...item,
            choices: item.choices.map((choice, index) => (index === choiceIndex ? newChoice : choice))
          }
        }
        return item
      })
    })
  }

  const handleEditQuestion = (quesId) => {
    if (listEditQuestion.length === 5) {
      Swal.fire(
        'Lỗi',
        'Bạn chỉ có thể sửa cùng lúc tối đa 5 câu hỏi, vui lòng nhấn nút hoàn thành các câu hỏi đã sửa trước. <br/><b>Mục đích những máy nào dởm dởm thì đỡ lag</b>',
        'error'
      )
    } else {
      setListEditQuestion((prev) => {
        const newData = [...prev]
        newData.push(quesId)
        return newData
      })
    }
  }

  const handleFinishQuestion = (quesId) => {
    setListEditQuestion((prev) => {
      const newData = prev.filter((item) => item !== quesId)
      return newData
    })
  }

  const handleDeleteQuestion = (quesId) => {
    if (data.length === 1) {
      Swal.fire('Djt Me', 'Xoá hết câu hỏi thì lấy gì mà lưu ???', 'error')
    } else {
      setData((prev) => {
        const newData = prev.filter((item) => item.id !== quesId)
        return newData
      })
    }
  }

  const handleSubmit = () => {
    const dataTest = data.map((ques) => ({
      id: ques.id,
      question: ques.question,
      answer: ques.answer,
      choices: ques.choices
    }))

    Swal.fire({
      icon: 'question',
      html: `Xác nhận lưu các chỉnh sửa câu hỏi cho môn học <br/><b>${selectedSubjectName}</b>`,
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

        CategoryService.editTest(selectedCategoryID, dataTest)
          .then(() => {
            setTimeout(() => {
              Swal.update({
                title: 'Xin Chúc Mừng',
                icon: 'success',
                html: `Cập nhật dữ liệu môn học <b>${selectedSubjectName}</b> thành công`,
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
              html: `Cập nhật câu hỏi thất bại`,
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

  useEffect(() => {
    SubjectService.getAllSubject().then((res) => {
      setListSubject(res.data.data)
    })
  }, [])

  useEffect(() => {
    if (selectedCategoryID) {
      setIsFetching(true)
      CategoryService.getQuesById(selectedCategoryID)
        .then((res) => {
          if (res.data.data) {
            setIsFetching(false)
            setData(res.data.data)
          }
        })
        .catch((err) => {
          console.log(err)
          setIsFetching(false)
        })
    }
  }, [selectedCategoryID])

  return (
    <>
      {user.role === 'USER' ? (
        <Error />
      ) : (
        <>
          <Helmet>
            <title>Quản lý câu hỏi</title>
          </Helmet>
          <StepTitle title={'Quản lý câu hỏi'} />
          <Paper className='mb-4 p-4'>
            <FormGroup>
              <FormControl margin='normal'>
                <InputLabel id='label-select-subject'>Chọn môn học</InputLabel>
                <Select
                  name='subject'
                  labelId='label-select-subject'
                  id='select-subject'
                  value={selectedSubjectID}
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
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
            {selectedSubjectID && (
              <FormGroup>
                <FormControl margin='normal'>
                  <InputLabel id='label-select-subject'>Chọn phần</InputLabel>
                  <Select
                    onChange={handleCategoryChange}
                    labelId='label-select-subject'
                    id='select-subject'
                    onLoad={() => <div>Đang tải dữ liệu</div>}
                    label='Chọn phần'
                    value={selectedCategoryID}
                    MenuProps={{
                      style: {
                        height: '500px'
                      }
                    }}
                  >
                    {listCategory.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            )}
          </Paper>

          {selectedCategoryID && (
            <>
              {isFetching ? (
                <div>Đang tải dữ liệu học phần...</div>
              ) : (
                data &&
                data.map((dataQues, quesIndex) => (
                  <Card key={dataQues.id} className='mb-4'>
                    <CardHeader
                      title={
                        <>
                          <div className='flex justify-end mb-3'>
                            {!listEditQuestion.find((item) => item === dataQues.id) && (
                              <div className='flex gap-4'>
                                <Button
                                  onClick={() => handleEditQuestion(dataQues.id)}
                                  color='warning'
                                  size='small'
                                  variant='contained'
                                >
                                  <EditOutlinedIcon className='mr-2' />
                                  Sửa câu hỏi
                                </Button>
                                <Button
                                  color='error'
                                  variant='contained'
                                  size='small'
                                  onClick={() => handleDeleteQuestion(dataQues.id)}
                                >
                                  <DeleteOutlineOutlinedIcon className='mr-2' /> Xoá câu hỏi
                                </Button>
                              </div>
                            )}

                            {listEditQuestion.find((item) => item === dataQues.id) && (
                              <Button
                                color='success'
                                variant='contained'
                                size='small'
                                onClick={() => handleFinishQuestion(dataQues.id)}
                              >
                                <CheckCircleOutlineOutlinedIcon className='mr-2' />
                                Hoàn thành
                              </Button>
                            )}
                          </div>
                        </>
                      }
                    />
                    <CardContent>
                      <div className='flex items-center mb-3'>
                        <div className='md:w-[6%] xs:w-[12%] font-bold'>CÂU {quesIndex + 1}: </div>

                        {listEditQuestion.find((item) => item === dataQues.id) ? (
                          <>
                            <div className='w-[45px] h-[43px]'></div>
                            <InputEditor
                              placeholder={'Chưa có nội dung'}
                              value={dataQues.question}
                              handleChange={(e) => handleQuestionChange(dataQues.id, e)}
                            />
                          </>
                        ) : (
                          <p dangerouslySetInnerHTML={{ __html: dataQues.question }} />
                        )}
                      </div>

                      {dataQues.choices.map((choice, choiceIndex) => (
                        <div key={`$dataQues_${quesIndex}_choices_${choiceIndex}`}>
                          <div className='flex items-center mt-3'>
                            <div
                              className={`md:w-[6%] xs:w-[12%] ${
                                dataQues.answer === choice && 'font-bold text-green-500'
                              }`}
                            >
                              Lựa chọn {choiceIndex + 1}:{' '}
                            </div>{' '}
                            {listEditQuestion.find((item) => item === dataQues.id) ? (
                              <>
                                <Tooltip title={!choice ? 'Nhập nội dung đáp án trước' : undefined}>
                                  <Radio
                                    checked={choice && dataQues.answer === choice}
                                    name='choice'
                                    onChange={(e) => handleAnswerChange(dataQues.id, e.target.value)}
                                    value={choice}
                                  />
                                </Tooltip>
                                <InputEditor
                                  placeholder='Chưa có đáp án'
                                  value={choice}
                                  handleChange={(e) => handleChoiceChange(dataQues.id, choiceIndex, e)}
                                />
                              </>
                            ) : (
                              <p dangerouslySetInnerHTML={{ __html: choice }} />
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}
          {!isFetching && selectedCategoryID && (
            <div className='fixed top-[1.5%] left-[50%] z-[1000] flex items-center justify-center'>
              <Button onClick={handleSubmit} variant='contained' color='success'>
                <SaveOutlinedIcon className='mr-2' /> Lưu
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default QuesManage
