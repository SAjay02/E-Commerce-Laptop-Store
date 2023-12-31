import React from 'react'
import {Link} from "react-scroll"
const Scroll = () => {
  return (
    <div>
        <Link to='about' smooth={true} duration={500}>About</Link>
        <Link to='contact' smooth={true} duration={500}>contact</Link>
    </div>
  )
}

export default Scroll