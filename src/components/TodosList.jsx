import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../actions";
import TodoItem from "./TodoItem";
import DatePicker from "react-datepicker";

export default function TodosList() {
  /**
   * This function capitalize the first word of give string
   * @param {string} string
   * @returns {string}
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const today = new Date();
  return (
    <div className="container flex flex-col items-center m-10">
      <div className="parent-container bg-white ">
        <div className="addtodo-container p-4">
          <input
            className="title bg-gray-200 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:bg-white "
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            placeholder="Todo title"
          />
          <input
            className="desc bg-gray-200 border-2 border-gray-200 rounded text-gray-700 leading-tight  focus:bg-white "
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
          />
          <div className="flex flex-row justify-center py-3">
            <label className="w-20 flex flex-wrap content-center">
              Due Date:
            </label>
            <DatePicker
              minDate={today}
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
            />
          </div>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              if (title === "" || desc === "") {
                alert("Title or Description shouldn't be blank");
              } else {
                dispatch(
                  addTodo(
                    capitalizeFirstLetter(title),
                    capitalizeFirstLetter(desc),
                    dueDate
                  )
                );
                setTitle("");
                setDesc("");
                setDueDate(today);
              }
            }}
          >
            Add Todo
          </button>
        </div>
      </div>
      <div className="todos float-left clear-left">
        {todos.length === 0 ? (
          <h1>No todos</h1>
        ) : (
          todos.map((todo, index) => {
            return <TodoItem key={index} todo={todo} />;
          })
        )}
      </div>
    </div>
  );
}
