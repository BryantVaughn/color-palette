import React from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

export default function Palette(props) {
  const colorBoxes = props.colors.map(color => (
    <ColorBox
      background={ color.color }
      name={ color.name }
      id={ color.id }
    />
  ));

  return (
    <div className="Palette">
      <div className="Palette-colors">
        { colorBoxes }
      </div>
    </div>
  );
}
