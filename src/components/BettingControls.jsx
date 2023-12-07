/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getInvestmentSteps } from "./calculator"
import { faGears } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const BettingControls = ({data, setData, setSteps, setShowList, showList}) => {

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
    }
    setShowList(true)
  }

  return (
    <>
      <form onSubmit={calculateSteps} className="settings">

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
          <div className={`input ${shakeFields.includes('bankRoll')?'shake error':''}`}>

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
      </form>
    </>
  )
}

export default BettingControls