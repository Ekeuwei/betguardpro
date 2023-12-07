/* eslint-disable react/prop-types */

import { faCopy, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Step = ({showList, step, odds}) => {

    const [showInfo, setShowInfo] = useState(false);
    const [showCopied, setShowCopied] = useState(false)
    const handleShowInfo = ()=> {
        setShowInfo(prev => !prev)
        setTimeout(()=>setShowInfo(false), 5*1000)
    }

    const handleCopyClick = () => {
        const textToCopy = stakeAmount.replace(/,/g, '')
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Successfully copied to clipboard
            setShowCopied(true)
            setTimeout(()=>setShowCopied(false), 2000)
        })
        .catch((err) => {
            // Unable to copy to clipboard
            console.error('Unable to copy to clipboard', err);
        });
    };

    // const formatNumberFraction = value => Number(value).toLocaleString("en-US", {minimumFractionDigits: 2});
    const formatNumberFraction = value => Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    const stakeAmount = formatNumberFraction(step.stake);
    const potentialWin = formatNumberFraction(step.stake * odds);
    const netProfit = formatNumberFraction(step.stake * odds - step.inv);
    // eslint-disable-next-line no-unused-vars
    const remark = `Stake ${step.sn+1}: when we stake $${stakeAmount} on ${formatNumberFraction(odds)} odds, we can anticipate a potential win (PW) of $${potentialWin}, giving us a net profit of $${netProfit}`
  return (
    <>
        <div className={`step ${showList ? 'fall-in' : 'fall-out'}`} style={{animationDelay: `${showList?step.sn*0.2:step.sn*0.05}s`}}>
            <div className="stakeAmount">
                <span className="span">Stake {step.sn+1}</span>
                <div className="value" onClick={handleCopyClick}>
                    ${stakeAmount}
                    <FontAwesomeIcon icon={faCopy} style={{marginLeft:"5px", color:"#333"}}/>
                    <span className={`copied ${showCopied? "fall-in":"fall-out"}`} style={{animationDelay: "0.1s"}}>copied</span>
                </div>
            </div>
            <div className="stakeAmount potentialWin">
                <span className="span">PW</span>
                <div className="value">${potentialWin}</div>
            </div>
            <div className="netProfit">+${netProfit}</div>
            <FontAwesomeIcon icon={faInfo} className="info" onClick={handleShowInfo}/>
            <div className="remark" style={{display:showInfo?"block":"none"}}>{remark}</div>
        </div>
    </>
  )
}

export default Step