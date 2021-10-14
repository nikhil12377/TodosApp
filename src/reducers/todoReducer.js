import { v4 as uuid } from "uuid";
const todoReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            const date = Date(Date.now());
            const newTodo = {
                id: uuid(),
                title: action.payload.title,
                desc: action.payload.desc,
                status: "Created",
                created_at: date.toString(),
                due_date: action.payload.dueDate.toString()
            };
            if (state === null) {
                localStorage.setItem("todos", JSON.stringify(newTodo));
                const newState = [newTodo]
                return newState;
            }
            else {
                const newAddTodos = [...state, newTodo];
                localStorage.setItem("todos", JSON.stringify(newAddTodos));
                return newAddTodos;
            }

        case "DELETE_TODO":
            const newDeleteTodos = state.filter((todo) => todo.id !== action.payload);
            localStorage.setItem("todos", JSON.stringify(newDeleteTodos));
            return newDeleteTodos;

        case "UPDATE_TODO":
            const newUpdateTodos = state.map((todo) => todo.id === action.payload.id ? action.payload.newTodo : todo);
            localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
            return newUpdateTodos;

        case "TOGGLE_TODO":
            const todo = state.find((item) => item.id === action.payload.id);
            if (todo) {
                todo.status = action.payload.value;
            }
            const newToggleTodos = [...state]
            localStorage.setItem("todos", JSON.stringify(newToggleTodos));
            return newToggleTodos;

        case "LOAD_TODO":
            return JSON.parse(localStorage.getItem("todos"));

        default:
            return state;
    }
}

export default todoReducer;