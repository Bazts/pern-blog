import './Input.css'

export const Input = ({ inputType, inputName }) => {
  return (
    <input type={inputType}
      name={inputName}
      className="input-element"
       />
  )
}

export const InputContainer = ({ children, labelTitle }) => {
  return (
    <div className="input-container">
      <label>
        {children}
        <span>{labelTitle}</span>
      </label>
    </div>
  )
}

export const InputWrapper = ({ children }) => {
  return (
    <div className="input-wrapper">
      {children}
    </div>
  )
}
