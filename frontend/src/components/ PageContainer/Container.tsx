import React, { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      {children}
    </div>
  );
};

export default Container;
