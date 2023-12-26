import React from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.bubble.css'

const InputEditor = ({ value, handleChange, className, placeholder }) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline'],
    ['link', 'image']
  ]
  const modules = {
    toolbar: toolbarOptions
  }

  return (
    <ReactQuill
      className={`w-full border rounded border-slate-400 ${className}`}
      value={value}
      onChange={(e) => handleChange(e)}
      theme='bubble'
      modules={modules}
      placeholder={placeholder}
    />
  )
}

export default InputEditor
