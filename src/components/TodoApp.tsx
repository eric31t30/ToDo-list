import { useEffect, useState } from "react"
import { TaskList } from "./TaskList"
import '../styles/TodoApp.css'
import { v4 as uuidv4 } from 'uuid';

import addIcon from '/icons/add-icon.svg'
import titleIcon from '/icons/task-icon.svg'
import editIcon from '/icons/edit-icon.svg'

interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export const TodoApp = () => {

  const [newTask, setNewTask] = useState<string> ('')
  const [taskList, setTaskList] = useState<Task[]>([
    { id: uuidv4(), task: '- Agrega mas tareas ', completed: false },
  ]);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTaskList((prevTasks) => [...prevTasks, { id: uuidv4(), task: newTask, completed: false }]);
    setNewTask('');
  };

  const handleDeleteTask = (id: string) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setCompletedTasks((prevCompleted) => prevCompleted - (taskList.find((task) => task.id === id)?.completed ? 1 : 0));
  };

  const editTask = (id: string, text: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, task: text } : task))
    );
  };

  
  const toggleTaskCompletion = (id:string, validate: boolean) => {

    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: validate } : task
      )
    );
  };
  
  useEffect(() => {
    const completedCount: number = taskList.filter(task => task.completed).length;
   
    setCompletedTasks(completedCount);
  }, [taskList])
  

  
  return (
    <div className="container-app">
      <div className="counter">
        <span className="text-count"> TAREAS
          <img className="text-count-icon" src={editIcon} alt="icon"/>
          REALIDAS
        </span>
        <span className="task-count">{completedTasks} / {taskList.length}</span>
      </div>
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
        <TaskList 
          taskList={taskList} 
          deleteTask={handleDeleteTask} 
          sendTask={editTask} 
          toggleTaskCompletion={toggleTaskCompletion}>
        </TaskList>
    </div>
  )
}