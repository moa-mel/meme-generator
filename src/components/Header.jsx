import React from 'react'
import logo from "../assets/Troll Face.png"

const Header = () => {
  return (
    <header>
        <img src={logo} alt='' className='header--img'/>
        <h2 className='header--h2'>Meme Generator</h2>
        <h4 className='header--h4'>React Course - Project 3</h4>
    </header>
  )
}

export default Header