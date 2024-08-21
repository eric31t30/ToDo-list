import { useEffect, useState } from 'react'
import '../styles/Task.css'
import deleteIcon from '/icons/delete-icon.svg'
import editIcon from '/icons/edit-icon.svg'
import checkIcon from '/icons/check-icon.svg'
import cancelIcon from '/icons/cancel-icon.svg'
import editButton from '/icons/edit-button.svg'

type TaskProps = {
  task: string;
  deleteTask: () => void;
  editTask: (id: string, text: string) => void;
  id: string;
  toggleTaskCompletion: (id: string, validate: boolean) => void;
  completed: boolean;
}

interface Dates {
  hour: string;
  minute: string;
  day: number;
  month: number;
  year: number;
}

export const Task = ({ task, deleteTask, editTask, id, toggleTaskCompletion, completed }: TaskProps) => {
  const [confirmCheck, setConfirmCheck] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>(task);
  const [creationDate, setCreationDate] = useState<string>('');

  const date: Dates = {
    hour: String(new Date().getHours()).padStart(2, '0'),
    minute: String(new Date().getMinutes()).padStart(2, '0'),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };

  useEffect(() => {
    const hourNumber = parseInt(date.hour, 10);
    const amOrPm = hourNumber >= 12 ? 'PM' : 'AM';
    setCreationDate(`${date.hour}:${date.minute} ${amOrPm},  ${date.day} / ${date.month} / ${date.year}`);
  }, [creationDate]);

  const checkActive = () => {
    setConfirmCheck(prev => !prev);
  }

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
    
  }

  const handleSaveTask = (event: React.FormEvent) => {
    event.preventDefault();
    if(newTask.trim() === '') return;
    editTask(id, newTask);
    setIsEditing(false);
  }

  useEffect(() => {
    toggleTaskCompletion(id, confirmCheck);
  }, [confirmCheck]);

  useEffect(() => {
    setConfirmCheck(completed);
  }, [completed]);

  return (
    <div className={`container-task`}>
      <div className="task">
        <div className={`check-button ${confirmCheck ? 'check-button-active' : ''} ${isEditing ? 'no-event' : ''}`} onClick={checkActive}>
          <img className="option-icon" src={checkIcon} alt="icon" draggable="false" />
        </div>

        <div className={`cont-text ${isEditing ? 'editing' : ''}`}>
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
                <img className="option-icon" src={editButton} alt="icon" draggable="false"/>
              </button>)
            : (<button className="option-button" onClick={deleteTask}>
                <img className="option-icon" src={deleteIcon} alt="icon" draggable="false" />
              </button>)
          }
          <button className="option-button" onClick={handleEditClick}>
            {isEditing
              ? (<img className="option-icon" src={cancelIcon} alt="icon" draggable="false" />)
              : (<img className="option-icon" src={editIcon} alt="icon" draggable="false" />)}
          </button>
        </div>
      </div>
      <div className='cont-date' draggable='false'>
        <span className='border-space'></span>
        <div className='text-space'>este texto es para brindar un espacio</div>
        <div className='date'>{creationDate}</div>
      </div>
    </div>
  );
}
