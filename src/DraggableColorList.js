import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      { colors.map((color, i) => (
        <DraggableColorBox
          color={ color.color }
          index={ i }
          key={ color.name }
          name={ color.name }
          handleClick={ () => removeColor(color.name) }
        />
      ))}
    </div>
  );
})

export default DraggableColorList;