import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import Kanban from './components/Kanban';
import Navbar from './components/Navbar';
import TodosList from './components/TodosList';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadTodo } from './actions';

function App() {
  const todos = useSelector(state => state.todos);
  if (!localStorage.getItem("todos") && todos.length > 0) {
    localStorage.setItem("todos", todos);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      dispatch(loadTodo());
    }
  }, []);

  useEffect(() => {
    const ids = new Set(todos.map(item => item.id));
    const storedItems = localStorage.getItem("todos");
    if (storedItems !== null && todos !== null) {
      const storedItemsParsed = JSON.parse(storedItems);
      const newTodos = [...todos, ...storedItemsParsed.filter(item => !ids.has(item.id))]
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  }, [todos]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={["/TodosApp", "/"]}>
            <TodosList />
          </Route>
          <Route exact path="/kanban">
            <Kanban />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
