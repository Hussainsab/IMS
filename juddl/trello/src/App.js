import "./App.css";
import { TaskProvide } from "./context/TaskContext.js";
import DashBoard from "./pages/DashBoard";
function App() {
  return (
    <div className="App">
      <TaskProvide>
        <DashBoard />
      </TaskProvide>
    </div>
  );
}

export default App;
