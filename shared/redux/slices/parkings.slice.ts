import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "@/http";
import { TopologyType } from "@/@types/topologyType";
import { Statuses } from "@/@types/enums";
import { AxiosResponse } from "axios";

type ParkingArrayType = (TopologyType & { id: number })

type ParckingSliceProps = {
    parkingArray: ParkingArrayType[][];
    status: Statuses;
};

const initialState: ParckingSliceProps = {
    parkingArray: [],
    status: Statuses.LOADING,
};

export const fetchParkings = createAsyncThunk(
    "fetchParkings",
    async (params: { page: number; search?: string }) => {
        const { page, search } = params;
        let res:AxiosResponse<ParkingArrayType> | null = null
        if(search){
            res = await $api.get<ParkingArrayType>('/parking')
        }
        else{
            res = await $api.get<ParkingArrayType>('/parking')
           
        }
        console.log(res)
        
        return [];
    }
);

const parkingSlice = createSlice({
    name: "parcking",
    initialState,
    reducers: {
        setParkingsArray(
            state,
            { payload }: PayloadAction<ParkingArrayType[][]>
        ) {
            state.parkingArray = payload;
            state.status = Statuses.SUCCESS;
        },
    },
});
export const { setParkingsArray } = parkingSlice.actions;
export default parkingSlice.reducer;
