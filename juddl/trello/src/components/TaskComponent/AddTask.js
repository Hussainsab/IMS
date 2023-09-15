import React, { useState } from "react";
import useDebounce from "../../customHooks/useDebounce";
import { useTaskContext } from "../../context/TaskContext";
import uuid from "react-uuid";
import styles from "./AddTask.module.css";

const AddTask = ({ stageName }) => {
  const { addTask } = useTaskContext();
  const [taskTitle, setTaskTitle] = useState("");
  const handleAddTask = useDebounce(() => {
    if (taskTitle) {
      addTask({
        payload: { title: taskTitle, stageName, id: uuid() },
      });
      setTaskTitle("");
    }
  }, 500);
  const handleInput = (e) => {
    // console.log();
    setTaskTitle(e.target.value);
  };
  return (
    <div className={styles.AddTaskConatiner}>
      <input
        value={taskTitle}
        type="text"
        onChange={handleInput}
        placeholder="Type here to add task"
      />
      <button onClick={handleAddTask}>+</button>
    </div>
  );
};

export default AddTask;
