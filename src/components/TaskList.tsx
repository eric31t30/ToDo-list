import { Task } from "./Task"
import '../styles/TaskList.css'

type taskList = {
  taskList: string[]
  deleteTask: (index: number) => void
}

export const TaskList = ({taskList, deleteTask}: taskList) => {
  return (
    <div className="task-list">
        {taskList.map((task, index)=>(
            <Task key={index} task={task} deleteTask={()=> deleteTask(index) }></Task>
        ))}
    </div>
  )
}