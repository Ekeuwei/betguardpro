/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { estimate, getInvestmentSteps } from "./calculator"
import { faGears } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const BettingControls = ({data, setData, setSteps, setShowList, showList, setTarget, setShowAdvance}) => {

  const formatNumber = value => new Intl.NumberFormat('en-US').format(value.toString().replace(/\D/g, ''))//Number(value).toLocaleString("en-US");
  
  const [shakeFields, setShakeFields] = useState([]);

  const onChange = (e) => {
    
    setShowList(false)

    setTimeout(()=>{ if(showList)setSteps([]) },500)

    let value;

    if(e.target.name==="bankRoll"){
      value = formatNumber(e.target.value)
    }else if(e.target.name==="steps"){
      value = e.target.value.replace(/[^0-9]/g, '')
    }else{
      value = e.target.value.replace(/[^0-9.]/g, '')
    }

    setData(prevData => ({...prevData, [e.target.name]:value<1?"":value}))
    setShakeFields([])

  }

  const calculateSteps = (e)=> {
    e.preventDefault();
    const emptyFields = Object.keys(data).filter(key => data[key] === "");
    setShakeFields(emptyFields);

    if(emptyFields.length === 0){
      setSteps(getInvestmentSteps(data.steps, data.odds, data.bankRoll))
      
      // const newProfit = target.profit < 1 && target.steps < 1 ? data.bankRoll:target.profit;
      // const newTarget = {profit: target.steps===0? newProfit:0, steps: target.steps}
      // const estimatedValue = estimate(data.odds, data.steps, data.bankRoll,newTarget);
      const estimatedValue = estimate(data.odds, data.steps, data.bankRoll,{profit:data.bankRoll, steps:0});
      setTarget(estimatedValue)
    }
    setShowList(true)
  }

  return (
    <>
      <form onSubmit={calculateSteps} className="settings">

        <h2 className='heading-text' style={{margin:"0 0 30px", color:"#DBA02D"}}>Progressive Staking Calculator</h2>
        <div className="control">
          <div className={`input ${shakeFields.includes('odds')?'shake error':''}`}>
            <input 
                type="text"
                autoComplete="off"
                name="odds"
                placeholder="Odds"
                value={data.odds}
                onChange={onChange}
            />
            <label htmlFor="odds" className={` ${data.odds.length>0? "fade-in":"fade-out"}`}>Odds</label>
          </div>
          <div className={`input ${shakeFields.includes('steps')?'shake error':''}`}>
            <input 
                type="text"
                autoComplete="off"
                name="steps"
                placeholder="Steps"
                value={data.steps}
                onChange={onChange}
            />
            <label htmlFor="steps" className={` ${data.steps.length>0? "fade-in":"fade-out"}`}>Steps</label>
          </div>
          <div className={`input ${shakeFields.includes('bankRoll')?'shake error':''}`} style={{width:"100%"}}>

            <input 
                type="text"
                autoComplete="off"
                name="bankRoll"
                placeholder="Bankroll"
                value={data.bankRoll}
                onChange={onChange}
            />
            <label htmlFor="bankRoll" className={` ${data.bankRoll.length>0? "fade-in":"fade-out"}`}>Bankroll</label>
          </div>
        </div>
        <button className="btn" type="submit"><FontAwesomeIcon icon={faGears}/> Calculate steps</button>
        <div className="advance_btn" onClick={()=>setShowAdvance(prev => !prev)}>More options</div>
      </form>

      {/* <Simulator odds={data.odds} steps={data.steps} bankroll={data.bankroll}/> */}
    </>
  )
}

export default BettingControls