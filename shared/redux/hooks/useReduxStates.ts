import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useReduxStates = () => {
    const topology = useSelector((state: RootState) => state.topology);
    const searchValue = useSelector((state: RootState) => state.search);

    const parkingStatus = useSelector((state: RootState) => state.parkings.status);
    const parkingArray = useSelector((state: RootState) => state.parkings.parkingArray);
    // const parkingNext = useSelector((state: RootState) => state.parkings);

    return { topology, searchValue, parkingArray, parkingStatus };
};
