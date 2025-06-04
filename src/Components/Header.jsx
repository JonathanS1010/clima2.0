import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white text-black p-4">
      <div className='flex items-center  border-b-2  justify-between h-5/6'>
        <Link to="/"><img src="../Images/logo.jpg" alt="Logo" className='h-12 ml-20 p-1' /></Link>
        <div>
          <h1 className="font-thin text-xl p-3 mr-20"></h1>
        </div>
      </div>
    </header>
  )
}

export default Header
