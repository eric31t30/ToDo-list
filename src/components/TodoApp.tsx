import { useState } from "react"
import { TaskList } from "./TaskList"

export const TodoApp = () => {

  const [newTask, setNewTask] = useState<string> ('')
  const [taskList, setTaskList] = useState<string[]>([])

  const handleAddTask = () =>{
    if(newTask.trim() === '') return
    setTaskList(prevTask => [...prevTask, newTask]);
    setNewTask('')
  }

  const handleBorrarTarea =(index: number)=>{
    setTaskList(task => task.filter((_,i)=> i !== index))
  }

  return (
    <div>
        <h1>Lista de tareas</h1>
        <div className="flex">
            <input 
                type="text" 
                value={newTask}  
                onChange={(e)=> setNewTask(e.target.value)} 
                placeholder="nueva tarea"
            />
            <button onClick={handleAddTask} className="buttonAdd">Agregar Tarea</button>
        </div>
        <TaskList taskList={taskList} deleteTask={handleBorrarTarea}></TaskList>
    </div>
  )
}