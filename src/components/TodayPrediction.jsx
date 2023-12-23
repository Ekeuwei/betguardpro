import { useEffect } from "react"
import Match from "./Match"
import { fetchData } from "../features/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading"

const TodayPrediction = () => {
    const dispatch = useDispatch()
    const key = 'today'

    // eslint-disable-next-line no-unused-vars
    const {status, data, error} = useSelector(state => state.data[key]||{})

    useEffect(()=>{
        const url = 'https://bettingtips.rveasy.net/betguardpro/today.json'
        dispatch(fetchData({url, key}))
    },[dispatch])
  return (
    <div className="predictions">
        <div className="title">
            <h2 className="p-title">Today Predictions</h2>
            <p className="p-subtitle">Recommended for 5 Steps</p>
        </div>
        {status==="loading"&& <Loading />}
        {data && <>
            <div className="date">
                <h2 className="p-title">Monday</h2>
                <p className="p-subtitle">18th December, 2023</p>
            </div>
            {data.picks.map((match, index)=>(<Match key={index} match={match}/>))}
            <div className="total-odds">{`${data.totalOdds} Odds`}</div>
            <div className="responsible-gambling">Gamble responsibly 18+</div>
        </>}
    </div>
  )
}

export default TodayPrediction