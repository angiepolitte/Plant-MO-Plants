import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GlobalDataProvider } from './context/GlobalDataProvider'
import ExampleOne from './pages/ExampleOne'
import ExampleTwo from './pages/ExampleTwo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <GlobalDataProvider>
          <ExampleOne />
          <ExampleTwo />
        </GlobalDataProvider>
      </div>
    </>
  )
}

export default App
