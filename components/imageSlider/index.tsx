import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useState, useEffect } from 'react';

// const images = [
//     {
//         source: 'https://estudioluismena.com/wp-content/uploads/2020/10/LMR6897-scaled.jpg'
//     },
//     {
//         source: 'https://estudioluismena.com/wp-content/uploads/2020/10/LMR_8144-AUMENT-scaled.jpg'
//     },
//     {
//         source: 'https://estudioluismena.com/wp-content/uploads/2020/10/LMR4190-scaled.jpg'
//     }
// ];

interface SliderProps {
    images: Array<any>
}


export const ImageSlider = ({ images }: SliderProps) => {

    const [selected, setSelected] = useState<number>(0);

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