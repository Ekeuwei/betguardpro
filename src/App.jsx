import './App.css'
import { Container } from 'react-bootstrap'
import BettingControls from './components/BettingControls'
// import { getInvestmentSteps } from "./components/getInvestmentSteps"
import Step from './components/Step'
import { useEffect, useState } from 'react'
import HowItWorks from './components/HowItWorks'

function App() {

  const [data, setData] = useState({
    odds: "",
    steps: "",
    bankRoll:""
  })

  const [steps, setSteps] = useState([])
  const [showList, setShowList] = useState(false)
  
  useEffect(()=>{
    // setSteps(getInvestmentSteps(data.steps, data.odds, data.bankRoll))
  }, [data])

  return (
    <Container>
      <div className="calculator">
        <h1 className='heading-text'>Progressive Staking Calculator</h1>
        <h2 className="sub-heading-text">Your Winning Edge in Sports Betting</h2>
        <p className='synopsis'>This app empowers you with a proven progressive staking strategy to safeguard and grow your bankroll.</p>
        <BettingControls data={data} setData={setData} setSteps={setSteps} setShowList={setShowList} showList={showList}/>
        <div className="steps">
          {steps.map(step => <Step key={step.sn} showList={showList} step={step} odds={data.odds}/>)}
        </div>
        <HowItWorks />
      </div>
      {/* <Area /> */}
      
    </Container>
  )
}

export default App
