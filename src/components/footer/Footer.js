import React from 'react'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Emoji from '../emoji/Emoji';
import './Footer.css';
function Footer() {
    const text =useRef();


useGSAP(() => {
  gsap.to(text.current,{
    x : 2200,
    duration : 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
});
  return (
    <>
    <div className='text' ref={text}>
      supervised by Prof. Ilonka Wolpert <Emoji symbol=""/>
      <br />
    </div>
    <div className='text1' ref={text}>
    <Emoji symbol="🎓"/>JEE-Technologien und Anwendungen<Emoji symbol="🎓"/>
      <br />
    </div>
    </>
  );
}

export default Footer