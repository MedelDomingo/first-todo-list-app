import React, { useState } from "react";
import Button from "./Button";

import "./Form.css";

export default function Form() {
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescrptionValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue) {
      const newTodo = {
        id: Date.now(), // Unique ID using timestamp
        text: inputValue,
        textDesc: descriptionValue,
        completed: false,
      };
      setTodos([...todos, newTodo]); // Add newTodo object, not just inputValue
      setInputValue("");
      setDescrptionValue("");
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = todos.filter((_, i) => i !== index);
    setTodos(updatedTasks);
  };

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (id, text, description) => {
    setEditId(id);
    setEditText(text);
    setEditDescription(description);
  };

  const handleSave = () => {
    setTodos(
      todos.map((todo, index) =>
        todo.id === editId
          ? { ...todo, text: editText, textDesc: editDescription }
          : todo
      )
    );
    setEditId(null);
    setEditText("");
    setEditDescription("");
  };

  const handleToggleClass = (id) => {
    setTodos(
      todos.map((todo, index) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="md:flex md:items-start md:justify-between">
      <div className="left-nav-wrapper md:w-[30%]">
        <form className="form-wrapper">
          <input
            value={inputValue}
            type="input"
            id="task"
            required
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 focus-visible:outline-0 text-black text-sm block w-full p-2.5 my-2.5"
            placeholder="Add your task here..."
          />
          <textarea
            name="message"
            value={descriptionValue}
            id="taskDescription"
            placeholder="Add task description here..."
            onChange={(e) => setDescrptionValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 focus-visible:outline-0 text-black text-sm block w-full p-2.5 my-2.5"
          ></textarea>
          <Button onClick={handleAdd} />
        </form>
      </div>
      <div className="todo-main-wrapper md:w-[68%]">
        {todos.length !== 0 ? (
          <h2 className="p-3 text-left font-bold">Todo: {todos.length}</h2>
        ) : (
          ""
        )}

        <ul className="todo-list-section  md:pl-[15px] md:border-solid md:border-gray-100 md:border-l-[1px]">
          {todos.length === 0 ? (
            <li className="mb-5 relative fade-in-element text-sm">
              No Task Found ...
            </li>
          ) : (
            ""
          )}

          {todos.map((todo, index) => (
            <li
              className={`${
                todo.completed ? "bg-green-100" : ""
              } mb-5 relative fade-in-element text-sm`}
              key={index}
            >
              <div className="flex items-center xs:mb-4 sm:mb-0">
                <input
                  id="default-checkbox"
                  onChange={() => handleToggleClass(todo.id)}
                  type="checkbox"
                  className="w-5 h-5 text-green-300 mr-3 bg-white-100 rounded-sm focus:ring-0 focus:ring-transparent"
                />
                {editId === todo.id ? (
                  <div className="edit-form-wrapper w-[100%] sm:w-[400px]">
                    <input
                      className="w-[100%] text-sm border-gray-200 outline-0"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <textarea
                      name="message"
                      value={editDescription}
                      id="taskDescription"
                      placeholder="Add task description here..."
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border border-gray-300 focus-visible:outline-0 text-black text-sm block w-full p-2.5 my-2.5"
                    ></textarea>
                    <button
                      className="duration-300 ease-in-out bg-green-400 hover:bg-green-500 cursor-pointer text-xs uppercase p-[10px] bg-green-400 text-white"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="todo-content__wrapper mx-3">
                    <h2 className="bold text-xl">{todo.text}</h2>
                    {todo.textDesc && (
                      <p className="text-gray-400 mt-2">{todo.textDesc}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="options-wrapper sm:absolute sm:right-[15px] sm:top-[15px] sm:mt-0 mt-5 flex items-center justify-center sm:justify-evenly">
                <a
                  href="#"
                  onClick={() => handleEdit(todo.id, todo.text, todo.textDesc)}
                  className="text-blue-500 mr-3"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
