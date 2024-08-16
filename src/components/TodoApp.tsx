import { useState } from "react"
import { TaskList } from "./TaskList"
import '../styles/TodoApp.css'

import addIcon from '/icons/add-icon.svg'
import titleIcon from '/icons/task-icon.svg'

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
    <div className="container-app">
      <h1 className="title"><img className="title-icon" src={titleIcon} alt="icon" />TO<span>DO</span></h1>
        <div className="flex">
            <input 
                type="text" 
                value={newTask}  
                onChange={(e)=> setNewTask(e.target.value)} 
                placeholder="nueva tarea"
            />
            <button onClick={handleAddTask} className="button-add"><img className="add-icon" src={addIcon} alt="icon" /></button>
        </div>
        <TaskList taskList={taskList} deleteTask={handleBorrarTarea}></TaskList>
    </div>
  )
}