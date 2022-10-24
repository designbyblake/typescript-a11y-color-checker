import { useState, useEffect, useRef } from 'react';

import styles from './App.module.scss';
// import { Form } from './components/Form/Form';
// import { Contrast } from './components/Contrast/Contrast';
import { ColorsForm } from './components/ColorsForm/ColorsForm';
import { ColorTiles } from './components/ColorTiles/ColorTiles';
import { Color } from './utilities/colors';
import { ContrastResults } from './components/ContrastResults/ContrastResults';
import { TColors } from './types/TColors';

export const App = () => {
  const [colors, setColors] = useState<TColors[]>([
    {
      hex: 'FF00FF',
      rgb: [255, 0, 255],
      key: 123
    },
    {
      hex: '000000',
      rgb: [0, 0, 0],
      key: 1234
    }
  ]);

  const [updatingColor, setUpdatingColor] = useState<number>();
  const colorInput = useRef<HTMLInputElement>(null);

  const removeColor = (index: number) => {
    const theColors = [...colors];
    theColors.splice(index, 1);
    setColors(theColors);
  };

  const updateColor = (index: number, color: string) => {
    const theColors = [...colors];
    theColors[index] = new Color(color);

    setUpdatingColor(index);
    setColors(theColors);
  };

  const addColor = () => {
    setColors([...colors, new Color('')]);
    setUpdatingColor(colors.length);
  };

  useEffect(() => {
    colorInput?.current?.focus();
  }, [colors]);

  return (
    <div className={styles.root}>
      <ColorTiles addColor={addColor}>
        {colors.map((color, index) => (
          <ColorsForm
            hexString={color.hex}
            rgbArray={color.rgb}
            key={color.key}
            index={index}
            removeColor={removeColor}
            updateColor={updateColor}
            ref={updatingColor === index ? colorInput : undefined}
          />
        ))}
      </ColorTiles>

      {colors.length >= 2 && <ContrastResults colors={colors} />}
    </div>
  );
};
