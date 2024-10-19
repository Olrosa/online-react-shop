import { useState, useEffect } from 'react';
import slide1 from '../../resources/slides/slide1.webp';
import slide2 from '../../resources/slides/slide2.webp';

import './banner.scss';
import '../../style/slider.scss';

const Banner = () => {
    const slides = [
        { img: slide1, num: 0}, { img: slide2, num: 1}
    ];

    const [slide, setSlide] = useState(slides[0]);

    const nextSlide = () => {
        const currentSlideNum = slide.num;
        slides[currentSlideNum + 1] ? setSlide(slides[currentSlideNum + 1]) : setSlide(slides[0]);
    }

    const prevSlide = () => {
        const currentSlideNum = slide.num;
        const slidesLength = slides.length - 1;
        slides[currentSlideNum - 1] ? setSlide(slides[currentSlideNum - 1]) : setSlide(slides[slidesLength]);
    }


    return (
        <div className='slider'>
            <div className='wrapper'>
                <div className='slider-offer'>
                    <div className='slider-slide'>
                        <img className='slider-img' src={slide.img} />
                    </div>
                </div>
                
                <button onClick={prevSlide}>Prev</button>
                <button onClick={nextSlide}>Next</button>
            </div>
        </div>
    )
}

export default Banner;