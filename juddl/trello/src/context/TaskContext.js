import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getData } from "../customHooks/getData";

const TaskContext = createContext();
const initialState = { todoList: [], doingList: [], doneList: [] };
function reducer(state, action) {
  switch (action.type) {
    case "addToTodoList":
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case "addToDoingList":
      return {
        ...state,
        doingList: [...state.doingList, action.payload],
      };
    case "addToDoneList":
      return {
        ...state,
        doneList: [...state.doneList, action.payload],
      };
    case "removeFromTodoList":
      return {
        ...state,
        todoList: [...action.payload],
      };
    case "removeFromDoingList":
      return {
        ...state,
        doingList: [...action.payload],
      };
    case "removeFromDoneList":
      return {
        ...state,
        doneList: [...action.payload],
      };

    default:
      return;
  }
}
const TaskProvide = ({ children }) => {
  const [{ todoList, doingList, doneList }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // to get the data on initial render from the json file

  async function fetchData() {
    let data = await getData();
    if (data) {
      dispatch({
        type: "removeFromTodoList",
        payload: [...data.taskTodos.todoList],
      });
      dispatch({
        type: "removeFromDoingList",
        payload: [...data.taskTodos.doingList],
      });
      dispatch({
        type: "removeFromDoneList",
        payload: [...data.taskTodos.doneList],
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  //To add new task depending on the stagefrom the task is generated
  const addTask = (data) => {
    if (data.payload.stageName === "todo") {
      dispatch({ type: "addToTodoList", payload: data.payload });
    } else if (data.payload.stageName === "doing") {
      dispatch({ type: "addToDoingList", payload: data.payload });
    } else if (data.payload.stageName === "done") {
      dispatch({ type: "addToDoneList", payload: data.payload });
    }
  };

  const changeTaskStage = (result) => {
    //not performing any operation if destination idex is null
    if (!result.destination) return;
    let destinationStage = result.destination.droppableId;
    let sourceStage = result.source.droppableId;
    let destinationIndex = result.destination.index;
    let sourceIndex = result.source.index;
    // console.log("sourceStage", sourceStage, doneList);

    if (sourceStage === "todo") {
      let sourceData = [...todoList];
      let destinationData = [];
      // taskStage = sourceData.indexOf((item) => item.id === taskId);
      let removedData = { ...sourceData.splice(sourceIndex, 1)[0] };
      dispatch({ type: "removeFromTodoList", payload: sourceData });
      if (destinationStage === "todo") {
        sourceData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromTodoList", payload: sourceData });
      } else if (destinationStage === "doing") {
        removedData.stageName = "doing";
        destinationData = [...doingList];
        destinationData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromDoingList", payload: destinationData });
      } else {
        removedData.stageName = "done";
        destinationData = [...doneList];
        destinationData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromDoneList", payload: destinationData });
      }
    } else if (sourceStage === "doing") {
      let sourceData = [...doingList];
      let destinationData = [];
      // taskStage = sourceData.indexOf((item) => item.id === taskId);
      let removedData = { ...sourceData.splice(sourceIndex, 1)[0] };
      dispatch({ type: "removeFromDoingList", payload: sourceData });
      if (destinationStage === "doing") {
        sourceData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromDoingList", payload: sourceData });
      } else if (destinationStage === "todo") {
        removedData.stageName = "todo";
        destinationData = [...todoList];
        destinationData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromTodoList", payload: destinationData });
      } else {
        removedData.stageName = "done";
        destinationData = [...doneList];
        destinationData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromDoneList", payload: destinationData });
      }
    } else {
      let sourceData = [...doneList];
      let destinationData = [];
      // taskStage = sourceData.indexOf((item) => item.id === taskId);
      let removedData = { ...sourceData.splice(sourceIndex, 1)[0] };
      dispatch({ type: "removeFromDoneList", payload: sourceData });
      if (destinationStage === "done") {
        sourceData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromDoneList", payload: sourceData });
      } else if (destinationStage === "todo") {
        removedData.stageName = "todo";
        destinationData = [...todoList];
        destinationData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromTodoList", payload: destinationData });
      } else {
        removedData.stageName = "doing";
        destinationData = [...doingList];
        destinationData.splice(destinationIndex, 0, removedData);
        dispatch({ type: "removeFromDoingList", payload: destinationData });
      }
    }
  };

  return (
    <TaskContext.Provider
      value={{ addTask, todoList, doingList, doneList, changeTaskStage }}
    >
      {children}
    </TaskContext.Provider>
  );
};
const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context) {
    return context;
  }
  throw new Error("Context used outside the boundry");
};
export { TaskProvide, useTaskContext };
