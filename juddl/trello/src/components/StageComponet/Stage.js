import React from "react";
import styles from "./Stage.module.css";
import AddTask from "../TaskComponent/AddTask";
import TaskCard from "../TaskComponent/TaskCard";
import { useTaskContext } from "../../context/TaskContext";
import { Droppable } from "react-beautiful-dnd";
const Stage = ({ stageName }) => {
  const { todoList, doingList, doneList } = useTaskContext();
  let taskList = [];

  // console.log("id = ", id);
  if (stageName === "todo") {
    taskList = todoList;
  }

  if (stageName === "doing") {
    taskList = doingList;
  }

  if (stageName === "done") {
    taskList = doneList;
  }

  return (
    <div className={styles.stage}>
      <div className={styles.heading}>
        <h1>{stageName}</h1>
      </div>
      <Droppable droppableId={stageName}>
        {(provided) => (
          <div className={styles.stageContainer}>
            <div
              className={styles.taskList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskList.map((item, index) => (
                <TaskCard
                  key={item.id}
                  title={item.title}
                  id={item.id}
                  stageName={stageName}
                  index={index}
                />
              ))}
            </div>
            <AddTask stageName={stageName} />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Stage;
