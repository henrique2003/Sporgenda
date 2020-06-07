import React from 'react'
import './style.css'

interface Props {
  type: string
  placeholder: string
  title: string
  name?: string
  value?: string | number
  onChange: Function
  className?: string
}

const FormInput: React.FC<Props> = ({ type, placeholder, title, className, onChange, name }) => {
  return (
    <div className={`wrapper_input ${className ?? ''}`}>
      <header>
        <div></div><p>{title}</p>
      </header>
      <input
        type={type}
        placeholder={placeholder}
        required={true}
        name={name}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default FormInput
