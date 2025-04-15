import { useSelector } from "react-redux"
import { RootState } from "../store"

export const useReduxStates =()=>{
    const topology = useSelector((state:RootState)=>state.topologySlice)
   return {topology}
}