import { useState } from 'react'
import '../styles/Task.css'
import deleteIcon from '/icons/delete-icon.svg'
import editIcon from '/icons/edit-icon.svg'
import checkIcon from '/icons/check-icon.svg'


type Task = {
  task: string
  deleteTask: ()=> void
}

export const Task = ({task, deleteTask}: Task) => {

  const [confirmCheck, setConfirmCheck] = useState<boolean>(false);

  const checkActive =()=>{
    setConfirmCheck(prev => !prev)
  }
  

  return (
    <div className="task">
      
      <div className={`check-button ${confirmCheck ? 'check-button-active' : ''}`} onClick={checkActive}>
        <img className="option-icon" src={checkIcon} alt="icon" />
      </div>
        
      <div className='cont-text'>
        <span className={`text-task ${confirmCheck ? 'text-task-check' : ''}`}>{task}</span>
      </div>
      
      <div className='task-options'>
        <button className="option-button" onClick={deleteTask}>
          <img className="option-icon" src={deleteIcon} alt="icon" />
        </button>
          
        <button className="option-button">
          <img className="option-icon" src={editIcon} alt="icon" />
        </button>
      </div>
    
    </div>
  )
}