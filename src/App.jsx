import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizGame from './QuizGame'
import ChooseQuestionsForm from './assets/ChooseQuestionForm'
import { BrowserRouter, Route } from 'react-router-dom'
import RoutePaths from './assets/RoutePaths'





function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

      <RoutePaths />
      {/* <ChooseQuestionsForm /> */}


    </>
  )
}

export default App
