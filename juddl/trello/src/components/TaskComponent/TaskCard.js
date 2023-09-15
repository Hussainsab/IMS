import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./TaskCard.module.css";

const TaskCard = ({ title, id, stageName, index }) => {
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided) => (
        <div
          className={styles.taskCardContainer}
          id={id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{title}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
