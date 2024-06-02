import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import { MdEdit, MdDelete, MdOutlineDone } from "react-icons/md";
import './styles.css'
import Todolist from './Todolist';

type Props ={
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;

}
const Singletodo = ({todo,todos,setTodos}:Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [ediTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDelete=(id:number)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
  };

  const handleDone=(id:number) => {setTodos(
        todos.map((todo)=>
          todo.id===id?{...todo,isDone:!todo.isDone}:todo)
      );
        setEdit(false);
      }; 
      
  const inputRef = useRef<HTMLInputElement>(null);
      useEffect(() => {
        inputRef.current?.focus();
      }, [edit]);
      

  const handleEdit = (e: React.FormEvent, id:number) => {
      e.preventDefault();

      setTodos(todos.map((todo) => (
        todo.id===id?{...todo,todo:ediTodo}:todo
      )))
    }
  return (
    <form className="todos_single" onSubmit={(e)=> handleEdit(e,todo.id)}>
        {edit? (
            <input value={ediTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos_single--text'/> 
          ): todo.isDone?(
                <s className="todos_single--text">{todo.todo}</s>
              ): (
                <span className="todos_single--text">{todo.todo}</span>
              )}

      <div>
        <span className="icon" onClick={()=>{
          if(!edit && !todo.isDone){
            setEdit(!edit)
          }
        }}>
        <MdEdit />
        </span>
        <span className="icon" onClick={()=>handleDelete(todo.id)}>
        <MdDelete />
        </span>
        <span className="icon" onClick={()=>handleDone(todo.id)}>
        <MdOutlineDone />
        </span>
      </div>
    </form>
  )
}

export default Singletodo