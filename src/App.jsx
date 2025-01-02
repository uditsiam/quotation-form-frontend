import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuotationForm from './Components/QuotationForm'
import 'antd/dist/reset.css';
import QuotationForm1 from './Components/QuotationForm2'
import QuotationForm3 from './Components/QuotationForm3'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  
  <QuotationForm3></QuotationForm3>
  {/* <QuotationForm></QuotationForm> */}
  </>
  )
}

export default App
