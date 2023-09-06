import { useState } from 'react'
import './App.css'

import Reviews from './component/Reviews';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Reviews/>
    </>
  )
}

export default App
