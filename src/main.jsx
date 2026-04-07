import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TwoLensesQuiz from './TwoLensesQuiz.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TwoLensesQuiz />
  </StrictMode>,
)
