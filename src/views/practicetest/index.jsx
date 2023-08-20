import { Card, CardContent, CardHeader, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const PracticeTest = () => {
  const data = [
    {
      question: 'Câu hỏi 1: Nguyễn Minh Trung Nghĩa đẹp trai không ?',
      choices: ['beautiful', 'beautifulx2', 'beautifulx99', 'beautifulx100']
    },
    {
      question: 'Câu hỏi 2: Lê Lan Nhi đẹp gái không ?',
      choices: ['beautiful', 'beautifulx2', 'beautifulx99', 'beautifulx100']
    }
  ]
  return data.map((ques) => (
    <Card key={ques.question} component='div' className='!bg-white outline outline-1 mb-4'>
      <CardHeader title={ques.question} titleTypographyProps={{ fontSize: '1rem' }} />
      <CardContent>
        <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
          <Grid container>
            {ques.choices.map((choice) => (
              <Grid key={choice} lg={6} xs={12}>
                <FormControlLabel value={choice} control={<Radio />} label={choice} />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </CardContent>
    </Card>
  ))
}

export default PracticeTest
