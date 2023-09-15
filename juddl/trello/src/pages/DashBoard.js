import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useTaskContext } from "../context/TaskContext";
import BoardSection from "../components/BoardComponet/BoardSection";
import StageSection from "../components/StageComponet/StageSection";

const DashBoard = () => {
  const { changeTaskStage } = useTaskContext();
  const onDragEnd = (result) => {
    changeTaskStage(result);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardSection />
        <StageSection />
      </DragDropContext>
    </>
  );
};

export default DashBoard;
