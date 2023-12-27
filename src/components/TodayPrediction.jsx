import { useEffect } from "react"
import Match from "./Match"
import { fetchData } from "../features/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading"
import dateFormat from "dateformat"

const TodayPrediction = () => {
    const dispatch = useDispatch()
    const key = 'today'

    // eslint-disable-next-line no-unused-vars
    const {status, data, error} = useSelector(state => state.data[key]||{})
    const title = data?.totalOdds > 1 ? `${data.totalOdds} Odds`: 'No Prediction'


    useEffect(()=>{
        const url = 'https://bettingtips.rveasy.net/betguardpro/today.json'
        dispatch(fetchData({url, key}))
    },[dispatch])
  return (
    <div className="predictions">
        <div className="title">
            <h2 className="p-title">Today Predictions</h2>
            <p className="p-subtitle">Recommended for 4 Steps</p>
        </div>
        {status==="loading"&& <Loading />}
        {data && <>
            <div className="date">
                <h2 className="p-title">{dateFormat(data.date, 'dddd')}</h2>
                <p className="p-subtitle">{dateFormat(data.date, "mmmm dS, yyyy")}</p>
            </div>
            {data.picks.map((match, index)=>(<Match key={index} match={match}/>))}
            <div className="total-odds">{title}</div>
            <div className="responsible-gambling">Gamble responsibly 18+</div>
        </>}
    </div>
  )
}

export default TodayPrediction