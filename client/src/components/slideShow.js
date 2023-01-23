import c from "../helpers/images/c.jpeg"
import fullStack from "../helpers/images/fullStack.jpg"
import js from "../helpers/images/js.png"
import python from "../helpers/images/python.jpg"
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./slide.css"


const slideImages = [
    {
      url: python,
      caption: 'Slide 1'
    },
    {
      url: fullStack,
      caption: 'Slide 2'
    },
    {
      url: c,
      caption: 'Slide 3'
    },
    {
      url: js,
      caption: 'Slide 4'
    },
  ];


const Slideshow = () => {
    return (
       
              <div className="slide-container" style={{height: '100%', width: '100%'}}>
                <Slide>
                 {slideImages.map((slideImage, index)=> (
                    <div className="each-slide" style={{height: '100%', width: '100%'}} key={index}>
                     <img src={slideImage.url} style={{height: '100%', width: '100%'}} />
                        <span>{slideImage.caption}</span>
                    </div>
                  ))} 
                </Slide>
              </div>
         
);
};


export default Slideshow;