import { ParkElements } from "@/@types/enums";
import { TopologyType } from "@/@types/topologyType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TopologyType = {
    name: "",
    address: "",
    width: 4,
    height: 4,
    day_tariff: 0,
    night_tariff: 0,
    manager_id: 0,
    cells: [],
};

const topologySlice = createSlice({
    name: "topologySlice",
    initialState,
    reducers: {
        setTopology: (state, { payload }: PayloadAction<TopologyType>) => {
            state.address = payload.address;
            state.width = payload.width;
            state.height = payload.height;
            state.name = payload.name;
            state.day_tariff = payload.day_tariff;
            state.night_tariff = payload.night_tariff;
            state.manager_id = payload.manager_id;
        },
        setTopologyWithoutCells: (
            state,
            { payload }: PayloadAction<Omit<TopologyType, "cells">>
        ) => {
            state.address = payload.address;
            state.width = payload.width;
            state.height = payload.height;
            state.name = payload.name;
            state.day_tariff = payload.day_tariff;
            state.night_tariff = payload.night_tariff;
            state.manager_id = payload.manager_id;
        },

        setTopologyCells: (
            state,
            { payload }: PayloadAction<ParkElements[][]>
        ) => {
            state.cells = payload.slice();
        },
    },
});
export const { setTopology, setTopologyWithoutCells, setTopologyCells } =
    topologySlice.actions;
export default topologySlice.reducer;
