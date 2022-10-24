import { TColors } from '../../types/TColors';
import { useContrast } from './useContrast';
import { Contrast } from '../Contrast/Contrast';
import { ColorTile } from '../ColorTile/ColorTile';
import styles from './ContrastResults.module.scss';

export const ContrastResults = ({ colors }: TContrastResults) => {
  const { contrastRatio } = useContrast(colors);

  return (
    <>
      <h2>Contrast Results</h2>
      {contrastRatio?.map((ratio) => {
        return (
          <div className={styles.root} key={`${ratio.color1} ${ratio.color2}`}>
            <h2>Contrast Ratio: {ratio.contrast}</h2>
            <div className={styles['color-tiles']}>
              <ColorTile hexString={ratio.color1} rgbArray={ratio.color1rgb} />
              <ColorTile hexString={ratio.color2} rgbArray={ratio.color2rgb} />
            </div>

            <div className={styles.examples}>
              <Contrast color1={ratio.color1} color2={ratio.color2} />
              <Contrast color1={ratio.color2} color2={ratio.color1} />
            </div>
          </div>
        );
      })}
    </>
  );
};

type TContrastResults = {
  colors: TColors[];
};
