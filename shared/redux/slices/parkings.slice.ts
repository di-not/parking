import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "@/http";
import { TopologyType } from "@/@types/topologyType";
import { Statuses } from "@/@types/enums";
import { AxiosResponse } from "axios";

type ParkingArrayType = (TopologyType & { id: number })[];

type ParckingSliceProps = {
    parkingArray: ParkingArrayType;
    status: Statuses;
};

const initialState: ParckingSliceProps = {
    parkingArray: [],
    status: Statuses.LOADING,
};

export const fetchParkings = createAsyncThunk("fetchParkings", async () => {
    let res: AxiosResponse<ParkingArrayType> | null =
        await $api.get<ParkingArrayType>("/parking");

    console.log(res.data);

    return {
        data: res.data,
    };
});

const parkingSlice = createSlice({
    name: "parcking",
    initialState,
    reducers: {
        setParkingsArray(state, { payload }: PayloadAction<ParkingArrayType>) {
            state.parkingArray = payload;
            state.status = Statuses.SUCCESS;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParkings.fulfilled, (state, action) => {
            state.parkingArray = action.payload.data
            state.status = Statuses.SUCCESS
        });
        builder.addCase(fetchParkings.pending, state => {
			state.status = Statuses.LOADING
		})
		builder.addCase(fetchParkings.rejected, state => {
			state.status = Statuses.ERROR
		})
    },
});
export const { setParkingsArray } = parkingSlice.actions;
export default parkingSlice.reducer;
