/**
 * This function send the object to todoReducer,
 * To add a new todo.
 * @param {string} title represents title of todo
 * @param {string} desc represents description of todo
 * @param {string} dueDate represents due date of todo
 * @returns {Object} an object with title, desc and dueDate
 */
const addTodo = (title, desc, dueDate) => {
    return {
        type: "ADD_TODO",
        payload: { title, desc, dueDate }
    };
};

/**
 * This function send the object to todoReducer,
 * To Delete the todo.
 * @param {string} id represents id of todo
 * @returns {Object} an object with id
 */
const deleteTodo = (id) => {
    return {
        type: "DELETE_TODO",
        payload: id
    };
};


/**
 * This function send the object to todoReducer,
 * To Update the todo
 * @param {Object} newTodo 
 * @param {string} id represents id of todo
 * @returns {Object} an object with newTodo and id
 */
const updateTodo = (newTodo, id) => {
    return {
        type: "UPDATE_TODO",
        payload: { newTodo: newTodo, id: id }
    };
};

/**
 * This function send the object to todoReducer,
 * To change the status of todo
 * @param {string} id represents id of todo
 * @param {string} value represents status of todo
 * @returns  {Object} an object with id and value
 */
const toggleTodo = (id, value) => {
    return {
        type: "TOGGLE_TODO",
        payload: { id, value }
    };
};

/**
 * This function send the object to todoReducer,
 * To load the todo from localstorage
 * @returns {Object}
 */
const loadTodo = () => {
    return {
        type: "LOAD_TODO",
    };
};

export { addTodo, deleteTodo, updateTodo, toggleTodo, loadTodo };
