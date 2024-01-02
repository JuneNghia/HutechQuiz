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
import InputEditor from '../../../components/Input/ReactQuill'

const QuesManage = () => {
  const { user } = useAuth()
  const [listSubject, setListSubject] = useState([])
  const [selectedSubjectID, setSelectedSubjectID] = useState('')
  const [selectedCategoryID, setSelectedCategoryID] = useState()
  const [listCategory, setListCategory] = useState()
  const [isFetching, setIsFetching] = useState(false)

  const [data, setData] = useState()

  const handleSubjectChange = (event) => {
    const selected = event.target.value
    setSelectedSubjectID(selected)
    setSelectedCategoryID(null)

    const selectedSubjectID = listSubject.find((subject) => subject.id === selected)

    if (selectedSubjectID) {
      setListCategory(selectedSubjectID.category)
    } else {
      setListCategory([])
    }
  }

  const handleCategoryChange = (event) => {
    const selected = event.target.value
    setSelectedCategoryID(selected)
  }

  const handleQuestionChange = (id, newQuestion) => {}

  const handleAnswerChange = (id, newAnswer) => {}

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
                            <Button
                              color='error'
                              variant='contained'
                              size='small'
                              // onClick={() => handleDeleteQuestion(quesIndex)}
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

                        <InputEditor
                          value={dataQues.question}
                          handleChange={(e) => handleQuestionChange(dataQues.id, e)}
                        />
                      </div>
                      <div className='flex items-center'>
                        <div className='md:w-[8%] xs:w-[10%]  font-bold'>Đáp án: </div>{' '}
                        <InputEditor value={dataQues.answer} handleChange={(e) => handleAnswerChange(dataQues.id, e)}/>
                      </div>

                      {dataQues.choices.map((choice, choiceIndex) => (
                        <div key={`$dataQues_${quesIndex}_choices_${choiceIndex}`}>
                          <div className='flex items-center mt-3'>
                            <div className='md:w-[8%] xs:w-[10%]'>Lựa chọn {choiceIndex + 1}: </div>{' '}
                            <InputEditor value={choice} handleChange={(e) => handleAnswerChange(dataQues.id, e)}/>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    {/* <CardContent>
                      <div className='flex items-center mb-3'>
                        <div className='md:w-[8%] xs:w-[10%] font-bold'>CÂU {quesIndex + 1}: </div>

                        <InputEditor value={dataQues.question} />
                      </div>
                      <div className='flex items-center'>
                        <div className='md:w-[8%] xs:w-[10%]  font-bold'>Đáp án: </div>{' '}
                        <InputEditor value={dataQues.answer} />
                      </div>

                      {dataQues.choices.map((choice, choiceIndex) => (
                        <div key={`$dataQues_${quesIndex}_choices_${choiceIndex}`}>
                          <div className='flex items-center mt-3'>
                            <div className='md:w-[8%] xs:w-[10%]'>Lựa chọn {choiceIndex + 1}: </div>{' '}
                            <InputEditor value={choice} />
                          </div>
                        </div>
                      ))}
                    </CardContent> */}
                  </Card>
                ))
              )}
              {/* <Button onClick={handleAddQuestion} className='!mt-3' variant='contained'>
                Thêm câu hỏi
              </Button> */}
            </>
          )}
          {!isFetching && selectedCategoryID && (
            <div className='fixed top-[20px] left-[270px] z-[1000] flex items-center justify-center'>
              <Button variant='contained' color='success'>
                Hoàn thành
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default QuesManage
