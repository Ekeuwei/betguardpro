import './App.css'
import { Container } from 'react-bootstrap'
import BettingControls from './components/BettingControls'
// import { getInvestmentSteps } from "./components/getInvestmentSteps"
import Step from './components/Step'
import { useEffect, useState } from 'react'
import HowItWorks from './components/HowItWorks'
import Prediction from './components/TodayPrediction'
import PreviousPrediction from './components/PreviousPrediction'
import Simulator from './components/Simulator'
import ReactGA from 'react-ga'

function App() {

  const [data, setData] = useState({
    odds: "",
    steps: "",
    bankRoll:""
  })

  const [steps, setSteps] = useState([])
  const [showList, setShowList] = useState(false)
  
  const [target, setTarget] = useState({profit:0, steps: 0})
  const [showAdvance, setShowAdvance] = useState(false)
  const [hideAdvance, setHidAdvance] = useState(true)
  
  
  useEffect(()=>{
    // setSteps(getInvestmentSteps(data.steps, data.odds, data.bankRoll))
    if(showAdvance){
      setHidAdvance(showAdvance)
    }else{
      setTimeout(()=>setHidAdvance(showAdvance),500)
    }
  }, [showAdvance])

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    // console.log(window.location.pathname + window.location.search);
  }, []);

  return (
    <Container>
      <h1 className='heading-text'>Bet Guard Pro</h1>
      <h2 className="sub-heading-text">Your Winning Edge in Sports Betting</h2>
      <div className="main">
        <div className="calculator">
          <p className='synopsis'>This app empowers you with a proven progressive staking strategy to safeguard and grow your bankroll.</p>
          <BettingControls 
            data={data} 
            setData={setData} 
            setSteps={setSteps} 
            setShowList={setShowList} 
            showList={showList}
            target={target}
            setTarget={setTarget}
            setShowAdvance={setShowAdvance}
          />
          {hideAdvance&& <Simulator 
            steps={data.steps} 
            odds={data.odds} 
            bankroll={data.bankRoll}
            target={target}
            setTarget={setTarget}
            showAvance={showAdvance}
            showAdvance={showAdvance}
            setShowAdvance={setShowAdvance}
          />}
          <div className="steps">
            {steps.map(step => <Step key={step.sn} showList={showList} step={step} odds={data.odds}/>)}
          </div>
          <HowItWorks />
          
        </div>
        <div className="right">
          <Prediction />
          <PreviousPrediction />
        </div>

      </div>
      {/* <Area /> */}
      
    </Container>
  )
}

export default App
