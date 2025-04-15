import { TopologyType } from "@/@types/tomologyType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TopologyType = {
    name: "",
    address: "",
    width: 1,
    height: 1,
    day_tariff: 0,
    night_tariff: 0,
    cells: [],
};

const topologySlice = createSlice({
    name: "topologySlice",
    initialState,
    reducers: {
        setTopology: (state, { payload }: PayloadAction<TopologyType>) => {
            state = payload;
        },
    },
});
export const { setTopology } = topologySlice.actions;
export default topologySlice.reducer;
