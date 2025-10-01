import { useState } from 'react'
import './App.css'

import Button from './Components/Button'
import TableHeader from './Components/TableHeader'
import Form from './Components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableHeader />
      <Form />
    </>
  )
}

export default App



