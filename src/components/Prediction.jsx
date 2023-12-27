import dateFormat from "dateformat"
import PropTypes from 'prop-types';
import Match, { getResult } from "./Match"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"

const Prediction = ({pick}) => {
    const wonAll = pick.picks.every(pick => getResult(pick))
    const title = pick.totalOdds > 1 ? `${pick.totalOdds} Odds`: 'No Prediction'
  return (
    <>
        <div className="date-odds">
            <div className="date">
                <h2 className="p-title">{dateFormat(pick.date, 'dddd')}</h2>
                <p className="p-subtitle">{dateFormat(pick.date, "mmmm dS, yyyy")}</p>
            </div>
            <div className="total-odds">{title} {wonAll&&<FontAwesomeIcon style={{color:"green", marginLeft: "5px"}} icon={faCheckCircle}/>}</div>

        </div>
        {pick.picks.map((match, index)=>(
            <Match key={index} match={match}/>
        ))}
    </>
  )
}

Prediction.propTypes = {
    pick: PropTypes.object.isRequired,

}

export default Prediction