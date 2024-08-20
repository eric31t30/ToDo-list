import { Task } from "./Task"
import '../styles/TaskList.css'


type taskList = {
  taskList: { id: string; task: string; completed: boolean; }[];
  deleteTask: (index: string) => void
  sendTask: (index: string, text: string) => void
}

export const TaskList = ({taskList, deleteTask, sendTask}: taskList) => {

   return (
    <div className="task-list">
      {taskList.map((task)=>(
        <Task key={task.id} task={task.task} id={task.id} deleteTask={()=> deleteTask(task.id)}  editTask={(text)=> sendTask(task.id, text)}></Task>
      ))}
    </div>
  )
}