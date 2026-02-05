import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import "./Todo.css";

export const Todo = () => {

  const todoKey = "my-todo-list";

  const [inputValue, setInputValue] = useState("");

  // Load from localStorage safely
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(todoKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [dateTime, setDateTime] = useState("");

  // ✅ Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem(todoKey, JSON.stringify(tasks));
  }, [tasks]);

  // Live Date & Time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime(
        `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Input Change
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // Add Task
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (tasks.some(task => task.text === inputValue)) {
      setInputValue("");
      return;
    }

    setTasks([...tasks, { text: inputValue, done: false }]);
    setInputValue("");
  };

  // Delete Task
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle Check
  const handleCheck = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  };

  // Clear All
  const handleAllClear = () => {
    setTasks([]);
  };

  return (
    <section className="todo-container">

      <header className="header">
        <h1>To-Do List</h1>
      </header>

      <h2 className="date-time">{dateTime}</h2>

      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button type="submit">Add task</button>
      </form>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">

            <span className={task.done ? "checkList" : ""}>
              {task.text}
            </span>

            <button className="check-btn" onClick={() => handleCheck(index)}>
              <FaCheckCircle />
            </button>

            <button className="delete-btn" onClick={() => handleDelete(index)}>
              <MdDeleteForever />
            </button>

          </li>
        ))}
      </ul>

      <button className="clear-btn" onClick={handleAllClear}>
        Clear All
      </button>

    </section>
  );
};
