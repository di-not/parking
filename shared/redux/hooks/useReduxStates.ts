import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useReduxStates = () => {
    const topology = useSelector((state: RootState) => state.topology);
    const searchValue = useSelector((state: RootState) => state.search);
    return { topology, searchValue };
};
