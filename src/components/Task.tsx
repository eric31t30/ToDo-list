import { useEffect, useState } from 'react'
import '../styles/Task.css'

import deleteIcon from '/icons/delete-icon.svg'
import editIcon from '/icons/edit-icon.svg'
import checkIcon from '/icons/check-icon.svg'
import cancelIcon from '/icons/cancel-icon.svg'
import editButton from '/icons/edit-button.svg'


type Task = {
  task: string
  deleteTask: () => void
  editTask: (index: string, text: string) => void
  id: string
}

interface Dates {
  hour: string
  minute: string
  day: number
  month: number
  year: number
}

export const Task = ({ task, deleteTask, editTask, id }: Task) => {

  const [confirmCheck, setConfirmCheck] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>(task);
  const [creationDate, setCreationDate] = useState<string>('');
  
  const [date, setDate] = useState<Dates>({
    hour: String(new Date().getHours()).padStart(2, '0'),
    minute: String(new Date().getMinutes()).padStart(2, '0'),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  useEffect(() => {
    const hourNumber = parseInt(date.hour, 10);
    const amOrPm = hourNumber >= 12 ? 'PM' : 'AM';
    setCreationDate(`${date.hour}:${date.minute} ${amOrPm},  ${date.day} / ${date.month} / ${date.year}`)
  }, [creationDate])
  

  const checkActive = () => {
    setConfirmCheck(prev => !prev)
  }

  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false)
    } else {
      setIsEditing(true);
    }

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }

  const handleSaveTask = (event: React.FormEvent) => {
    event.preventDefault();
    if(newTask.trim() === '') return
    editTask(id, newTask)
    setIsEditing(false)
  }

  return (
    <div className={`container-task ${confirmCheck ? 'siii' : ''}`}>
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
              ? (<img className="option-icon" src={cancelIcon} alt="icon" />)
              : (<img className="option-icon" src={editIcon} alt="icon" />)}
          </button>
        </div>

    </div>
      <div className='cont-date'>
        <span className='border-space'></span>
        <div className='date'>{creationDate}</div>
      </div>
    </div>
  )
}