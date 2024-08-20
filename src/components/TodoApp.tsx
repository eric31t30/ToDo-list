import { useEffect, useState } from "react"
import { TaskList } from "./TaskList"
import '../styles/TodoApp.css'
import { v4 as uuidv4 } from 'uuid';

import addIcon from '/icons/add-icon.svg'
import titleIcon from '/icons/task-icon.svg'

export const TodoApp = () => {

  const [newTask, setNewTask] = useState<string> ('')
  const [taskList, setTaskList] = useState([
    { id: uuidv4(), task: '- Agrega mas tareas 📋', completed: false },
  ]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTaskList((prevTasks) => [...prevTasks, { id: uuidv4(), task: newTask, completed: false }]);
    setNewTask('');
  };

  const handleDeleteTask = (id: string) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, text: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, task: text } : task))
    );
  };

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
        <TaskList taskList={taskList} deleteTask={handleDeleteTask} sendTask={editTask}></TaskList>
    </div>
  )
}