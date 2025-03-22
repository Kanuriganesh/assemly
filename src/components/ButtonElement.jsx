import React from 'react'
const ButtonElement = (props) => {
  return (
    <button
            key={props.letter.id}
            style={{
              width: "40px",
              height: "40px",
              background: props.letter.correct ? "#10A95B" :props.letter.incorrect? "#EC5D49":"#FCBA29",
              border: "none",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer", 
              borderRadius:"4px"
            }}  
            onClick={()=>props.updateButtonElement(props.letter.id)}
          >
            {props.
            letter.letter}
          </button>
  )
}
export default ButtonElement