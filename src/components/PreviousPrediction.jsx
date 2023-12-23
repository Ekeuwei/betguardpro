// import data from '../assets/onegame.json'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchData } from "../features/dataSlice"
import Prediction from "./Prediction"
import Loading from "./Loading"


const PreviousPrediction = () => {
    const key = 'previous'//Store key

    // eslint-disable-next-line no-unused-vars
    const { status, data, error } = useSelector(state => state.data[key]||{});
    const dispatch = useDispatch()

    useEffect(()=>{
        const apiUrl = 'https://bettingtips.rveasy.net/betguardpro/202312.json'
        dispatch(fetchData({ url: apiUrl, key }));
    },[dispatch])

    return (
        <div className="predictions">
            <div className="title">
                <h2 className="p-title">Last 7 Days Predictions</h2>
                <p className="p-subtitle">Recommended for 5 Steps</p>
            </div>

            {status==="loading"&&<Loading />}

            {data && data.slice(0, 7).map(pick=>(
                <Prediction key={pick.date} pick={pick}/>
            ))}
            
            <div className="responsible-gambling">Gamble responsibly 18+</div>
        </div>
    )
}

export default PreviousPrediction