import React, { useState } from "react";
import Button from "./Button";

export default function Form() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(), // Unique ID using timestamp
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]); // Add newTodo object, not just inputValue
      setInputValue("");
    }
  };
  const handleDelete = (index) => {
    const updatedTasks = todos.filter((_, i) => i !== index);
    setTodos(updatedTasks);
  };

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = () => {
    setTodos(
      todos.map((todo, index) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
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
        <form className="form-wrapper flex items-center justify-evenly ">
          <input
            value={inputValue}
            type="input"
            id="task"
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 focus-visible:outline-0 text-black text-sm block w-full p-2.5 my-2.5"
            placeholder="Add your task here..."
          />
          <Button onClick={handleAdd} />
        </form>
        <ul className="hidden">
          <li className="flex items-center p-5">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
              />
            </svg>
            <a href="#" className="ml-3">
              Dashboard
            </a>
          </li>
          <li className="flex items-center p-5">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
              />
            </svg>
            <a href="#" className="ml-3">
              My tasks
            </a>
          </li>
        </ul>
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
                todo.completed ? "bg-green-200" : ""
              } mb-5 relative fade-in-element text-sm`}
              key={index}
            >
              <div class="flex items-center xs:mb-4 sm:mb-0">
                <input
                  id="default-checkbox"
                  onChange={() => handleToggleClass(todo.id)}
                  type="checkbox"
                  class="w-5 h-5 text-green-300 mr-3 bg-white-100 rounded-sm focus:ring-0 focus:ring-transparent"
                />
                {editId === todo.id ? (
                  <div className="edit-form-wrapper w-[100%] sm:w-[400px] flex items-center">
                    <input
                      className="w-[100%] text-sm border-gray-200 outline-0"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="duration-300 ease-in-out bg-green-400 hover:bg-green-500 cursor-pointer text-xs uppercase ml-[10px] p-[10px] bg-green-400 text-white"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  todo.text
                )}
              </div>
              <div className="options-wrapper sm:absolute sm:right-[15px] sm:top-[15px] sm:mt-0 mt-5 flex items-center justify-center sm:justify-evenly">
                <a
                  href="#"
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="text-blue-500 mr-3"
                >
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
