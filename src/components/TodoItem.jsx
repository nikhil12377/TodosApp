import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../actions";

export default function TodoItem({ todo }) {
  /**
   * This function capitalize the first word of give string
   * @param {string} string
   * @returns {string}
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="todo flex justify-between w-full ">
      {isEditable ? (
        <div className="editable-inputs">
          <input
            placeholder="Title"
            className="bg-gray-200 border-2 border-gray-200 rounded focus:bg-white"
            type="text"
            onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
          />
          <input
            placeholder="Desc"
            className="bg-gray-200 border-2 border-gray-200 rounded focus:bg-white"
            type="text"
            onChange={(e) => setDesc(capitalizeFirstLetter(e.target.value))}
          />
        </div>
      ) : (
        <h4
          className={
            todo.status === "Completed"
              ? "completed contents text-lg overflow-hidden whitespace-nowrap overflow-ellipsis"
              : "contents text-lg"
          }
        >
          {todo.title}
        </h4>
      )}
      <div className="flex flex-row todo-actions">
        {isEditable ? (
          <span
            className="material-icons md-32 "
            onClick={() => {
              console.log(todo);
              if (title === "" || desc === "") {
                alert("Title or Description shouldn't be blank");
              } else {
                dispatch(
                  updateTodo(
                    {
                      id: todo.id,
                      title: title,
                      desc: desc,
                      status: "Updated",
                      updated_at: Date(Date.now()).toString(),
                      due_date: todo.due_date,
                    },
                    todo.id
                  )
                );
                setIsEditable(!isEditable);
              }
            }}
          >
            done
          </span>
        ) : (
          <span
            onClick={() => {
              setIsEditable(!isEditable);
            }}
            className="material-icons"
          >
            edit
          </span>
        )}
        <span
          className="material-icons"
          onClick={() => {
            dispatch(deleteTodo(todo.id));
          }}
        >
          delete
        </span>
        <select
          className="form-select block relative bg-gray-700 hover:bg-gray-900"
          onChange={(e) => {
            dispatch(toggleTodo(todo.id, e.target.value));
          }}
          value={todo.status}
        >
          <option value="Created">
            {todo.status === "Updated" ? "Updated" : "Created"}
          </option>
          <option value="In_Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
