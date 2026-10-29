import AwesomeSliderImport from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useState, useEffect } from 'react';

const AwesomeSlider = (AwesomeSliderImport as { default?: typeof AwesomeSliderImport }).default ?? AwesomeSliderImport;

interface SliderProps {
    images: Array<any>
}

export const ImageSlider = ({ images }: SliderProps) => {

    const [selected, setSelected] = useState(0);

    const getNextImageIndex = (p: number): number => {
        if (p >= images.length - 1) return 0;
        return p + 1
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSelected((selected) => getNextImageIndex(selected))
        }, 5000)
        return () => clearInterval(interval);
    }, []);

    return <>
        <AwesomeSlider
            selected={selected}
            media={images}
            fillParent={true}
            bullets={false}
        >
        </AwesomeSlider >
    </>
};