import { Task } from "./Task"
import '../styles/TaskList.css'


type taskList = {
  taskList: string[]
  deleteTask: (index: number) => void
  sendTask: (index: number, text: string) => void
}

export const TaskList = ({taskList, deleteTask, sendTask}: taskList) => {

   return (
    <div className="task-list">
        {taskList.map((task, index)=>(
            <Task key={index} task={task} index={index} deleteTask={()=> deleteTask(index)}  editTask={sendTask}></Task>
        ))}
    </div>
  )
}