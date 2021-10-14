import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { loadTodo, toggleTodo } from "../actions";

/**
 * This function gets executed when a todo gets dragged
 * and placed on any container
 * @param {Object} result
 * @param {Object} columns
 * @param {Function} setColumns
 * @param {Function} dispatch
 * @returns
 */
const onDragEnd = (result, columns, setColumns, dispatch) => {
  console.log(typeof setColumns);
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    dispatch(toggleTodo(removed.id, destColumn.status));
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function Kanban() {
  let todos = useSelector((state) => state.todos);
  if (todos.length === 0) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTodo());
  }, []);

  var createdOrUpdatedTodos = [];
  var inProgressTodos = [];
  var completedTodos = [];

  useEffect(() => {
    todos.map((item) => {
      return item.status === "Created" || item.status === "Updated"
        ? createdOrUpdatedTodos.push(item)
        : item.status === "In_Progress"
        ? inProgressTodos.push(item)
        : completedTodos.push(item);
    });
  }, [todos]);

  const kanbanColumns = {
    [uuid()]: {
      name: "Todos",
      status: "Created",
      items: createdOrUpdatedTodos,
    },
    [uuid()]: {
      name: "In Progress",
      status: "In_Progress",
      items: inProgressTodos,
    },
    [uuid()]: {
      name: "Completed",
      status: "Completed",
      items: completedTodos,
    },
  };

  const [columns, setColumns] = useState(kanbanColumns);
  return (
    <div className="kanban">
      {todos.length === 0 ? (
        <h1>Add Todos to use kanban</h1>
      ) : (
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, columns, setColumns, dispatch)
          }
        >
          {Object.entries(columns).map(([id, column], index) => {
            return (
              <div key={id} className="droppable-container">
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable key={id} droppableId={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "rgb(17, 24, 39)"
                                          : "rgb(55, 65, 81)",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.title}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      )}
    </div>
  );
}
