import React from "react";
import styles from "./StageSection.module.css";
import Stage from "./Stage";
const STAGES = ["todo", "doing", "done"];
const StageSection = () => {
  return (
    <div className={styles.stageSection}>
      {STAGES.map((stageName) => {
        return <Stage stageName={stageName} key={stageName} />;
      })}
    </div>
  );
};

export default StageSection;
