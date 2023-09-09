import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { TiDelete } from "react-icons/ti";
import { FcCheckmark, FcEditImage } from "react-icons/fc";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    setTodos([...todos, {list : todo, id: Date.now(), status: false }]);
    console.log(todos);
    setTodo("");
  };

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id)=>{
    setTodos(todos.filter((item) => item.id !==id))
    
  }

  const onComplete = (id)=>{
    let complete = todos.map((item)=>{
        if (item.id === id){
            return ({...item, status : !item.staus})
        }
        return item
    } )
    setTodos(complete)
  }

  const onEdit= (id)=>{
    const editTodo = todos.find((item)=> item.id === id)
    setTodo(editTodo.list)
  }

  return (
    <div className="container">
      <h2 className="heading">TO-DO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          onChange={(event) => setTodo(event.target.value)}
          ref={inputRef}
          value={todo}
          type="text"
          placeholder="enter your Todo"
          className="form-control"
        />
        <button onClick={addTodo} className="addBtn">
          Add
        </button>
      </form>
      <div>
        <ul className="list">
          {todos.map((item) => (
            <li className="list-items">
              <div className="list-item-list" id={item.status? "list-item": ""}>{item.list}</div>
              <span>
                <FcCheckmark
                  className="list-item-icons"
                  title="Complete"
                  id="complete"
                onClick={()=>onComplete(item.id)}
                />
                <FcEditImage
                  className="list-item-icons"
                  title="Edit"
                  id="edit"
                  onClick={()=>onEdit(item.id)}
                />
                <TiDelete
                  className="list-item-icons"
                  title="Delete"
                  id="delete"
                  onClick={()=>onDelete(item.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
