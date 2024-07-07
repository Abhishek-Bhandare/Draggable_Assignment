import React, { useState, useRef, useEffect } from 'react';
import '../Draggable.css';

const Draggable = ({ children, title, level }) => {
  const dragRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const parentRect = dragRef.current.parentElement.getBoundingClientRect();
    const rect = dragRef.current.getBoundingClientRect();
    setPosition({
      x: (parentRect.width - rect.width) / 2,
      y: (parentRect.height - rect.height) / 2,
    });
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = dragRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const parentRect = dragRef.current.parentElement.getBoundingClientRect();
      const dragRect = dragRef.current.getBoundingClientRect();
      let newLeft = e.clientX - offset.x - parentRect.left;
      let newTop = e.clientY - offset.y - parentRect.top;

      // Constrain movement within parent
      const maxLeft = parentRect.width - dragRect.width;
      const maxTop = parentRect.height - dragRect.height;

      setPosition({
        x: Math.max(0, Math.min(newLeft, maxLeft)),
        y: Math.max(0, Math.min(newTop, maxTop)),
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const width = 300 + level * 100; // Increase width based on level
  const height = 200 + level * 80; // Increase height based on level

  return (
    <div
      ref={dragRef}
      className="draggable"
      style={{ left: `${position.x}px`, top: `${position.y}px`, width, height }}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>{title}</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Draggable;

