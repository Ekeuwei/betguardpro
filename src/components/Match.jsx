import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';

const Match = ({match}) => {
    let finished  = !match.score.includes('?');
    let won = getResult(match)
  return (
    <div className="match">
        <p className="league">{`${match.country}, ${match.league} - ${match.time}`}</p>
        <div className="teams">
            <p className="team">{match.home}</p>
            <div className="scores">
                <p className="fulltime">{match.score}</p>
                {match.score_ht&& <p className="halftime">{match.score_ht}</p>}
            </div>
            <p className="team">{match.away}</p>
        </div>
        <div className="prediction">
            <p className="pick">{getPrediction(match)} {finished&&<FontAwesomeIcon style={{color:won?"green":"red"}} icon={won?faCheckCircle:faTimesCircle}/>}</p>
            <p className="odds">{parseFloat(match.odd).toFixed(2)}</p>
        </div>
    </div>
  )
}

Match.propTypes = {
    match: PropTypes.object.isRequired
}

// eslint-disable-next-line react-refresh/only-export-components
export const getResult = (match)=>{
    let won = false;
    switch (match.pick.toString()) {
        case '1':
            won = parseInt(match.score.split('-')[0]) > parseInt(match.score.split('-')[1])
            break;
        case '2':
            won = parseInt(match.score.split('-')[1]) > parseInt(match.score.split('-')[0])
            break;
        case '1X':
            won = parseInt(match.score.split('-')[0]) >= parseInt(match.score.split('-')[1])
            break;
        case 'X2':
            won = parseInt(match.score.split('-')[1]) >= parseInt(match.score.split('-')[0])
            break;
    
        default:
            break;
    }

    return won;
}
const getPrediction = (match)=>{
    // console.log(match.pick.toLowerCase);
    switch (match.pick.toString()) {
        case '1':
            return `${match.home}`
        case '2':
            return `${match.away}`
        case '1X':
            return `${match.home} / Draw`
        case 'X2':
            return `${match.away} / Draw`
    
        default:
            return match.pick;
    }
}

export default Match