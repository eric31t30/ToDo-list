import { useEffect, useState } from 'react'
import '../styles/Task.css'

import deleteIcon from '/icons/delete-icon.svg'
import editIcon from '/icons/edit-icon.svg'
import checkIcon from '/icons/check-icon.svg'
import cancelIcon from '/icons/cancel-icon.svg'
import editButton from '/icons/edit-button.svg'


type Task = {
  task: string
  deleteTask: ()=> void
  editTask: (index: number, text: string)=> void
  index: number
}

export const Task = ({task, deleteTask, editTask, index}: Task) => {

  const [confirmCheck, setConfirmCheck] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>(task);
  
  const checkActive = () => {
    setConfirmCheck(prev => !prev)
  }

  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false)
    }else{
      setIsEditing(true);
    }
    
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }

  const handleSaveTask =()=>{
    editTask(index, newTask)
    setIsEditing(false)
  }

  return (
    <div className="task">
      
      <div className={`check-button ${confirmCheck ? 'check-button-active' : ''} ${isEditing ? 'no-event' : ''}`} onClick={checkActive}>
        <img className="option-icon" src={checkIcon} alt="icon" />
      </div>
        
      <div className={`cont-text  ${isEditing ? 'editing' : ''}`}>
        {isEditing ? (
          <form className='cont-edit-input' id='form'>
            <input 
              type="text"
              value={newTask}
              onChange={handleInputChange}
              className='edit-input'
            />
          </form>
        ) : (
          <span className={`text-task ${confirmCheck ? 'text-task-check' : ''}`}>{task}</span>
        )}
      </div>
      
      <div className='task-options'>
        {isEditing 
          
          ? (<button className='option-button' onClick={handleSaveTask} form='form'>
              <img className="option-icon" src={editButton} alt="icon" />
            </button>) 
            
          : (<button className="option-button" onClick={deleteTask}>
              <img className="option-icon" src={deleteIcon} alt="icon" />
            </button>)
        }
        
          
        <button className="option-button" onClick={handleEditClick}>
          {isEditing 
            ? (<img className="option-icon" src={cancelIcon} alt="icon"/>) 
            : (<img className="option-icon" src={editIcon} alt="icon" />) }
        </button>
      </div>
    </div>
  )
}