import { Task } from "./Task"
import '../styles/TaskList.css'

type taskList = {
  taskList: { id: string; task: string; completed: boolean}[];
  deleteTask: (index: string) => void
  sendTask: (index: string, text: string) => void
  toggleTaskCompletion: (id: string, validate: boolean)=> void
}

export const TaskList = ({taskList, deleteTask, sendTask, toggleTaskCompletion}: taskList) => {

  return (
    <div className="task-list">
      {taskList.map((task)=>(
        <Task 
          key={task.id} 
          task={task.task} 
          id={task.id} 
          deleteTask={()=> deleteTask(task.id)}  
          editTask={(_, text)=> {sendTask(task.id, text)}}
          toggleTaskCompletion={(_, validate)=> toggleTaskCompletion(task.id, validate)}
          completed={task.completed}
          ></Task>
      ))}
    </div>
  )
}