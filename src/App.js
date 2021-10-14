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
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
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
