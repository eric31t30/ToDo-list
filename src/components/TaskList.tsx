import { Task } from "./Task"

type taskList = {
    taskList: string[]
    deleteTask: (index: number) => void
}

export const TaskList = ({taskList, deleteTask}: taskList) => {
  return (
    <div className="taskList">
        {taskList.map((task, index)=>(
            <Task key={index} task={task} deleteTask={()=> deleteTask(index)}></Task>
        ))}
    </div>
  )
}