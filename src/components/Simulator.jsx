import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { estimate } from "./calculator"
import PropTypes from 'prop-types'

const Simulator = ({odds, steps, bankroll, target, setTarget, setShowAdvance, showAdvance}) => {
//   const formatNumber = value => new Intl.NumberFormat('en-US').format(value)//Number(value).toLocaleString("en-US");
  const formatNumber = value => new Intl.NumberFormat('en-US').format(value.toString().replace(/\D/g, ''))//Number(value).toLocaleString("en-US");


    const [targetProfit, setTargetProfit] = useState('');
    const [targetSteps, setTargetSteps] = useState('');
    const displayText = odds>1 && steps>1 && bankroll.toString().replace(/[^0-9]/g, '')>1 && (target.profit>0 || target.profit.toString().replace(/[^0-9]/g, '')>0);
    const handleSteps = (e)=>{
        setTargetProfit('')
        const bankRoll = parseFloat(bankroll.replace(/[^0-9]/g, ''))
        const value = isNaN(parseFloat(e.target.value))?"":parseFloat(e.target.value);
        const newValues = estimate(odds, steps, bankRoll, {profit:0,[e.target.name]:value});
        setTargetSteps(value)

        setTarget(newValues)
    }
    const handleProfit = (e)=>{
        setTargetSteps('')
        const bankRoll = parseFloat(bankroll.replace(/[^0-9]/g, ''))
        // const value = isNaN(parseFloat(e.target.value))?"":parseFloat(e.target.value.replace(/[^0-9]/g, ''));
        const newValues = estimate(odds, steps, bankRoll, {steps:0,[e.target.name]:e.target.value});
        
        setTargetProfit(isNaN(parseFloat(e.target.value))?"":formatNumber(e.target.value))
        setTarget(newValues)
    }

    const handleBlur = () => {
        setTargetSteps('')
        setTargetProfit('')
    };
    
    return (
        <div className={`simulator ${showAdvance? 'fall-in' : 'fall-out'}`} style={{animationDelay:"0.05s"}}>
            <div className="close" onClick={()=>setShowAdvance(false)}><FontAwesomeIcon icon={faTimes} /> </div>
            {displayText&& <p>Starting with a bankroll of ${bankroll} on {steps} steps staking with {odds} Odds,
             it will take about {target.steps} total stakes to reach a profit of {target.profit}</p>}
            <div className="stepsInput">

            <input 
                    type="text"
                    autoComplete="off"
                    className="input"
                    style={{maxWidth:"200px"}}
                    name="profit"
                    onBlur={handleBlur}
                    placeholder={isNaN(parseFloat(target.profit.toString().replace(/[^0-9]/g, '')))?'Target profit':target.profit}
                    value={targetProfit}
                    onChange={handleProfit}
                />
            <label>State your profit target to reveal the number of stakes it takes to reach that sweet spot.</label>
            </div>
            <div className="stepsInput">
            <input 
                    type="text"
                    autoComplete="off"
                    className="input"
                    style={{maxWidth:"100px"}}
                    name="steps"
                    onBlur={handleBlur}
                    placeholder={isNaN(target.steps)?'Target steps':target.steps}
                    value={targetSteps}
                    onChange={handleSteps}
                />
            <label>Input the number of stakes you want to try and discover the potential profit you could make in that timeframe.</label>

            </div>
        </div>
    )
}

Simulator.propTypes = {
    odds: PropTypes.string.isRequired,
    steps:PropTypes.string.isRequired,
    bankroll:PropTypes.string.isRequired,
    target: PropTypes.object.isRequired,
    setTarget: PropTypes.func.isRequired,
    setShowAdvance:PropTypes.func.isRequired,
    showAdvance:PropTypes.bool.isRequired,
}

export default Simulator