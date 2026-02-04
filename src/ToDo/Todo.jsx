import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { useState } from "react";
import "./Todo.css";

export const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (value) => {
    setInputValue(value);
  }

  const handleFormSubmit = (e) => {
     e.preventDefault();
     if(!inputValue) return;
     if(tasks.includes(inputValue)){ 
      setInputValue("");
      return;
    }
     setTasks([...tasks, inputValue]);
     setInputValue("");
  };
   
  const [dateTime, setDateTime] = useState("");
  setInterval(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setDateTime(`${date} - ${time}`);
  }, 1000);
  //console.log(date, time);
  const handleAllClear = () => {
    setTasks([]);
  };
  const handleDelete = (val) => {   
    setTasks(tasks.filter(task => task !== val));
  };
  const handleCheck = () => {
    //alert("Task Completed!");
    
  }
  return (
    <section className="todo-container">
      
      <header className="header">
        <h1>To-Do List</h1>
      </header>
      <h2 className="date-time"> {dateTime}</h2>
      <div className="form">
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            className="todo-input" 
            autoComplete="off" 
            placeholder="Enter a task..."
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          
          <button type="submit" className="todo-btn">
            Add task
          </button>
        </form>
      </div>
      <section className="myUnOrdList">
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="todo-item">
              <span>{task}</span>
              <button className="check-btn" onClick={handleCheck}><FaCheckCircle /></button>
              <button className="delete-btn" onClick={() => handleDelete(task)} ><MdDeleteForever /></button>
              </li>
          ))}
        </ul>
      </section>
       <section >
      <button className="clear-btn" onClick={handleAllClear}> Clear All </button>
    </section> 
    </section>
  );
};
