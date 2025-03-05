import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './HomePage'
import Navbar from './navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*<HomePage /> */}
       <Navbar /> 
    </>
  )
}

export default App
