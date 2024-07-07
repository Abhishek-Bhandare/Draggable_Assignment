import React, { useState } from 'react';
import Draggable from './components/Draggable';
import './App.css';

const App = () => {
  const [draggableTree, setDraggableTree] = useState({
    level: 0,
    title: 'Title',
    component: (
      <Draggable level={0} title="Title"/>
    ),
  });

  const addParent = () => {
    setDraggableTree((prevState) => {
      const newLevel = prevState.level + 1;
      const newTitle = `Title`;
      return {
        level: newLevel,
        title: newTitle,
        component: (
          <Draggable level={newLevel} title={newTitle}>
            {prevState.component}
          </Draggable>
        ),
      };
    });
  };

  return (
    <div className="app">
    <button style={{margin:"20px"}} onClick={addParent}>Add Parent</button>
      <div className="container">{draggableTree.component}</div>
      
    </div>
  );
};

export default App;

