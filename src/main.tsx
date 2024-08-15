import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { TodoApp } from './components/ToDoApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoApp></TodoApp>
  </StrictMode>,
)
