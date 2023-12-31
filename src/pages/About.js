
import React, { useRef, useEffect } from 'react';
const About = () => {
  useEffect(() => {
    const aboutSection = document.getElementById('about');

    const handleScroll = () => {
      if (window.location.hash === '#about' && aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Listen for changes in the hash and scroll accordingly
    window.addEventListener('hashchange', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [/* any dependencies, if needed */]);
  return (
    <div id='about'>
    <div ref={aboutSectionRef} id="about">
    About
      </div>
    </div>
  )
}

export default About